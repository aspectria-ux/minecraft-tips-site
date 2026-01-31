/**
 * SearchBar Component
 * マイクラ風の検索バー
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'コマンドを検索...' }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="minecraft-card p-1">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-emerald-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="
              w-full py-3 pl-10 pr-10
              bg-slate-900/80 
              text-white placeholder-gray-500
              font-pixel text-sm
              border-2 border-slate-700
              focus:border-emerald-500 focus:outline-none
              transition-colors
            "
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 p-1 hover:bg-slate-700 rounded transition-colors"
              aria-label="検索をクリア"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center font-pixel">
        やりたいことを入力してね！例：「村」「ダイヤ」「速く」
      </p>
    </div>
  );
}
