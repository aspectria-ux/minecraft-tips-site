/**
 * PlatformSwitch Component
 * Java版/統合版の切り替えスイッチ
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { motion } from 'framer-motion';
import { Monitor, Smartphone, Globe } from 'lucide-react';

type PlatformFilter = 'java' | 'bedrock' | 'all';

interface PlatformSwitchProps {
  value: PlatformFilter;
  onChange: (value: PlatformFilter) => void;
}

const platforms: { id: PlatformFilter; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'all', label: 'すべて', icon: <Globe className="w-4 h-4" />, color: 'emerald' },
  { id: 'java', label: 'Java版', icon: <Monitor className="w-4 h-4" />, color: 'orange' },
  { id: 'bedrock', label: '統合版', icon: <Smartphone className="w-4 h-4" />, color: 'cyan' },
];

export function PlatformSwitch({ value, onChange }: PlatformSwitchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-pixel text-gray-500">バージョンを選ぶ</span>
      <div className="flex gap-1 p-1 bg-slate-800/50 border border-slate-700 rounded-lg">
        {platforms.map((platform) => {
          const isActive = value === platform.id;
          return (
            <motion.button
              key={platform.id}
              onClick={() => onChange(platform.id)}
              className={`
                relative px-4 py-2 font-pixel text-xs flex items-center gap-2 rounded transition-colors
                ${isActive 
                  ? platform.id === 'java' 
                    ? 'text-orange-400' 
                    : platform.id === 'bedrock'
                      ? 'text-cyan-400'
                      : 'text-emerald-400'
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="platform-bg"
                  className={`
                    absolute inset-0 rounded
                    ${platform.id === 'java' 
                      ? 'bg-orange-500/20 border border-orange-500/30' 
                      : platform.id === 'bedrock'
                        ? 'bg-cyan-500/20 border border-cyan-500/30'
                        : 'bg-emerald-500/20 border border-emerald-500/30'
                    }
                  `}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {platform.icon}
                {platform.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-gray-600">
        {value === 'java' && 'PC版（Java Edition）のコマンドを表示'}
        {value === 'bedrock' && 'Switch・スマホ・Windows10版のコマンドを表示'}
        {value === 'all' && '全てのコマンドを表示'}
      </p>
    </div>
  );
}
