// ====================================================================
// ModeBootstrapScript — ハイドレーション前にクライアント側の真のモードを反映
//
// SSR では「サーバー時刻」で data-mode を決めて出力するが、
// ユーザーのローカル時刻・localStorage・sessionStorage の値とは食い違いうる。
// このスクリプトは React のハイドレーションよりも前に同期実行され、
// クライアントの真の状態に合わせて <html data-mode> を上書きする。
// React 側はマウント後に DOM の data-mode を読んで状態を同期するため
// 不一致は起こらない。
// ====================================================================

import {
  NIGHT_MODE_START_HOUR,
  SESSION_KEY_TEMP_MODE,
  STORAGE_KEY_MODE_PREFERENCE,
} from '@/lib/constants';

const BOOTSTRAP_SCRIPT = `
(function() {
  try {
    var KEY_PERSIST = ${JSON.stringify(STORAGE_KEY_MODE_PREFERENCE)};
    var KEY_TEMP = ${JSON.stringify(SESSION_KEY_TEMP_MODE)};
    var NIGHT_START = ${NIGHT_MODE_START_HOUR};
    var temp = null;
    var persisted = null;
    try { temp = sessionStorage.getItem(KEY_TEMP); } catch (_) {}
    try { persisted = localStorage.getItem(KEY_PERSIST); } catch (_) {}
    var mode;
    if (temp === 'day' || temp === 'night') {
      mode = temp;
    } else if (persisted === 'day' || persisted === 'night') {
      mode = persisted;
    } else {
      mode = new Date().getHours() >= NIGHT_START ? 'night' : 'day';
    }
    document.documentElement.setAttribute('data-mode', mode);
  } catch (e) {
    // ストレージアクセス不可時はサーバー描画値を維持
  }
})();
`;

export function ModeBootstrapScript() {
  return (
    <script
      // 早期実行が必要なため dangerouslySetInnerHTML を採用
      dangerouslySetInnerHTML={{ __html: BOOTSTRAP_SCRIPT }}
    />
  );
}
