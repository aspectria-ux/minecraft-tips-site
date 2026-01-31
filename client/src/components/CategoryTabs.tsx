/**
 * CategoryTabs Component
 * マイクラのホットバー風カテゴリ選択タブ
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { categories, type CommandCategory } from '@/data/commands';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  activeCategory: CommandCategory;
  onCategoryChange: (category: CommandCategory) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max justify-center">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                minecraft-btn px-4 py-3 flex flex-col items-center gap-2 min-w-[100px]
                ${isActive ? 'category-tab-active' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 relative">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-full h-full object-contain pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-400/20 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span className={`
                font-pixel text-xs whitespace-nowrap
                ${isActive ? 'text-white' : 'text-gray-300'}
              `}>
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
