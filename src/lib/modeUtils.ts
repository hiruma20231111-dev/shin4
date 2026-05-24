// ====================================================================
// モード判定ユーティリティ
// ====================================================================

import {
  MODE_DAY,
  MODE_NIGHT,
  NIGHT_MODE_START_HOUR,
} from './constants';
import type { Mode } from './types';

/**
 * 与えられた時刻に対応する初期モード。
 * 中休み (16:00〜18:00) は自動判定の境界として扱わず、17時を境界に採用する。
 */
export function modeFromHour(hour: number): Mode {
  return hour >= NIGHT_MODE_START_HOUR ? MODE_NIGHT : MODE_DAY;
}

/** モード切替: 与えられたモードの「もう一方」を返す */
export function oppositeMode(mode: Mode): Mode {
  return mode === MODE_DAY ? MODE_NIGHT : MODE_DAY;
}

/** 任意の値が Mode 型か判定 */
export function isMode(value: unknown): value is Mode {
  return value === MODE_DAY || value === MODE_NIGHT;
}
