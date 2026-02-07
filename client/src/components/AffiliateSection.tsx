/**
 * AffiliateSection Component
 * マイクラ専用レンタルサーバーや周辺機器を紹介するセクション
 * デザイン: ピクセルアート・レトロゲーム風
 * 収益化用のアフィリエイトリンク配置エリア
 */

import { motion } from 'framer-motion';
import { Gamepad2, ExternalLink, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface RakutenProduct {
  title: string;
  imageUrl: string;
  affiliateHtml: string;
}

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
  const [rakutenProducts, setRakutenProducts] = useState<RakutenProduct[]>([]);

  useEffect(() => {
    // 楽天商品データを初期化
    setRakutenProducts([
      {
        title: '【オンライン限定価格*】レゴ LEGO マインクラフト 森の洋館 闘技場の部屋 21272｜おもちゃ 玩具 誕生日 プレゼント ブロック 10歳 11歳 12歳 マイクラ',
        imageUrl: '//thumbnail.image.rakuten.co.jp/@0_mall/toysrus/cabinet/11514337/801426400a.jpg?_ex=300x300',
        affiliateHtml: '<a href="//af.moshimo.com/af/c/click?a_id=5369798&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Ftoysrus%2F10069296%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Ftoysrus%2Fi%2F10708332%2F" rel="nofollow" referrerpolicy="no-referrer-when-downgrade">楽天で見る</a>'
      },
      {
        title: 'SB【マインクラフト　超BIG　ぬいぐるみ　クリーパー　40cm】キャラクター　グッズ　雑貨　Minecraft　大きい　敵　敵キャラ　ゲーム　クリーパー　エンダーマン　エンダードラゴン　インテリア　コレクション　マイクラ　まいぜんシスターズ　エンチャント　Mob',
        imageUrl: '//thumbnail.image.rakuten.co.jp/@0_mall/rapites/cabinet/06912594/09664043/12430628/imgrc0108481591.jpg?_ex=300x300',
        affiliateHtml: '<a href="//af.moshimo.com/af/c/click?a_id=5369798&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Frapites%2Fp-072460%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Frapites%2Fi%2F10010370%2F" rel="nofollow" referrerpolicy="no-referrer-when-downgrade">楽天で見る</a>'
      },
      {
        title: 'はじめよう! マインクラフト 2026 【スイッチ含むマイクラ全機種版対応!】初心者のギモンがすぐにわかる! 役立つ基礎知識や(秘)テクニックが満載!! [ GOLDEN AXE ]',
        imageUrl: '//thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7514/9784866367514_1_6.jpg?_ex=300x300',
        affiliateHtml: '<a href="//af.moshimo.com/af/c/click?a_id=5369798&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18250520%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21622644%2F" rel="nofollow" referrerpolicy="no-referrer-when-downgrade">楽天で見る</a>'
      }
    ]);
  }, []);

  const handleConohaClick = () => {
    toast.info('ConoHa for GAMEへ移動します', {
      duration: 2000,
    });
  };

  if (variant === 'compact') {
    return (
      <div className="minecraft-card p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="font-pixel text-sm text-purple-400">おすすめグッズ</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {rakutenProducts.slice(0, 3).map((product, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors text-xs"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-purple-400">🎁</span>
              <span className="text-gray-300 truncate">{product.title.substring(0, 20)}...</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-4">
        {showPeripherals && (
          <div className="minecraft-card p-4 bg-gradient-to-b from-orange-900/20 to-transparent border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4 text-orange-400" />
              <h3 className="font-pixel text-xs text-orange-400">おすすめグッズ</h3>
            </div>
            <div className="space-y-2">
              {rakutenProducts.slice(0, 2).map((product, idx) => (
                <motion.div
                  key={idx}
                  className="block p-2 bg-slate-800/30 border border-slate-700/50 hover:border-orange-500/50 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <span className="text-xs text-gray-300 line-clamp-2">{product.title}</span>
                  <span className="text-[10px] text-orange-400">楽天で見る →</span>
                </motion.div>
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

        </div>

        {/* ConoHa for GAME バナーセクション */}
        {showServers && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 text-emerald-400">🎮</span>
              <h3 className="font-pixel text-sm text-emerald-400">
                おすすめレンタルサーバー
              </h3>
            </div>
            
            {/* PC用バナー（728x90） */}
            <div className="hidden md:flex justify-center mb-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hover:opacity-90 transition-opacity"
              >
                <a 
                  href="//af.moshimo.com/af/c/click?a_id=5372290&p_id=4936&pc_id=13170&pl_id=68064" 
                  rel="nofollow" 
                  referrerPolicy="no-referrer-when-downgrade"
                  onClick={handleConohaClick}
                >
                  <img 
                    src="//image.moshimo.com/af-img/1762/000000068064.gif" 
                    width="728" 
                    height="90" 
                    style={{ border: 'none' }}
                    alt="ConoHa for GAME"
                  />
                </a>
                <img 
                  src="//i.moshimo.com/af/i/impression?a_id=5372290&p_id=4936&pc_id=13170&pl_id=68064" 
                  width="1" 
                  height="1" 
                  style={{ border: 'none' }} 
                  loading="lazy"
                  alt=""
                />
              </motion.div>
            </div>

            {/* スマホ用バナー（300x250） */}
            <div className="md:hidden flex justify-center mb-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hover:opacity-90 transition-opacity"
              >
                <a 
                  href="//af.moshimo.com/af/c/click?a_id=5372290&p_id=4936&pc_id=13170&pl_id=68067" 
                  rel="nofollow" 
                  referrerPolicy="no-referrer-when-downgrade"
                  onClick={handleConohaClick}
                >
                  <img 
                    src="//image.moshimo.com/af-img/1762/000000068067.gif" 
                    width="300" 
                    height="250" 
                    style={{ border: 'none' }}
                    alt="ConoHa for GAME"
                  />
                </a>
                <img 
                  src="//i.moshimo.com/af/i/impression?a_id=5372290&p_id=4936&pc_id=13170&pl_id=68067" 
                  width="1" 
                  height="1" 
                  style={{ border: 'none' }} 
                  loading="lazy"
                  alt=""
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* おすすめグッズセクション */}
        {showPeripherals && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-5 h-5 text-orange-400" />
              <h3 className="font-pixel text-sm text-orange-400">
                おすすめグッズ
              </h3>
            </div>
            
            {/* 楽天商品バナー - レスポンシブグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rakutenProducts.map((product, index) => (
                <motion.div
                  key={index}
                  className="relative block p-4 bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 商品画像 */}
                  <div className="mb-3 overflow-hidden bg-slate-900/50 rounded aspect-square">
                    <img 
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  {/* 商品情報 */}
                  <div className="flex-1">
                    <h4 className="font-pixel text-xs text-white mb-2 line-clamp-3 group-hover:text-orange-400 transition-colors">
                      {product.title}
                    </h4>
                    
                    {/* アフィリエイトリンク */}
                    <div 
                      className="flex items-center justify-between"
                      dangerouslySetInnerHTML={{
                        __html: `<a href="//af.moshimo.com/af/c/click?a_id=5369798&p_id=54&pc_id=54&pl_id=616" class="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors">楽天で見る<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a>`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
