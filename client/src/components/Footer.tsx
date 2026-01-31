/**
 * Footer Component
 * サイトのフッター
 * デザイン: ピクセルアート・レトロゲーム風
 */

import { Heart, Gamepad2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 mt-12">
      <div className="container">
        <div className="text-center space-y-4">
          {/* 注意書き */}
          <div className="minecraft-card p-4 max-w-2xl mx-auto">
            <h3 className="font-pixel text-sm text-yellow-400 mb-2 flex items-center justify-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              大事なおしらせ
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              コマンドを使うには、ワールドの設定で「チートの許可」をオンにする必要があるよ！
              <br />
              統合版（Switch、スマホ、PC）とJava版で、一部のコマンドが違う場合があります。
            </p>
          </div>

          {/* コピーライト */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Minecraft fans</span>
          </div>

          <p className="text-xs text-gray-600">
            このサイトはMinecraft公式とは関係ありません。
            <br />
            Minecraft は Mojang Studios の商標です。
          </p>
        </div>
      </div>
    </footer>
  );
}
