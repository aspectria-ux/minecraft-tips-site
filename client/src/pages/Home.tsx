/**
 * Home Page
 * マイクラ最強コマンド逆引き辞典のメインページ
 * デザイン: ピクセルアート・レトロゲーム風
 * ターゲット: 小学生男子
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs } from '@/components/CategoryTabs';
import { CommandCard } from '@/components/CommandCard';
import { PlatformSwitch } from '@/components/PlatformSwitch';
import { Footer } from '@/components/Footer';
import { AffiliateSection, AffiliateBanner } from '@/components/AffiliateSection';
import { 
  loadCommandsData,
  getCommandsByCategory, 
  searchCommands,
  type CommandCategory,
  type Command,
  type Category,
} from '@/data/commands';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('teleport');
  const [platform, setPlatform] = useState<'java' | 'bedrock' | 'all'>('all');
  const [commands, setCommands] = useState<Command[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataVersion, setDataVersion] = useState('');

  // データを読み込む
  useEffect(() => {
    loadCommandsData()
      .then(data => {
        setCommands(data.commands);
        setCategories(data.categories);
        setDataVersion(data.version);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load commands:', err);
        setLoading(false);
      });
  }, []);

  // 検索結果またはカテゴリ別コマンドを取得
  const displayedCommands = useMemo(() => {
    if (searchQuery.trim()) {
      return searchCommands(commands, searchQuery, platform);
    }
    return getCommandsByCategory(commands, activeCategory, platform);
  }, [commands, searchQuery, activeCategory, platform]);

  // 現在のカテゴリ情報
  const currentCategory = categories.find(c => c.id === activeCategory);

  // 総コマンド数（プラットフォームフィルター適用）
  const totalCommands = useMemo(() => {
    if (platform === 'all') return commands.length;
    return commands.filter(cmd => cmd.platform === platform || cmd.platform === 'both').length;
  }, [commands, platform]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="font-pixel text-gray-400">コマンドを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヒーローセクション */}
      <HeroSection version={dataVersion} />

      {/* メインコンテンツ */}
      <main className="flex-1 container py-8">
        {/* プラットフォーム切り替え */}
        <div className="mb-6">
          <PlatformSwitch value={platform} onChange={setPlatform} />
        </div>

        {/* 検索バー */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="やりたいことを入力... 例：村、ダイヤ、速く、fill"
          />
        </div>

        {/* コマンド生成機へのリンク */}
        <div className="mb-8 text-center">
          <Link href="/generator">
            <motion.button
              className="minecraft-btn px-6 py-3 font-pixel text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 inline-block mr-2" />
              コマンド生成機を使う
            </motion.button>
          </Link>
        </div>

        {/* 検索中でなければカテゴリタブを表示 */}
        {!searchQuery && (
          <div className="mb-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            {/* カテゴリ説明 */}
            {currentCategory && (
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <p className="text-sm text-gray-400 font-pixel">
                  {currentCategory.description}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* 検索結果ヘッダー */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded">
              <Search className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">
                「<span className="text-emerald-400 font-bold">{searchQuery}</span>」の検索結果：
                <span className="text-yellow-400 font-bold ml-1">{displayedCommands.length}件</span>
              </span>
            </div>
          </motion.div>
        )}

        {/* コマンドカード一覧 */}
        <AnimatePresence mode="wait">
          {displayedCommands.length > 0 ? (
            <motion.div
              key={`${searchQuery}-${activeCategory}-${platform}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayedCommands.map((command, index) => (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  <CommandCard command={command} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="minecraft-card p-8 max-w-md mx-auto">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-pixel text-lg text-yellow-400 mb-2">
                  見つからなかった...
                </h3>
                <p className="text-sm text-gray-400">
                  別の言葉で検索してみてね！
                  <br />
                  例：「テレポート」「召喚」「ダイヤ」「fill」
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 全コマンド数の表示 */}
        {!searchQuery && (
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 font-pixel">
              このカテゴリには {displayedCommands.length} 個のコマンドがあるよ！
              <br />
              全部で {totalCommands} 個のコマンドを収録中！
            </p>
          </div>
        )}

        {/* アフィリエイトバナー（コマンド一覧の後） */}
        <AffiliateBanner />

        {/* アフィリエイトセクション（フル表示） */}
        <AffiliateSection variant="full" />
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
