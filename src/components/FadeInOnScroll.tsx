'use client';

// ====================================================================
// FadeInOnScroll — IntersectionObserverによるスクロールフェードイン
// 外部ライブラリ不使用、CSS transition で実装。
// ====================================================================

import { useEffect, useRef, useState } from 'react';

const OBSERVER_THRESHOLD = 0.1;
const OBSERVER_ROOT_MARGIN = '0px 0px -10% 0px';

type Props = React.HTMLAttributes<HTMLElement> & {
  /** ラップ要素タグ ('div' | 'section' | 'li' など)。デフォルト 'div' */
  as?: 'div' | 'section' | 'li' | 'article' | 'aside' | 'header' | 'footer';
};

export function FadeInOnScroll({
  children,
  className = '',
  as = 'div',
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: OBSERVER_THRESHOLD, rootMargin: OBSERVER_ROOT_MARGIN },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mergedClass = `fade-on-scroll ${visible ? 'is-visible' : ''} ${className}`;
  const refCallback = (node: HTMLElement | null) => {
    ref.current = node;
  };

  // 共通ロジックでタグごとに描画
  if (as === 'section') {
    return (
      <section ref={refCallback} className={mergedClass} {...rest}>
        {children}
      </section>
    );
  }
  if (as === 'li') {
    return (
      <li
        ref={refCallback as React.RefCallback<HTMLLIElement>}
        className={mergedClass}
        {...(rest as React.HTMLAttributes<HTMLLIElement>)}
      >
        {children}
      </li>
    );
  }
  if (as === 'article') {
    return (
      <article ref={refCallback} className={mergedClass} {...rest}>
        {children}
      </article>
    );
  }
  if (as === 'aside') {
    return (
      <aside ref={refCallback} className={mergedClass} {...rest}>
        {children}
      </aside>
    );
  }
  if (as === 'header') {
    return (
      <header ref={refCallback} className={mergedClass} {...rest}>
        {children}
      </header>
    );
  }
  if (as === 'footer') {
    return (
      <footer ref={refCallback} className={mergedClass} {...rest}>
        {children}
      </footer>
    );
  }
  return (
    <div
      ref={refCallback as React.RefCallback<HTMLDivElement>}
      className={mergedClass}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}
