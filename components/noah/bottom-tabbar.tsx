'use client'

import type { ViewName } from './noah-app'
import { CartIcon, HomeIcon, TrackIcon, UserIcon } from './icons'

export function BottomTabbar({
  active,
  onHome,
  onCart,
  onTracking,
  onAccount,
}: {
  active: ViewName
  onHome: () => void
  onCart: () => void
  onTracking: () => void
  onAccount: () => void
}) {
  const items = [
    { key: 'home', label: 'หน้าแรก', icon: HomeIcon, onClick: onHome },
    { key: 'cart', label: 'ตะกร้า', icon: CartIcon, onClick: onCart },
    { key: 'tracking', label: 'ติดตามคำสั่งซื้อ', icon: TrackIcon, onClick: onTracking },
    { key: 'login', label: 'บัญชี', icon: UserIcon, onClick: onAccount },
  ] as const

  return (
    <nav className="sticky bottom-0 z-20 flex border-t border-line bg-panel">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.key
        return (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            className={`flex flex-1 flex-col items-center gap-[3px] px-1 pb-[9px] pt-[11px] font-body text-[10.5px] ${
              isActive ? 'font-semibold text-navy' : 'text-ink-soft'
            }`}
          >
            <Icon className="h-[19px] w-[19px]" />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
