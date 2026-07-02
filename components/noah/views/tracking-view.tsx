'use client'

import { useMemo } from 'react'
import {
  SAMPLE_ORDERS,
  STATUS_LABEL,
  STEP_INDEX,
  type OrderStatus,
} from '@/lib/noah/data'

const PILL_CLS: Record<OrderStatus, string> = {
  prep: 'bg-cream-deep text-ink-soft',
  ship: 'bg-status-ship-bg text-status-ship-fg',
  done: 'bg-status-done-bg text-status-done-fg',
}

const STEP_LABELS = ['เตรียมสินค้า', 'กำลังจัดส่ง', 'จัดส่งสำเร็จ']

export function TrackingView({ lastOrderNo }: { lastOrderNo: string | null }) {
  const orders = useMemo(() => {
    const base = [...SAMPLE_ORDERS]
    if (lastOrderNo) {
      return [
        {
          no: lastOrderNo,
          tid: String(2200000 + Math.floor(Math.random() * 90000)),
          name: 'คำสั่งซื้อล่าสุดของคุณ',
          qty: 1,
          price: '' as const,
          date: '01 ก.ค. 2569',
          status: 'prep' as OrderStatus,
        },
        ...base,
      ]
    }
    return base
  }, [lastOrderNo])

  return (
    <section className="flex flex-1 flex-col pb-10">
      <div className="px-5 pt-5">
        <div className="text-[11.5px] text-ink-soft">
          หน้าหลัก / ติดตามคำสั่งซื้อ
        </div>
        <h1 className="mt-2 font-display text-[26px] font-semibold text-navy">
          ติดตามคำสั่งซื้อ
        </h1>
      </div>

      <div className="flex gap-2 px-5 pb-2 pt-4">
        <input
          type="text"
          placeholder="ค้นหาด้วยหมายเลขคำสั่งซื้อหรือชื่อสินค้า"
          className="flex-1 rounded-sm border border-line bg-cream-deep px-[14px] py-[13px] font-body text-sm text-ink outline-none placeholder:text-[#B4A98F] focus:border-brass focus:bg-panel"
        />
        <button
          type="button"
          className="rounded-[2px] bg-navy px-[18px] font-body text-[13px] text-cream"
        >
          ค้นหา
        </button>
      </div>

      <div className="px-5 pb-[6px] pt-[14px]">
        <FilterRow
          title="สถานะ"
          name="st"
          options={['ทั้งหมด', 'กำลังจัดส่ง', 'จัดส่งแล้ว']}
        />
        <FilterRow
          title="ช่วงเวลา"
          name="tm"
          options={['ทั้งหมด', 'วันนี้', 'เดือนนี้']}
        />
      </div>

      <div>
        {orders.map((o) => {
          const idx = STEP_INDEX[o.status]
          return (
            <div
              key={o.no}
              className="mx-5 mb-[18px] rounded-[2px] border border-line bg-panel px-4 pb-[18px] pt-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="text-xs text-ink-soft">
                  คำสั่งซื้อ: <b className="text-ink">{o.no}</b> · เลขพัสดุ: {o.tid}
                </div>
                <div
                  className={`whitespace-nowrap rounded-[20px] px-[9px] py-1 text-[10.5px] font-semibold ${PILL_CLS[o.status]}`}
                >
                  {STATUS_LABEL[o.status]}
                </div>
              </div>
              <div className="mt-3 font-th-serif text-[15px] font-semibold text-navy">
                {o.name}
              </div>
              <div className="mt-[5px] text-xs text-ink-soft">
                {o.qty} ชิ้น{o.price !== '' ? ` · ฿${o.price}` : ''} · สั่งเมื่อ {o.date}
              </div>

              <div className="mt-5 flex items-start">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1
                  const done = n < idx
                  const current = n === idx
                  return (
                    <div
                      key={label}
                      className="relative flex flex-1 flex-col items-center"
                    >
                      {i > 0 && (
                        <span
                          className={`absolute left-[-50%] top-[13px] z-[1] h-[2px] w-full ${
                            n <= idx ? 'bg-navy' : 'bg-line'
                          }`}
                        />
                      )}
                      <div
                        className={`z-[2] flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[11px] font-semibold ${
                          done
                            ? 'border-navy bg-navy text-cream'
                            : current
                              ? 'border-navy bg-panel text-navy'
                              : 'border-line bg-panel text-ink-soft'
                        }`}
                      >
                        {done ? '✓' : n}
                      </div>
                      <div className="mt-[7px] text-center text-[10px] text-ink-soft">
                        {label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FilterRow({
  title,
  name,
  options,
}: {
  title: string
  name: string
  options: string[]
}) {
  return (
    <>
      <div className="mb-[10px] font-th-serif text-xs text-ink-soft">{title}</div>
      <div className="mb-4 flex flex-wrap gap-4">
        {options.map((opt, i) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-[7px] text-[13px] text-ink"
          >
            <input
              type="radio"
              name={name}
              defaultChecked={i === 0}
              className="h-[15px] w-[15px] accent-navy"
            />
            {opt}
          </label>
        ))}
      </div>
    </>
  )
}
