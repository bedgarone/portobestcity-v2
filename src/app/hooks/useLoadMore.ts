'use client'

import { useState, useMemo } from 'react'

export function useLoadMore<T>(items: T[], itemsPerLoad = 9) {
  const [visibleCount, setVisibleCount] = useState(itemsPerLoad)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + itemsPerLoad)
  }

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount)
  }, [items, visibleCount])

  const hasMore = visibleCount < items.length

  return { visibleItems, hasMore, loadMore }
}
