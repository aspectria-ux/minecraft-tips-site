/**
 * AffiliateSection Component
 * マイクラ専用レンタルサーバーや周辺機器を紹介するセクション
 * デザイン: ピクセルアート・レトロゲーム風
 * 収益化用のアフィリエイトリンク配置エリア
 */

import { motion } from 'framer-motion';
import { Server, Gamepad2, Headphones, Monitor, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AffiliateItem {
  id: string;
  type: 'server' | 'peripheral';
  name: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
  link: string;
  badge?: string;
}

const affiliateItems: AffiliateItem[] = [
  // レンタルサーバー
  {
    id: 'server-1',
    type: 'server',
    name: 'ConoHa for GAME',
    description: 'マイクラ専用テンプレートで簡単セットアップ！初心者にもおすすめ',
    icon: <Server className="w-6 h-6" />,
    highlight: '月額800円〜',
    link: '#conoha',
    badge: '人気No.1',
  },
  {
    id: 'server-2',
    type: 'server',
    name: 'Xserver VPS',
    description: '高性能サーバーで大人数でもサクサク！MODサーバーにも対応',
    icon: <Server className="w-6 h-6" />,
    highlight: '月額830円〜',
    link: '#xserver',
  },
  {
    id: 'server-3',
    type: 'server',
    name: 'さくらのVPS',
    description: '安定性抜群の老舗サーバー。24時間稼働も安心！',
    icon: <Server className="w-6 h-6" />,
    highlight: '月額643円〜',
    link: '#sakura',
    badge: 'コスパ◎',
  },
  // 周辺機器
  {
    id: 'peripheral-1',
    type: 'peripheral',
    name: 'ゲーミングマウス',
    description: '素早い操作でPvPに勝つ！プロも使う高精度マウス',
    icon: <Gamepad2 className="w-6 h-6" />,
    highlight: '¥3,980〜',
    link: '#mouse',
    badge: 'おすすめ',
  },
  {
    id: 'peripheral-2',
    type: 'peripheral',
    name: 'ゲーミングヘッドセット',
    description: '足音が聞こえる！敵の位置がわかるサラウンドヘッドセット',
    icon: <Headphones className="w-6 h-6" />,
    highlight: '¥4,980〜',
    link: '#headset',
  },
  {
    id: 'peripheral-3',
    type: 'peripheral',
    name: 'ゲーミングモニター',
    description: '144Hzでヌルヌル動く！マイクラがもっと楽しくなる',
    icon: <Monitor className="w-6 h-6" />,
    highlight: '¥19,800〜',
    link: '#monitor',
  },
];

interface AffiliateSectionProps {
  variant?: 'full' | 'compact' | 'sidebar';
  showServers?: boolean;
  showPeripherals?: boolean;
}

export function AffiliateSection({ 
  variant = 'full',
  showServers = true,
  showPeripherals = true 
}: AffiliateSectionProps) {
  const handleClick = (item: AffiliateItem) => {
    // プレースホルダーリンクの場合はトーストを表示
    if (item.link.startsWith('#')) {
      toast.info('リンク先は後で設定できます', {
        description: `${item.name}のアフィリエイトリンクを設定してください`,
        duration: 3000,
      });
    }
  };

  const servers = affiliateItems.filter(item => item.type === 'server');
  const peripherals = affiliateItems.filter(item => item.type === 'peripheral');

  if (variant === 'compact') {
    return (
      <div className="minecraft-card p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="font-pixel text-sm text-purple-400">おすすめアイテム</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {affiliateItems.slice(0, 3).map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              onClick={(e) => {
                if (item.link.startsWith('#')) {
                  e.preventDefault();
                  handleClick(item);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors text-xs"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-purple-400">{item.icon}</span>
              <span className="text-gray-300">{item.name}</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </motion.a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-4">
        {showServers && (
          <div className="minecraft-card p-4 bg-gradient-to-b from-emerald-900/20 to-transparent border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-emerald-400" />
              <h3 className="font-pixel text-xs text-emerald-400">マイクラサーバー</h3>
            </div>
            <div className="space-y-2">
              {servers.slice(0, 2).map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  onClick={(e) => {
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      handleClick(item);
                    }
                  }}
                  className="block p-2 bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-pixel bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-400">{item.highlight}</span>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {showPeripherals && (
          <div className="minecraft-card p-4 bg-gradient-to-b from-orange-900/20 to-transparent border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4 text-orange-400" />
              <h3 className="font-pixel text-xs text-orange-400">周辺機器</h3>
            </div>
            <div className="space-y-2">
              {peripherals.slice(0, 2).map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  onClick={(e) => {
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      handleClick(item);
                    }
                  }}
                  className="block p-2 bg-slate-800/30 border border-slate-700/50 hover:border-orange-500/50 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-pixel bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-orange-400">{item.highlight}</span>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <section className="py-8">
      <div className="minecraft-card p-6 bg-gradient-to-r from-slate-900/80 via-purple-900/20 to-slate-900/80 border-purple-500/20">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="font-pixel text-xs text-purple-400">PR</span>
          </motion.div>
          <h2 className="font-pixel text-lg text-white mb-2">
            マイクラをもっと楽しむ！
          </h2>
          <p className="text-sm text-gray-400">
            友達とマルチプレイするなら専用サーバー、もっと快適に遊ぶなら周辺機器がおすすめ！
          </p>
        </div>

        {/* レンタルサーバーセクション */}
        {showServers && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-emerald-400" />
              <h3 className="font-pixel text-sm text-emerald-400">
                マイクラ専用レンタルサーバー
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servers.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  onClick={(e) => {
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      handleClick(item);
                    }
                  }}
                  className="relative block p-4 bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 text-[10px] font-pixel bg-yellow-500 text-slate-900 border-2 border-yellow-600">
                      {item.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-pixel text-sm text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-emerald-400">
                          {item.highlight}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-emerald-400 transition-colors">
                          詳しく見る
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* 周辺機器セクション */}
        {showPeripherals && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-5 h-5 text-orange-400" />
              <h3 className="font-pixel text-sm text-orange-400">
                おすすめ周辺機器
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {peripherals.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  onClick={(e) => {
                    if (item.link.startsWith('#')) {
                      e.preventDefault();
                      handleClick(item);
                    }
                  }}
                  className="relative block p-4 bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 text-[10px] font-pixel bg-yellow-500 text-slate-900 border-2 border-yellow-600">
                      {item.badge}
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-500/20 text-orange-400 rounded">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-pixel text-sm text-white mb-1 group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-orange-400">
                          {item.highlight}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-orange-400 transition-colors">
                          詳しく見る
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* 注意書き */}
        <p className="text-center text-[10px] text-gray-600 mt-6">
          ※ 上記リンクはアフィリエイトリンクを含む場合があります
        </p>
      </div>
    </section>
  );
}

// 小さなバナー型コンポーネント（ページ間に挿入用）
export function AffiliateBanner() {
  const handleClick = () => {
    toast.info('リンク先は後で設定できます', {
      description: 'アフィリエイトリンクを設定してください',
      duration: 3000,
    });
  };

  return (
    <motion.div
      className="my-6 p-4 bg-gradient-to-r from-emerald-900/30 via-purple-900/30 to-emerald-900/30 border border-emerald-500/20 rounded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded">
            <Server className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-pixel text-xs text-emerald-400">友達とマルチプレイしたい？</p>
            <p className="text-sm text-gray-300">マイクラ専用サーバーなら簡単にマルチができる！</p>
          </div>
        </div>
        <motion.button
          onClick={handleClick}
          className="minecraft-btn px-4 py-2 font-pixel text-xs bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>サーバーを見る</span>
          <ExternalLink className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
}
