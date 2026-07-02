'use client'

import { CATPICK_CARDS, type CategoryKey } from '@/lib/noah/data'
import { CategoryMotif, LogoIcon } from '../icons'

const OVERLAY: Record<CategoryKey, string> = {
  sweets: 'linear-gradient(160deg,rgba(234,223,197,.45),rgba(199,164,107,.82) 120%)',
  wine: 'linear-gradient(160deg,rgba(58,66,86,.55),rgba(35,42,59,.85) 120%)',
  agri: 'linear-gradient(160deg,rgba(217,224,198,.4),rgba(124,148,100,.82) 120%)',
}

const TEXT_COLOR: Record<CategoryKey, string> = {
  sweets: 'text-navy',
  wine: 'text-cream',
  agri: 'text-[#233420]',
}

const MOTIF_COLOR: Record<CategoryKey, string> = {
  sweets: 'text-panel',
  wine: 'text-brass-light',
  agri: 'text-[#233420]',
}

export function CatpickView({
  onPick,
}: {
  onPick: (cat: CategoryKey) => void
}) {
  return (
    <section className="flex flex-1 flex-col px-5 pb-10 pt-[6px]">
      <div className="mb-1 mt-[30px] flex justify-center">
        <LogoIcon className="h-[46px] w-[46px] text-navy" />
      </div>
      <p className="text-center font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-brass">
        Choose your world
      </p>
      <h1 className="mt-2 text-center font-display text-[27px] font-semibold leading-[1.15] text-navy text-balance">
        เลือกประเภทสินค้า
      </h1>
      <p className="mx-auto mt-2 max-w-[320px] text-center font-th-serif text-[13.5px] leading-relaxed text-ink-soft">
        แต่ละโหมดมีคอลเลกชันและประสบการณ์เฉพาะของตัวเอง
      </p>

      <div className="mt-[30px] flex flex-col gap-4">
        {CATPICK_CARDS.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => onPick(card.key)}
            className="relative flex h-[190px] items-end overflow-hidden rounded-md border border-line p-5 text-left"
            style={{
              backgroundImage: `${OVERLAY[card.key]},url('${card.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <CategoryMotif
              cat={card.key}
              className={`absolute right-[14px] top-[14px] h-[60px] w-[60px] opacity-35 ${MOTIF_COLOR[card.key]}`}
            />
            <span className={`relative z-[2] ${TEXT_COLOR[card.key]}`}>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] opacity-90 [text-shadow:0_1px_6px_rgba(255,255,255,.35)]">
                {card.eyebrow}
              </span>
              <span className="mt-[3px] block font-display text-2xl font-semibold [text-shadow:0_1px_6px_rgba(255,255,255,.35)]">
                {card.title}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
