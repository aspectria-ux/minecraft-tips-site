/**
 * HeroSection Component
 * サイトのヒーローセクション（トップ部分）
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-banner.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* タイトル */}
          <motion.h1
            className="font-pixel text-2xl md:text-4xl lg:text-5xl text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            マイクラ最強コマンド
            <br className="md:hidden" />
            <span className="text-yellow-400">逆引き辞典</span>
          </motion.h1>

          {/* サブタイトル */}
          <motion.p
            className="text-gray-300 text-sm md:text-base mb-6 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            やりたいことから、使えるコマンドがすぐ見つかる！
            <br />
            コピーボタンを押して、ゲームに貼り付けるだけ！
          </motion.p>

          {/* 特徴バッジ */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-pixel">
              <BookOpen className="w-4 h-4" />
              <span>30種類以上のコマンド</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-pixel">
              <Zap className="w-4 h-4" />
              <span>ワンクリックでコピー</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-pixel">
              <Sparkles className="w-4 h-4" />
              <span>最新バージョン対応</span>
            </div>
          </motion.div>

          {/* 使い方ヒント */}
          <motion.div
            className="inline-block minecraft-card p-4 text-left max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="font-pixel text-sm text-yellow-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              使い方
            </h2>
            <ol className="text-xs text-gray-300 space-y-1">
              <li>1. やりたいことを検索するか、カテゴリを選ぶ</li>
              <li>2. 使いたいコマンドの「コピー」ボタンを押す</li>
              <li>3. マイクラのチャット画面に貼り付けてEnter！</li>
            </ol>
          </motion.div>
        </motion.div>
      </div>

      {/* 装飾：浮遊するパーティクル */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-sm"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </section>
  );
}
