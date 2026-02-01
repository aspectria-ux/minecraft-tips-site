/**
 * コマンドデータの型定義とユーティリティ関数
 * データは /public/data/commands.json から読み込み
 */

// プラットフォーム種別
export type Platform = 'java' | 'bedrock' | 'both';

// 難易度
export type Difficulty = 'easy' | 'medium' | 'hard';

// カテゴリID
export type CommandCategory = 'teleport' | 'summon' | 'utility' | 'enchant' | 'execute' | 'building';

// コマンドの型定義
export interface Command {
  id: string;
  category: CommandCategory;
  title: string;
  description: string;
  command: string;
  example?: string;
  tips?: string;
  difficulty: Difficulty;
  tags: string[];
  platform: Platform;
}

// カテゴリの型定義
export interface Category {
  id: CommandCategory;
  name: string;
  icon: string;
  description: string;
}

// JSONデータの型定義
export interface CommandsData {
  version: string;
  lastUpdated: string;
  categories: Category[];
  commands: Command[];
}

// データをキャッシュ
let cachedData: CommandsData | null = null;

// JSONデータを読み込む
export async function loadCommandsData(): Promise<CommandsData> {
  if (cachedData) {
    return cachedData;
  }
  
  const response = await fetch('/data/commands.json');
  if (!response.ok) {
    throw new Error('Failed to load commands data');
  }
  
  cachedData = await response.json();
  return cachedData!;
}

// カテゴリ別にコマンドを取得（プラットフォームフィルター付き）
export function getCommandsByCategory(
  commands: Command[],
  category: CommandCategory,
  platform: 'java' | 'bedrock' | 'all' = 'all'
): Command[] {
  return commands.filter(cmd => {
    const categoryMatch = cmd.category === category;
    if (platform === 'all') {
      return categoryMatch;
    }
    return categoryMatch && (cmd.platform === platform || cmd.platform === 'both');
  });
}

// コマンドを検索（プラットフォームフィルター付き）
export function searchCommands(
  commands: Command[],
  query: string,
  platform: 'java' | 'bedrock' | 'all' = 'all'
): Command[] {
  const lowerQuery = query.toLowerCase();
  return commands.filter(cmd => {
    const platformMatch = platform === 'all' || cmd.platform === platform || cmd.platform === 'both';
    if (!platformMatch) return false;
    
    return (
      cmd.title.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.command.toLowerCase().includes(lowerQuery) ||
      cmd.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

// 難易度でフィルター
export function filterByDifficulty(
  commands: Command[],
  difficulty: Difficulty | 'all'
): Command[] {
  if (difficulty === 'all') return commands;
  return commands.filter(cmd => cmd.difficulty === difficulty);
}

// プラットフォームのラベルを取得
export function getPlatformLabel(platform: Platform): string {
  switch (platform) {
    case 'java':
      return 'Java版';
    case 'bedrock':
      return '統合版';
    case 'both':
      return '両対応';
  }
}

// 難易度のラベルを取得
export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'かんたん';
    case 'medium':
      return 'ふつう';
    case 'hard':
      return 'むずかしい';
  }
}
