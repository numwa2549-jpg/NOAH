'use client'

import { useState } from 'react'
import type { CategoryKey } from '@/lib/noah/data'
import { CategoryMotif } from './icons'

export function ProductImage({
  id,
  name,
  cat,
  className,
  iconClassName,
}: {
  id: string
  name: string
  cat: CategoryKey
  className?: string
  iconClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <CategoryMotif cat={cat} className={iconClassName} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/products/${id}.png`}
      alt={name}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
