/**
 * Home Page
 * マイクラ最強コマンド逆引き辞典のメインページ
 * デザイン: ピクセルアート・レトロゲーム風
 * ターゲット: 小学生男子
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs } from '@/components/CategoryTabs';
import { CommandCard } from '@/components/CommandCard';
import { Footer } from '@/components/Footer';
import { 
  commands, 
  categories,
  getCommandsByCategory, 
  searchCommands,
  type CommandCategory 
} from '@/data/commands';
import { Search, Sparkles } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('teleport');

  // 検索結果またはカテゴリ別コマンドを取得
  const displayedCommands = useMemo(() => {
    if (searchQuery.trim()) {
      return searchCommands(searchQuery);
    }
    return getCommandsByCategory(activeCategory);
  }, [searchQuery, activeCategory]);

  // 現在のカテゴリ情報
  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* メインコンテンツ */}
      <main className="flex-1 container py-8">
        {/* 検索バー */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="やりたいことを入力... 例：村、ダイヤ、速く"
          />
        </div>

        {/* 検索中でなければカテゴリタブを表示 */}
        {!searchQuery && (
          <div className="mb-8">
            <CategoryTabs
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
              key={searchQuery || activeCategory}
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
                  transition={{ delay: index * 0.05, duration: 0.3 }}
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
                  例：「テレポート」「召喚」「ダイヤ」
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
              全部で {commands.length} 個のコマンドを収録中！
            </p>
          </div>
        )}
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
