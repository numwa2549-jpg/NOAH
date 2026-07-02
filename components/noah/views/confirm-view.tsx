'use client'

import { CheckCircleIcon } from '../icons'

export function ConfirmView({
  orderNo,
  onTrack,
  onContinue,
}: {
  orderNo: string | null
  onTrack: () => void
  onContinue: () => void
}) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-[30px] py-[50px] text-center">
      <CheckCircleIcon className="mb-5 h-[60px] w-[60px] text-brass" />
      <h1 className="font-display text-[22px] font-semibold leading-[1.15] text-navy">
        สั่งซื้อสำเร็จแล้ว
      </h1>
      <p className="mx-auto mt-2 max-w-[320px] font-th-serif text-[13.5px] leading-relaxed text-ink-soft">
        ขอบคุณที่อุดหนุน NOAH เราจะจัดเตรียมสินค้าให้คุณโดยเร็วที่สุด
      </p>
      <div className="mt-[18px] rounded-[2px] border border-line bg-cream-deep px-5 py-3 text-[13px] font-semibold text-navy">
        คำสั่งซื้อ #{orderNo ?? '—'}
      </div>
      <div className="mt-[26px] flex w-full flex-col gap-[10px]">
        <button
          type="button"
          onClick={onTrack}
          className="w-full rounded-sm bg-navy px-4 py-[15px] font-body text-[14.5px] font-semibold text-cream transition-colors hover:bg-navy-soft"
        >
          ติดตามคำสั่งซื้อ
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-sm border border-navy bg-transparent px-4 py-[15px] font-body text-[14.5px] font-semibold text-navy"
        >
          เลือกซื้อสินค้าต่อ
        </button>
      </div>
    </section>
  )
}
