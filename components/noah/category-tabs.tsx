'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CATEGORY_TABS, type CategoryKey } from '@/lib/noah/data'

export function CategoryTabs({
  category,
  onSelect,
}: {
  category: CategoryKey
  onSelect: (cat: CategoryKey) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const move = () => {
    const active = btnRefs.current[category]
    const scrollEl = scrollRef.current
    if (!active || !scrollEl) return
    setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    const scrollLeft =
      active.offsetLeft - (scrollEl.clientWidth - active.offsetWidth) / 2
    scrollEl.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' })
  }

  useLayoutEffect(move, [category])

  useEffect(() => {
    window.addEventListener('resize', move)
    return () => window.removeEventListener('resize', move)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div className="sticky top-[61px] z-[29] border-b border-line bg-cream">
      <div
        ref={scrollRef}
        className="relative flex overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORY_TABS.map((tab) => {
          const active = tab.key === category
          return (
            <button
              key={tab.key}
              type="button"
              ref={(el) => {
                btnRefs.current[tab.key] = el
              }}
              onClick={() => onSelect(tab.key)}
              className={`shrink-0 whitespace-nowrap px-[14px] pb-[11px] pt-[13px] font-th-serif text-[13.5px] transition-colors ${
                active ? 'font-bold text-navy' : 'text-ink-soft'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-[2.5px] rounded-t-sm bg-rust transition-[transform,width] duration-300 ease-[cubic-bezier(.65,0,.35,1)]"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
        />
      </div>
    </div>
  )
}
