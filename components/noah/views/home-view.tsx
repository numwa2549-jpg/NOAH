'use client'

import type { CategoryKey, Product } from '@/lib/noah/data'
import { PROMOS } from '@/lib/noah/data'
import { LogoIcon } from '../icons'
import { ProductImage } from '../product-image'

type HeroCopy = { eyebrow: string; title: string; lede: string }

export function HomeView({
  hero,
  products,
  category,
  cart,
  claimedPromos,
  onClaimPromo,
  onAdd,
}: {
  hero: HeroCopy
  products: Product[]
  category: CategoryKey
  cart: Record<string, number>
  claimedPromos: Set<number>
  onClaimPromo: (idx: number) => void
  onAdd: (id: string) => void
}) {
  return (
    <section className="flex flex-1 flex-col pb-10">
      {/* Hero */}
      <div className="px-5 pb-[6px] pt-9 text-center">
        <LogoIcon className="mx-auto mb-[14px] h-11 w-11 text-navy" />
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-brass">
          {hero.eyebrow}
        </p>
        <h1 className="mt-[6px] whitespace-pre-line text-center font-display text-[25px] font-semibold leading-[1.15] text-navy text-balance">
          {hero.title}
        </h1>
        <p className="mx-auto mt-2 max-w-[320px] text-center font-th-serif text-[13.5px] leading-relaxed text-ink-soft">
          {hero.lede}
        </p>
      </div>

      {/* Promo strip */}
      <div className="flex gap-[10px] overflow-x-auto px-5 pb-1 pt-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROMOS.map((promo, idx) => {
          const claimed = claimedPromos.has(idx)
          return (
            <div
              key={idx}
              className="w-[158px] shrink-0 rounded-sm border border-line border-l-[3px] border-l-rust bg-panel px-3 pb-[10px] pt-[11px]"
            >
              <div className="font-display text-base font-semibold text-rust">
                {promo.pct}
              </div>
              <p className="mt-1 min-h-[44px] font-th-serif text-[10.5px] leading-[1.45] text-ink-soft">
                {promo.desc}
              </p>
              <button
                type="button"
                disabled={claimed}
                onClick={() => onClaimPromo(idx)}
                className={`mt-[9px] inline-block rounded-[2px] border border-navy px-[10px] py-[5px] text-[10px] transition-colors ${
                  claimed
                    ? 'cursor-default bg-navy text-cream'
                    : 'cursor-pointer text-navy'
                }`}
              >
                {claimed ? 'รับสิทธิ์แล้ว ✓' : 'รับสิทธิ์'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Section head */}
      <div className="flex items-baseline justify-between px-5 pb-[14px] pt-[30px]">
        <h2 className="font-display text-[21px] font-semibold text-navy">
          สินค้าแนะนำ
        </h2>
        <span className="cursor-pointer text-xs text-ink-soft underline">
          ดูทั้งหมด
        </span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 px-5 pb-[10px]">
        {products.map((p) => {
          const qty = cart[p.id] || 0
          return (
            <article
              key={p.id}
              className="flex flex-col overflow-hidden rounded-sm border border-line bg-panel"
            >
              <div className="relative flex aspect-square items-center justify-center bg-[linear-gradient(150deg,var(--color-cream-deep),#DED0AE)]">
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded-[2px] bg-navy px-[7px] py-[3px] text-[10px] font-semibold text-cream">
                    {p.tag}
                  </span>
                )}
                {p.badge && (
                  <span className="absolute right-2 top-2 rounded-[2px] bg-brass px-[7px] py-[3px] text-[10px] font-semibold text-navy">
                    {p.badge}
                  </span>
                )}
                <ProductImage
                  id={p.id}
                  name={p.name}
                  cat={category}
                  className="absolute inset-0 h-full w-full object-cover"
                  iconClassName="h-[44%] w-[44%] text-brass opacity-55"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-3 pb-[14px] pt-3">
                <p className="min-h-[36px] font-th-serif text-[13px] leading-[1.4] text-ink">
                  {p.name}
                </p>
                <div className="flex items-baseline gap-[7px]">
                  <span className="font-display text-base font-semibold text-rust">
                    ฿{p.price}
                  </span>
                  {p.was && (
                    <span className="text-[11.5px] text-[#AFA48D] line-through">
                      ฿{p.was}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onAdd(p.id)}
                  className={`mt-auto rounded-[2px] border border-navy py-[9px] font-body text-xs transition-colors ${
                    qty > 0 ? 'bg-navy text-cream' : 'bg-transparent text-navy'
                  }`}
                >
                  {qty > 0 ? `อยู่ในตะกร้า (${qty})` : 'เพิ่มลงตะกร้า'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
