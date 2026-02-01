/**
 * CommandCard Component
 * マイクラ風のコマンドカード。コピーボタン付き。
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { useState } from 'react';
import { Copy, Check, Sparkles, AlertTriangle, Monitor, Smartphone, Globe } from 'lucide-react';
import type { Command } from '@/data/commands';
import { toast } from 'sonner';

interface CommandCardProps {
  command: Command;
}

export function CommandCard({ command }: CommandCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // コマンドの例があればそれを、なければ基本コマンドをコピー
      const textToCopy = command.example || command.command;
      await navigator.clipboard.writeText(textToCopy);
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

  const getDifficultyBadge = () => {
    switch (command.difficulty) {
      case 'easy':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            かんたん
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            ふつう
          </span>
        );
      case 'hard':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-red-500/20 text-red-400 border border-red-500/30">
            むずかしい
          </span>
        );
    }
  };

  const getPlatformBadge = () => {
    switch (command.platform) {
      case 'java':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            Java版
          </span>
        );
      case 'bedrock':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            統合版
          </span>
        );
      case 'both':
        return (
          <span className="px-2 py-0.5 text-xs font-pixel bg-slate-500/20 text-slate-400 border border-slate-500/30 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            両対応
          </span>
        );
    }
  };

  return (
    <div className="minecraft-card p-4 hover:scale-[1.02] transition-transform duration-200 h-full flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <h3 className="font-pixel text-base text-emerald-400 mb-1">
            {command.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {getDifficultyBadge()}
            {getPlatformBadge()}
            {command.difficulty === 'hard' && (
              <span className="flex items-center gap-1 text-xs text-red-400">
                <AlertTriangle className="w-3 h-3" />
                上級者向け
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 説明 */}
      <p className="text-sm text-gray-300 mb-4 leading-relaxed flex-grow">
        {command.description}
      </p>

      {/* コマンドブロック */}
      <div className="command-block p-3 mb-3 relative group">
        <code className="text-sm break-all block pr-10">
          {command.command}
        </code>
        <button
          onClick={handleCopy}
          className={`copy-btn absolute right-2 top-1/2 -translate-y-1/2 p-2 text-xs font-pixel
            ${copied ? 'copy-success bg-emerald-600' : ''}`}
          aria-label="コマンドをコピー"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 使用例 */}
      {command.example && command.example !== command.command && (
        <div className="mb-3">
          <span className="text-xs font-pixel text-yellow-400 block mb-1">
            使用例：
          </span>
          <div className="command-block p-2 text-xs">
            <code className="text-yellow-300">{command.example}</code>
          </div>
        </div>
      )}

      {/* ヒント */}
      {command.tips && (
        <div className="bg-purple-900/30 border border-purple-500/30 p-3 mt-auto">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-purple-300 leading-relaxed">
              {command.tips}
            </p>
          </div>
        </div>
      )}

      {/* タグ */}
      <div className="flex flex-wrap gap-1 mt-3">
        {command.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-400 border border-slate-600/50"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
