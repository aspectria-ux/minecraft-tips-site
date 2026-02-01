/**
 * Generator Page
 * コマンド生成機 - 座標やアイテム名を入力してコマンドを自動生成
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Sparkles, 
  MapPin, 
  Box, 
  Sword,
  Wand2,
  Zap,
  Target
} from 'lucide-react';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';

type GeneratorType = 'teleport' | 'give' | 'summon' | 'fill' | 'effect' | 'enchant';

interface GeneratorConfig {
  id: GeneratorType;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const generators: GeneratorConfig[] = [
  { id: 'teleport', name: 'テレポート', icon: <MapPin className="w-5 h-5" />, description: '座標を入力して移動コマンドを作成', color: 'emerald' },
  { id: 'give', name: 'アイテム付与', icon: <Box className="w-5 h-5" />, description: 'アイテムをもらうコマンドを作成', color: 'yellow' },
  { id: 'summon', name: 'モブ召喚', icon: <Zap className="w-5 h-5" />, description: 'モブを召喚するコマンドを作成', color: 'purple' },
  { id: 'fill', name: 'ブロック設置', icon: <Target className="w-5 h-5" />, description: '範囲をブロックで埋めるコマンドを作成', color: 'cyan' },
  { id: 'effect', name: '効果付与', icon: <Wand2 className="w-5 h-5" />, description: 'ポーション効果を付けるコマンドを作成', color: 'pink' },
  { id: 'enchant', name: 'エンチャント', icon: <Sword className="w-5 h-5" />, description: '武器や防具を強化するコマンドを作成', color: 'orange' },
];

// よく使うアイテムリスト
const commonItems = [
  { id: 'diamond', name: 'ダイヤモンド' },
  { id: 'netherite_ingot', name: 'ネザライトインゴット' },
  { id: 'diamond_sword', name: 'ダイヤの剣' },
  { id: 'diamond_pickaxe', name: 'ダイヤのツルハシ' },
  { id: 'diamond_axe', name: 'ダイヤの斧' },
  { id: 'elytra', name: 'エリトラ' },
  { id: 'trident', name: 'トライデント' },
  { id: 'mace', name: 'メイス（1.21）' },
  { id: 'wind_charge', name: 'ウィンドチャージ（1.21）' },
  { id: 'golden_apple', name: '金のリンゴ' },
  { id: 'enchanted_golden_apple', name: 'エンチャントされた金のリンゴ' },
  { id: 'totem_of_undying', name: '不死のトーテム' },
  { id: 'firework_rocket', name: 'ロケット花火' },
  { id: 'ender_pearl', name: 'エンダーパール' },
  { id: 'experience_bottle', name: '経験値の瓶' },
];

// よく使うモブリスト
const commonMobs = [
  { id: 'pig', name: 'ブタ' },
  { id: 'cow', name: 'ウシ' },
  { id: 'sheep', name: 'ヒツジ' },
  { id: 'wolf', name: 'オオカミ' },
  { id: 'cat', name: 'ネコ' },
  { id: 'horse', name: 'ウマ' },
  { id: 'zombie', name: 'ゾンビ' },
  { id: 'skeleton', name: 'スケルトン' },
  { id: 'creeper', name: 'クリーパー' },
  { id: 'spider', name: 'クモ' },
  { id: 'enderman', name: 'エンダーマン' },
  { id: 'warden', name: 'ウォーデン' },
  { id: 'breeze', name: 'ブリーズ（1.21）' },
  { id: 'bogged', name: 'ボグド（1.21）' },
  { id: 'allay', name: 'アレイ' },
  { id: 'ender_dragon', name: 'エンダードラゴン' },
  { id: 'wither', name: 'ウィザー' },
  { id: 'iron_golem', name: 'アイアンゴーレム' },
];

// よく使うブロックリスト
const commonBlocks = [
  { id: 'stone', name: '石' },
  { id: 'cobblestone', name: '丸石' },
  { id: 'dirt', name: '土' },
  { id: 'grass_block', name: '草ブロック' },
  { id: 'oak_planks', name: 'オークの板材' },
  { id: 'glass', name: 'ガラス' },
  { id: 'diamond_block', name: 'ダイヤブロック' },
  { id: 'gold_block', name: '金ブロック' },
  { id: 'iron_block', name: '鉄ブロック' },
  { id: 'netherite_block', name: 'ネザライトブロック' },
  { id: 'obsidian', name: '黒曜石' },
  { id: 'glowstone', name: 'グロウストーン' },
  { id: 'sea_lantern', name: 'シーランタン' },
  { id: 'tnt', name: 'TNT' },
  { id: 'air', name: '空気（削除用）' },
];

// 効果リスト
const effects = [
  { id: 'speed', name: '移動速度上昇' },
  { id: 'slowness', name: '移動速度低下' },
  { id: 'haste', name: '採掘速度上昇' },
  { id: 'strength', name: '攻撃力上昇' },
  { id: 'instant_health', name: '即時回復' },
  { id: 'jump_boost', name: '跳躍力上昇' },
  { id: 'regeneration', name: '再生' },
  { id: 'resistance', name: '耐性' },
  { id: 'fire_resistance', name: '火炎耐性' },
  { id: 'water_breathing', name: '水中呼吸' },
  { id: 'invisibility', name: '透明化' },
  { id: 'night_vision', name: '暗視' },
  { id: 'saturation', name: '満腹度回復' },
  { id: 'slow_falling', name: '低速落下' },
  { id: 'conduit_power', name: 'コンジットパワー' },
];

// エンチャントリスト
const enchantments = [
  { id: 'sharpness', name: 'ダメージ増加', maxLevel: 5 },
  { id: 'smite', name: 'アンデッド特効', maxLevel: 5 },
  { id: 'bane_of_arthropods', name: '虫特効', maxLevel: 5 },
  { id: 'knockback', name: 'ノックバック', maxLevel: 2 },
  { id: 'fire_aspect', name: '火属性', maxLevel: 2 },
  { id: 'looting', name: 'ドロップ増加', maxLevel: 3 },
  { id: 'sweeping_edge', name: '範囲ダメージ増加', maxLevel: 3 },
  { id: 'efficiency', name: '効率強化', maxLevel: 5 },
  { id: 'silk_touch', name: 'シルクタッチ', maxLevel: 1 },
  { id: 'fortune', name: '幸運', maxLevel: 3 },
  { id: 'unbreaking', name: '耐久力', maxLevel: 3 },
  { id: 'mending', name: '修繕', maxLevel: 1 },
  { id: 'protection', name: 'ダメージ軽減', maxLevel: 4 },
  { id: 'feather_falling', name: '落下耐性', maxLevel: 4 },
  { id: 'infinity', name: '無限', maxLevel: 1 },
  { id: 'power', name: '射撃ダメージ増加', maxLevel: 5 },
  { id: 'riptide', name: '激流', maxLevel: 3 },
  { id: 'channeling', name: '召雷', maxLevel: 1 },
  { id: 'density', name: '高密度（1.21）', maxLevel: 5 },
  { id: 'breach', name: '貫通（1.21）', maxLevel: 4 },
  { id: 'wind_burst', name: '風爆発（1.21）', maxLevel: 3 },
];

export default function Generator() {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('teleport');
  const [copied, setCopied] = useState(false);
  
  // テレポート用
  const [tpX, setTpX] = useState('~');
  const [tpY, setTpY] = useState('~');
  const [tpZ, setTpZ] = useState('~');
  
  // アイテム付与用
  const [selectedItem, setSelectedItem] = useState('diamond');
  const [itemCount, setItemCount] = useState('64');
  
  // モブ召喚用
  const [selectedMob, setSelectedMob] = useState('pig');
  
  // fill用
  const [fillX1, setFillX1] = useState('~');
  const [fillY1, setFillY1] = useState('~');
  const [fillZ1, setFillZ1] = useState('~');
  const [fillX2, setFillX2] = useState('~5');
  const [fillY2, setFillY2] = useState('~5');
  const [fillZ2, setFillZ2] = useState('~5');
  const [selectedBlock, setSelectedBlock] = useState('stone');
  const [fillMode, setFillMode] = useState('replace');
  
  // 効果付与用
  const [selectedEffect, setSelectedEffect] = useState('speed');
  const [effectDuration, setEffectDuration] = useState('300');
  const [effectLevel, setEffectLevel] = useState('1');
  
  // エンチャント用
  const [selectedEnchant, setSelectedEnchant] = useState('sharpness');
  const [enchantLevel, setEnchantLevel] = useState('5');

  // コマンドを生成
  const generateCommand = (): string => {
    switch (activeGenerator) {
      case 'teleport':
        return `/tp @s ${tpX} ${tpY} ${tpZ}`;
      case 'give':
        return `/give @s ${selectedItem} ${itemCount}`;
      case 'summon':
        return `/summon ${selectedMob} ~ ~ ~`;
      case 'fill':
        return `/fill ${fillX1} ${fillY1} ${fillZ1} ${fillX2} ${fillY2} ${fillZ2} ${selectedBlock} ${fillMode}`;
      case 'effect':
        return `/effect give @s ${selectedEffect} ${effectDuration} ${effectLevel}`;
      case 'enchant':
        return `/enchant @s ${selectedEnchant} ${enchantLevel}`;
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    try {
      const command = generateCommand();
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success('コピーしたよ！ゲームに貼り付けてね！', {
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('コピーできなかった...もう一回試してね！');
    }
  };

  const renderGeneratorForm = () => {
    switch (activeGenerator) {
      case 'teleport':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">テレポート先の座標を入力してね！</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-pixel text-emerald-400 mb-1">X座標</label>
                <input
                  type="text"
                  value={tpX}
                  onChange={(e) => setTpX(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                  placeholder="~"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-emerald-400 mb-1">Y座標（高さ）</label>
                <input
                  type="text"
                  value={tpY}
                  onChange={(e) => setTpY(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                  placeholder="~"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-emerald-400 mb-1">Z座標</label>
                <input
                  type="text"
                  value={tpZ}
                  onChange={(e) => setTpZ(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                  placeholder="~"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              ヒント: 「~」は今いる場所、「~10」は今いる場所から+10という意味だよ！
            </p>
          </div>
        );
      
      case 'give':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">もらいたいアイテムを選んでね！</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-pixel text-yellow-400 mb-1">アイテム</label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                >
                  {commonItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-pixel text-yellow-400 mb-1">個数</label>
                <input
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(e.target.value)}
                  min="1"
                  max="64"
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              ヒント: 64個が1スタック（最大）だよ！
            </p>
          </div>
        );
      
      case 'summon':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">召喚したいモブを選んでね！</p>
            <div>
              <label className="block text-xs font-pixel text-purple-400 mb-1">モブ</label>
              <select
                value={selectedMob}
                onChange={(e) => setSelectedMob(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
              >
                {commonMobs.map(mob => (
                  <option key={mob.id} value={mob.id}>{mob.name}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500">
              ヒント: ボスモブは超強いから注意！
            </p>
          </div>
        );
      
      case 'fill':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">範囲とブロックを指定してね！</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">始点X</label>
                <input
                  type="text"
                  value={fillX1}
                  onChange={(e) => setFillX1(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">始点Y</label>
                <input
                  type="text"
                  value={fillY1}
                  onChange={(e) => setFillY1(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">始点Z</label>
                <input
                  type="text"
                  value={fillZ1}
                  onChange={(e) => setFillZ1(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">終点X</label>
                <input
                  type="text"
                  value={fillX2}
                  onChange={(e) => setFillX2(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">終点Y</label>
                <input
                  type="text"
                  value={fillY2}
                  onChange={(e) => setFillY2(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">終点Z</label>
                <input
                  type="text"
                  value={fillZ2}
                  onChange={(e) => setFillZ2(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">ブロック</label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                >
                  {commonBlocks.map(block => (
                    <option key={block.id} value={block.id}>{block.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-pixel text-cyan-400 mb-1">モード</label>
                <select
                  value={fillMode}
                  onChange={(e) => setFillMode(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                >
                  <option value="replace">置き換え</option>
                  <option value="hollow">中空</option>
                  <option value="outline">枠のみ</option>
                  <option value="destroy">破壊</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'effect':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">付けたい効果を選んでね！</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-pixel text-pink-400 mb-1">効果</label>
                <select
                  value={selectedEffect}
                  onChange={(e) => setSelectedEffect(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                >
                  {effects.map(effect => (
                    <option key={effect.id} value={effect.id}>{effect.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-pixel text-pink-400 mb-1">秒数</label>
                <input
                  type="number"
                  value={effectDuration}
                  onChange={(e) => setEffectDuration(e.target.value)}
                  min="1"
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-pixel text-pink-400 mb-1">レベル</label>
                <input
                  type="number"
                  value={effectLevel}
                  onChange={(e) => setEffectLevel(e.target.value)}
                  min="0"
                  max="255"
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              ヒント: レベルは0から始まるよ！0=レベル1、1=レベル2
            </p>
          </div>
        );
      
      case 'enchant':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">手に持っているアイテムにエンチャント！</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-pixel text-orange-400 mb-1">エンチャント</label>
                <select
                  value={selectedEnchant}
                  onChange={(e) => {
                    setSelectedEnchant(e.target.value);
                    const ench = enchantments.find(en => en.id === e.target.value);
                    if (ench) setEnchantLevel(String(ench.maxLevel));
                  }}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                >
                  {enchantments.map(ench => (
                    <option key={ench.id} value={ench.id}>{ench.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-pixel text-orange-400 mb-1">レベル</label>
                <input
                  type="number"
                  value={enchantLevel}
                  onChange={(e) => setEnchantLevel(e.target.value)}
                  min="1"
                  max={enchantments.find(en => en.id === selectedEnchant)?.maxLevel || 5}
                  className="w-full p-2 bg-slate-900 border border-slate-700 text-white font-pixel text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              ヒント: エンチャントしたいアイテムを手に持ってからコマンドを実行！
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="border-b border-slate-800 py-4">
        <div className="container">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                className="minecraft-btn px-3 py-2 flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-pixel">もどる</span>
              </motion.button>
            </Link>
            <h1 className="font-pixel text-xl text-emerald-400">
              コマンド生成機
            </h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 container py-8">
        {/* 生成機選択 */}
        <div className="mb-8">
          <h2 className="font-pixel text-sm text-gray-400 mb-4 text-center">
            作りたいコマンドを選んでね！
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {generators.map((gen) => {
              const isActive = activeGenerator === gen.id;
              return (
                <motion.button
                  key={gen.id}
                  onClick={() => setActiveGenerator(gen.id)}
                  className={`
                    minecraft-btn p-4 flex flex-col items-center gap-2 text-center
                    ${isActive ? 'ring-2 ring-emerald-400' : ''}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`
                    p-2 rounded
                    ${gen.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                    ${gen.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${gen.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                    ${gen.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                    ${gen.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : ''}
                    ${gen.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
                  `}>
                    {gen.icon}
                  </div>
                  <span className="font-pixel text-xs text-white">{gen.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 生成フォーム */}
        <div className="minecraft-card p-6 mb-8">
          <h3 className="font-pixel text-lg text-yellow-400 mb-4">
            {generators.find(g => g.id === activeGenerator)?.name}
          </h3>
          {renderGeneratorForm()}
        </div>

        {/* 生成されたコマンド */}
        <div className="minecraft-card p-6">
          <h3 className="font-pixel text-sm text-emerald-400 mb-3">
            生成されたコマンド
          </h3>
          <div className="command-block p-4 relative group">
            <code className="text-lg break-all block pr-12 text-yellow-300">
              {generateCommand()}
            </code>
            <motion.button
              onClick={handleCopy}
              className={`
                copy-btn absolute right-3 top-1/2 -translate-y-1/2 p-3 text-sm font-pixel
                ${copied ? 'copy-success bg-emerald-600' : ''}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            コピーボタンを押して、マイクラのチャット画面に貼り付けてね！
          </p>
        </div>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
