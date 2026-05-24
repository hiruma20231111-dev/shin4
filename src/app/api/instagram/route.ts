// ====================================================================
// /api/instagram — モード別フィードを返す Route Handler
//
// 環境変数:
//   NEXT_PUBLIC_USE_MOCK_INSTAGRAM=true (既定) — モックJSON返却
//   NEXT_PUBLIC_USE_MOCK_INSTAGRAM=false      — Graph API呼び出し構造
//
// キャッシュ: ISR (revalidate = INSTAGRAM_CACHE_REVALIDATE_SECONDS)
// ====================================================================

import { NextResponse } from 'next/server';

import { INSTAGRAM_MOCK_BY_MODE } from '@/data/instagramMock';
import {
  INSTAGRAM_CACHE_REVALIDATE_SECONDS,
  INSTAGRAM_POSTS_PER_MODE,
  USE_MOCK_INSTAGRAM,
} from '@/lib/constants';
import { isMode } from '@/lib/modeUtils';
import type {
  InstagramFeedResponse,
  InstagramPost,
  Mode,
} from '@/lib/types';

export const revalidate = INSTAGRAM_CACHE_REVALIDATE_SECONDS;

const INSTAGRAM_GRAPH_BASE = 'https://graph.instagram.com';

type GraphMediaItem = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  like_count?: number;
};

type GraphMediaResponse = {
  data: GraphMediaItem[];
};

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const modeParam = url.searchParams.get('mode');
  if (!isMode(modeParam)) {
    return NextResponse.json(
      { error: 'invalid_mode' },
      { status: 400 },
    );
  }

  const posts = USE_MOCK_INSTAGRAM
    ? INSTAGRAM_MOCK_BY_MODE[modeParam]
    : await fetchGraphPosts(modeParam);

  const body: InstagramFeedResponse = {
    mode: modeParam,
    posts: posts.slice(0, INSTAGRAM_POSTS_PER_MODE),
  };
  return NextResponse.json(body);
}

/**
 * Instagram Graph API からモードに対応するアカウントの投稿を取得する。
 * 失敗時はモックへフォールバック (LPの体験を絶対に壊さない方針)。
 */
async function fetchGraphPosts(mode: Mode): Promise<InstagramPost[]> {
  const tokenEnv =
    mode === 'day'
      ? process.env.INSTAGRAM_ACCESS_TOKEN_DAY
      : process.env.INSTAGRAM_ACCESS_TOKEN_NIGHT;
  const userIdEnv =
    mode === 'day'
      ? process.env.INSTAGRAM_USER_ID_DAY
      : process.env.INSTAGRAM_USER_ID_NIGHT;

  if (!tokenEnv || !userIdEnv) {
    // TODO: 本番ではGraph API認証情報の不足時にエラー監視通知を行う
    return INSTAGRAM_MOCK_BY_MODE[mode];
  }

  const fields = [
    'id',
    'caption',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp',
    'like_count',
  ].join(',');

  const requestUrl =
    `${INSTAGRAM_GRAPH_BASE}/${userIdEnv}/media` +
    `?fields=${fields}` +
    `&limit=${INSTAGRAM_POSTS_PER_MODE}` +
    `&access_token=${tokenEnv}`;

  try {
    const res = await fetch(requestUrl, {
      next: { revalidate: INSTAGRAM_CACHE_REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      return INSTAGRAM_MOCK_BY_MODE[mode];
    }
    const json = (await res.json()) as GraphMediaResponse;
    return json.data.map<InstagramPost>((m) => ({
      id: m.id,
      imageSrc: m.media_url ?? m.thumbnail_url ?? '',
      caption: m.caption ?? '',
      likeCount: m.like_count ?? 0,
      postedAt: m.timestamp ?? '',
      isMock: false,
    }));
  } catch {
    return INSTAGRAM_MOCK_BY_MODE[mode];
  }
}
