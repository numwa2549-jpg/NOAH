'use client'

import { CartIcon, LogoIcon } from './icons'

export function TopNav({
  brandSub,
  cartCount,
  onLogo,
  onCart,
  onAccount,
}: {
  brandSub: string
  cartCount: number
  onLogo: () => void
  onCart: () => void
  onAccount: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line bg-cream px-[18px] py-[14px]">
      <button
        type="button"
        onClick={onLogo}
        className="flex select-none items-center gap-2"
        aria-label="NOAH หน้าแรก"
      >
        <LogoIcon className="h-[22px] w-[22px] shrink-0 text-navy" />
        <span className="leading-none">
          <span className="block font-display text-[17px] font-semibold tracking-[0.14em] text-navy">
            NOAH
          </span>
          <span className="block font-body text-[8.5px] uppercase tracking-[0.18em] text-ink-soft">
            {brandSub}
          </span>
        </span>
      </button>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onCart}
          aria-label="ตะกร้าสินค้า"
          className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-line bg-panel"
        >
          <CartIcon className="h-4 w-4 text-navy" />
          {cartCount > 0 && (
            <span className="absolute -right-[5px] -top-[5px] flex h-4 min-w-4 items-center justify-center rounded-full bg-rust px-[3px] font-body text-[10px] text-cream">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onAccount}
          className="flex shrink-0 items-center gap-[6px] rounded-[20px] border border-line bg-panel py-1 pl-1 pr-[10px]"
        >
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-navy text-[11px] font-semibold text-cream">
            G
          </span>
          <span className="whitespace-nowrap text-[11.5px] text-navy">
            Google User
          </span>
        </button>
      </div>
    </header>
  )
}
