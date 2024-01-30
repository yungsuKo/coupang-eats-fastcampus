import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export function useInfiniteScroll<TData, TScroll>(
  hasNextPage: boolean | undefined,
  isFetching: boolean,
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<TData[]>, TError>>
) {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, options);

    if (loader.current) observer.observe(loader.current);
  }, [fetchNextPage, hasNextPage, isFetching]);

  return loader;
}
