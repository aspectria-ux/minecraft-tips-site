/**
 * マインクラフトコマンドデータ
 * 小学生男子向けに分かりやすい説明を心がけています
 */

export type CommandCategory = 'teleport' | 'summon' | 'utility' | 'enchant';

export interface Command {
  id: string;
  title: string;
  description: string;
  command: string;
  example?: string;
  tips?: string;
  category: CommandCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const categories: { id: CommandCategory; name: string; icon: string; description: string }[] = [
  {
    id: 'teleport',
    name: 'テレポート',
    icon: '/images/teleport-icon.png',
    description: '一瞬で移動できる魔法のコマンド！'
  },
  {
    id: 'summon',
    name: '召喚（しょうかん）',
    icon: '/images/summon-icon.png',
    description: 'モブやアイテムを呼び出そう！'
  },
  {
    id: 'utility',
    name: '便利コマンド',
    icon: '/images/utility-icon.png',
    description: '冒険をもっと楽しくする！'
  },
  {
    id: 'enchant',
    name: 'エンチャント',
    icon: '/images/utility-icon.png',
    description: '装備を最強にパワーアップ！'
  }
];

export const commands: Command[] = [
  // テレポートコマンド
  {
    id: 'tp-coords',
    title: '座標にテレポート',
    description: '好きな場所に一瞬で飛べるぞ！座標（x, y, z）を入れてね。',
    command: '/tp @s <x> <y> <z>',
    example: '/tp @s 100 64 100',
    tips: 'y=64は地面の高さだよ。迷ったらこの数字を使おう！',
    category: 'teleport',
    difficulty: 'easy',
    tags: ['移動', '座標', '基本']
  },
  {
    id: 'tp-friend',
    title: '友達のところに飛ぶ',
    description: '友達の名前を入れると、その人のところに瞬間移動！',
    command: '/tp @s <友達の名前>',
    example: '/tp @s Steve',
    tips: '名前は正確に入力しよう。大文字・小文字も区別されるよ！',
    category: 'teleport',
    difficulty: 'easy',
    tags: ['移動', 'マルチプレイ', '友達']
  },
  {
    id: 'tp-bring-friend',
    title: '友達を呼び寄せる',
    description: '迷子になった友達を自分のところに呼べるよ！',
    command: '/tp <友達の名前> @s',
    example: '/tp Alex @s',
    tips: '順番が大事！呼びたい人の名前を先に書こう。',
    category: 'teleport',
    difficulty: 'easy',
    tags: ['移動', 'マルチプレイ', '救助']
  },
  {
    id: 'tp-relative',
    title: '今いる場所から移動',
    description: '今いる場所を基準に、ちょっとだけ移動できるよ！',
    command: '/tp @s ~<x> ~<y> ~<z>',
    example: '/tp @s ~10 ~0 ~0',
    tips: '~（チルダ）を使うと「今いる場所から」という意味になるよ！',
    category: 'teleport',
    difficulty: 'medium',
    tags: ['移動', '相対座標', '応用']
  },
  {
    id: 'locate-village',
    title: '村を探して飛ぶ',
    description: '近くの村を見つけて、そこにテレポートしよう！',
    command: '/locate structure village',
    example: '/locate structure village',
    tips: '表示された座標をクリックすると、自動でテレポートコマンドが入力されるよ！',
    category: 'teleport',
    difficulty: 'easy',
    tags: ['探索', '村', '建造物']
  },
  {
    id: 'locate-temple',
    title: '神殿を探す',
    description: 'ジャングルの神殿や砂漠の神殿を見つけよう！',
    command: '/locate structure <構造物名>',
    example: '/locate structure desert_pyramid',
    tips: 'jungle_pyramid（ジャングル神殿）、desert_pyramid（砂漠の神殿）が使えるよ！',
    category: 'teleport',
    difficulty: 'medium',
    tags: ['探索', '神殿', '宝探し']
  },

  // 召喚コマンド
  {
    id: 'summon-pig',
    title: 'ブタを召喚',
    description: 'かわいいブタを目の前に出現させよう！',
    command: '/summon pig',
    example: '/summon pig',
    tips: 'ニンジンを持っていると、ブタがついてくるよ！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['動物', 'かわいい', '基本']
  },
  {
    id: 'summon-wolf',
    title: 'オオカミを召喚',
    description: '骨をあげると仲間になってくれるオオカミだ！',
    command: '/summon wolf',
    example: '/summon wolf',
    tips: '骨を持って右クリックすると、ペットになるよ！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['動物', 'ペット', '仲間']
  },
  {
    id: 'summon-cat',
    title: 'ネコを召喚',
    description: '生魚をあげると仲間になるネコを出そう！',
    command: '/summon cat',
    example: '/summon cat',
    tips: 'ネコがいると、クリーパーが近づいてこないよ！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['動物', 'ペット', '守り']
  },
  {
    id: 'summon-zombie',
    title: 'ゾンビを召喚',
    description: '敵モブのゾンビを出現させる！戦いの練習に！',
    command: '/summon zombie',
    example: '/summon zombie',
    tips: '昼間に出すと燃えちゃうから、日陰で出そう！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['敵', 'モンスター', '戦闘']
  },
  {
    id: 'summon-creeper',
    title: 'クリーパーを召喚',
    description: 'シューッという音が怖い、爆発するモンスター！',
    command: '/summon creeper',
    example: '/summon creeper',
    tips: '近づきすぎると爆発するから気をつけて！',
    category: 'summon',
    difficulty: 'medium',
    tags: ['敵', '爆発', '危険']
  },
  {
    id: 'summon-lightning',
    title: '雷を落とす',
    description: '狙った場所に雷を落とせる！クリーパーに当てると帯電クリーパーに！',
    command: '/summon lightning_bolt',
    example: '/summon lightning_bolt',
    tips: '帯電クリーパーを倒すと、モブの頭がドロップするよ！',
    category: 'summon',
    difficulty: 'medium',
    tags: ['天気', '特殊', 'レア']
  },
  {
    id: 'summon-wither',
    title: 'ウィザーを召喚',
    description: '超強いボス「ウィザー」を呼び出す！準備してから挑戦しよう！',
    command: '/summon wither',
    example: '/summon wither',
    tips: '⚠️ めちゃくちゃ強いから、最強装備で挑もう！',
    category: 'summon',
    difficulty: 'hard',
    tags: ['ボス', '最強', '上級者']
  },
  {
    id: 'summon-dragon',
    title: 'エンダードラゴンを召喚',
    description: 'マイクラ最強のボス！オーバーワールドに出すと大変なことに！',
    command: '/summon ender_dragon',
    example: '/summon ender_dragon',
    tips: '⚠️ 地形が壊れるから、大事なワールドでは出さないで！',
    category: 'summon',
    difficulty: 'hard',
    tags: ['ボス', '最強', 'エンド']
  },
  {
    id: 'summon-panda',
    title: 'パンダを召喚',
    description: 'かわいいパンダを出現！いろんな性格のパンダがいるよ。',
    command: '/summon panda',
    example: '/summon panda',
    tips: '竹をあげると喜ぶよ！赤ちゃんパンダもかわいい！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['動物', 'かわいい', 'レア']
  },
  {
    id: 'summon-axolotl',
    title: 'ウーパールーパーを召喚',
    description: '水の中で一緒に戦ってくれる、かわいい仲間！',
    command: '/summon axolotl',
    example: '/summon axolotl',
    tips: '熱帯魚をあげると仲良くなれるよ！青色は超レア！',
    category: 'summon',
    difficulty: 'easy',
    tags: ['動物', '水中', 'かわいい']
  },

  // 便利コマンド
  {
    id: 'keep-inventory',
    title: '死んでもアイテムを落とさない',
    description: 'これさえあれば、マグマに落ちても大丈夫！',
    command: '/gamerule keepInventory true',
    example: '/gamerule keepInventory true',
    tips: '元に戻すときは true を false に変えてね！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['安全', 'アイテム', '必須']
  },
  {
    id: 'time-day',
    title: '朝にする',
    description: '夜が怖い？これで一瞬で朝になるよ！',
    command: '/time set day',
    example: '/time set day',
    tips: 'day（朝）、noon（昼）、sunset（夕方）、night（夜）が使えるよ！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['時間', '基本', '便利']
  },
  {
    id: 'time-night',
    title: '夜にする',
    description: 'モンスターと戦いたいときや、星を見たいときに！',
    command: '/time set night',
    example: '/time set night',
    tips: 'ベッドで寝ると朝になるよ！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['時間', 'モンスター', '探索']
  },
  {
    id: 'weather-clear',
    title: '天気を晴れにする',
    description: '雨や雷雨をやめさせて、晴れにしよう！',
    command: '/weather clear',
    example: '/weather clear',
    tips: 'clear（晴れ）、rain（雨）、thunder（雷雨）が使えるよ！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['天気', '基本', '便利']
  },
  {
    id: 'gamemode-creative',
    title: 'クリエイティブモードにする',
    description: '空を飛んだり、無限にブロックを使えるモード！',
    command: '/gamemode creative',
    example: '/gamemode creative',
    tips: '短く /gamemode c でもOK！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['ゲームモード', '建築', '自由']
  },
  {
    id: 'gamemode-survival',
    title: 'サバイバルモードにする',
    description: '普通のマイクラに戻りたいときはこれ！',
    command: '/gamemode survival',
    example: '/gamemode survival',
    tips: '短く /gamemode s でもOK！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['ゲームモード', '冒険', '基本']
  },
  {
    id: 'give-diamond',
    title: 'ダイヤモンドをもらう',
    description: '欲しい数だけダイヤモンドをゲット！',
    command: '/give @s diamond <個数>',
    example: '/give @s diamond 64',
    tips: '64個が1スタック（最大）だよ！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['アイテム', '資源', '便利']
  },
  {
    id: 'give-netherite',
    title: 'ネザライトインゴットをもらう',
    description: 'ダイヤより強い、最強の素材をゲット！',
    command: '/give @s netherite_ingot <個数>',
    example: '/give @s netherite_ingot 10',
    tips: 'ネザライト装備は溶岩に落ちても燃えないよ！',
    category: 'utility',
    difficulty: 'easy',
    tags: ['アイテム', '最強', 'ネザー']
  },
  {
    id: 'kill-mobs',
    title: '周りのモンスターを全部倒す',
    description: 'モンスターに囲まれたときの緊急脱出コマンド！',
    command: '/kill @e[type=!player]',
    example: '/kill @e[type=!player]',
    tips: '⚠️ ペットも消えちゃうから注意！',
    category: 'utility',
    difficulty: 'medium',
    tags: ['戦闘', '緊急', '全滅']
  },
  {
    id: 'effect-speed',
    title: '移動速度アップ',
    description: '足が速くなって、どこでもすぐに行ける！',
    command: '/effect give @s speed <秒数> <強さ>',
    example: '/effect give @s speed 300 2',
    tips: '強さは0〜255まで。2くらいがちょうどいいよ！',
    category: 'utility',
    difficulty: 'medium',
    tags: ['効果', '移動', 'バフ']
  },
  {
    id: 'effect-nightvision',
    title: '暗視（あんし）',
    description: '暗いところでも明るく見える！洞窟探検に最適！',
    command: '/effect give @s night_vision infinite',
    example: '/effect give @s night_vision infinite',
    tips: 'infinite で永久に続くよ！消すときは /effect clear @s',
    category: 'utility',
    difficulty: 'easy',
    tags: ['効果', '探索', '洞窟']
  },
  {
    id: 'fill-air',
    title: 'ブロックを消して整地',
    description: '指定した範囲のブロックを全部消せる！',
    command: '/fill <x1> <y1> <z1> <x2> <y2> <z2> air',
    example: '/fill ~-5 ~-1 ~-5 ~5 ~5 ~5 air',
    tips: '~を使うと今いる場所を基準にできるよ！',
    category: 'utility',
    difficulty: 'medium',
    tags: ['建築', '整地', '応用']
  },
  {
    id: 'fill-blocks',
    title: 'ブロックで埋める',
    description: '指定した範囲を好きなブロックで埋め尽くす！',
    command: '/fill <x1> <y1> <z1> <x2> <y2> <z2> <ブロック名>',
    example: '/fill ~0 ~0 ~0 ~10 ~0 ~10 diamond_block',
    tips: 'ダイヤブロックの床を一瞬で作れるよ！',
    category: 'utility',
    difficulty: 'medium',
    tags: ['建築', 'ブロック', '応用']
  },

  // エンチャントコマンド
  {
    id: 'enchant-sharpness',
    title: '剣の攻撃力アップ',
    description: '剣を手に持って、攻撃力をMAXにしよう！',
    command: '/enchant @s sharpness 5',
    example: '/enchant @s sharpness 5',
    tips: '剣を手に持った状態で実行してね！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['武器', '攻撃', '剣']
  },
  {
    id: 'enchant-protection',
    title: '防具の防御力アップ',
    description: '防具を手に持って、ダメージを減らそう！',
    command: '/enchant @s protection 4',
    example: '/enchant @s protection 4',
    tips: '胸当て、レギンス、ブーツ、ヘルメット全部につけよう！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['防具', '防御', '安全']
  },
  {
    id: 'enchant-fire-protection',
    title: '火炎耐性',
    description: 'マグマに落ちても長く生き残れる！',
    command: '/enchant @s fire_protection 4',
    example: '/enchant @s fire_protection 4',
    tips: 'ネザー探検には必須のエンチャント！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['防具', '火', 'ネザー']
  },
  {
    id: 'enchant-unbreaking',
    title: '耐久力アップ',
    description: '道具や防具が壊れにくくなる！',
    command: '/enchant @s unbreaking 3',
    example: '/enchant @s unbreaking 3',
    tips: 'ダイヤのツルハシにつけると超長持ち！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['道具', '耐久', '便利']
  },
  {
    id: 'enchant-efficiency',
    title: '採掘速度アップ',
    description: 'ツルハシの掘る速度が超速くなる！',
    command: '/enchant @s efficiency 5',
    example: '/enchant @s efficiency 5',
    tips: 'ツルハシを手に持って実行してね！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['道具', '採掘', '速度']
  },
  {
    id: 'enchant-fortune',
    title: '幸運（こううん）',
    description: 'ダイヤや鉄がたくさんドロップするようになる！',
    command: '/enchant @s fortune 3',
    example: '/enchant @s fortune 3',
    tips: 'ダイヤ鉱石を掘るときは絶対これ！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['道具', 'ドロップ', '資源']
  },
  {
    id: 'enchant-looting',
    title: 'ドロップ増加',
    description: 'モンスターを倒したときのドロップが増える！',
    command: '/enchant @s looting 3',
    example: '/enchant @s looting 3',
    tips: '剣につけると、レアアイテムが出やすくなるよ！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['武器', 'ドロップ', 'レア']
  },
  {
    id: 'enchant-mending',
    title: '修繕（しゅうぜん）',
    description: '経験値を集めると道具が自動で直る！',
    command: '/enchant @s mending',
    example: '/enchant @s mending',
    tips: '最強のエンチャント！これで道具が永久に使える！',
    category: 'enchant',
    difficulty: 'easy',
    tags: ['道具', '修理', '最強']
  }
];

export function getCommandsByCategory(category: CommandCategory): Command[] {
  return commands.filter(cmd => cmd.category === category);
}

export function searchCommands(query: string): Command[] {
  const lowerQuery = query.toLowerCase();
  return commands.filter(cmd => 
    cmd.title.toLowerCase().includes(lowerQuery) ||
    cmd.description.toLowerCase().includes(lowerQuery) ||
    cmd.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    cmd.command.toLowerCase().includes(lowerQuery)
  );
}
