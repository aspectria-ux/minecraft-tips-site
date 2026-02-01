/**
 * CategoryTabs Component
 * マイクラのホットバー風カテゴリ選択タブ
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { type CommandCategory, type Category } from '@/data/commands';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: CommandCategory;
  onCategoryChange: (category: CommandCategory) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max justify-center flex-wrap">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                minecraft-btn px-3 py-2 flex flex-col items-center gap-1 min-w-[80px]
                ${isActive ? 'category-tab-active' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 relative">
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
                font-pixel text-[10px] whitespace-nowrap
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
