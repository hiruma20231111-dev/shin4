'use client';

// ====================================================================
// InstagramFeed — Route Handler 経由でモード別フィードを取得
//
// PC: 3×3 グリッド / SP: 横スクロール (snap)
// ====================================================================

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { InstagramFeedResponse, InstagramPost, Mode } from '@/lib/types';

import { FadeInOnScroll } from './FadeInOnScroll';
import { useMode } from './ModeProvider';

const LIKE_LOCALE = 'ja-JP';

export function InstagramFeed() {
  const { mode } = useMode();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;
    setLoading(true);
    setError(null);
    fetch(`/api/instagram?mode=${mode}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as InstagramFeedResponse;
      })
      .then((data) => {
        if (aborted) return;
        setPosts(data.posts);
      })
      .catch((e: unknown) => {
        if (aborted) return;
        const message = e instanceof Error ? e.message : 'unknown error';
        setError(message);
      })
      .finally(() => {
        if (!aborted) setLoading(false);
      });
    return () => {
      aborted = true;
    };
  }, [mode]);

  return (
    <section
      id="instagram"
      aria-label="Instagram"
      className="py-20 md:py-28 bg-day-secondary/10 night:bg-night-secondary/15 transition-colors duration-mode"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader mode={mode} />

        {loading && (
          <p className="mt-8 text-day-text/70 night:text-night-text/70">
            Instagram を読み込み中…
          </p>
        )}
        {error && (
          <p className="mt-8 text-day-text/70 night:text-night-text/70">
            Instagram の読み込みに失敗しました。少し時間を置いて再表示してください。
          </p>
        )}

        {!loading && !error && (
          <>
            <FeedDesktop posts={posts} />
            <FeedMobile posts={posts} />
          </>
        )}
      </div>
    </section>
  );
}

function SectionHeader({ mode }: { mode: Mode }) {
  const accentFontClass =
    mode === 'day' ? 'font-day-accent' : 'font-night-accent';
  return (
    <FadeInOnScroll>
      <p
        className={`${accentFontClass} text-xl md:text-2xl tracking-widest text-day-primary night:text-night-primary`}
      >
        Instagram
      </p>
      <h2 className="mt-2 font-serif text-2xl md:text-4xl text-day-text night:text-night-text">
        <span data-mode-only="day">@sunday_bowls の今日</span>
        <span data-mode-only="night">@moonday_bar の夜</span>
      </h2>
    </FadeInOnScroll>
  );
}

function FeedDesktop({ posts }: { posts: InstagramPost[] }) {
  return (
    <ul className="mt-8 hidden md:grid grid-cols-3 gap-4">
      {posts.map((p) => (
        <li key={p.id}>
          <PostTile post={p} />
        </li>
      ))}
    </ul>
  );
}

function FeedMobile({ posts }: { posts: InstagramPost[] }) {
  return (
    <ul className="mt-8 md:hidden -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 gap-3">
      {posts.map((p) => (
        <li
          key={p.id}
          className="snap-start shrink-0 basis-[78%] sm:basis-[55%]"
        >
          <PostTile post={p} />
        </li>
      ))}
    </ul>
  );
}

function PostTile({ post }: { post: InstagramPost }) {
  return (
    <figure className="rounded-mode-md overflow-hidden border border-day-secondary/30 night:border-night-secondary/30 bg-day-bg night:bg-night-bg">
      <div className="img-hover-zoom relative aspect-square bg-day-secondary/15 night:bg-night-secondary/25">
        <Image
          src={post.imageSrc}
          alt={post.caption}
          fill
          sizes="(max-width: 768px) 78vw, 33vw"
          className="object-cover"
        />
      </div>
      <figcaption className="p-3 text-xs text-day-text/80 night:text-night-text/80 space-y-1">
        <p className="line-clamp-2">{post.caption}</p>
        <p className="text-day-text/60 night:text-night-text/60">
          ♥ {post.likeCount.toLocaleString(LIKE_LOCALE)} ・ {post.postedAt}
        </p>
      </figcaption>
    </figure>
  );
}
