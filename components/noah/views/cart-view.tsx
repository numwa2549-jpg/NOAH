'use client'

import { useMemo, useState } from 'react'
import {
  ADDRESSES,
  PAY_METHODS,
  applyDiscount,
  findProduct,
  type Discount,
} from '@/lib/noah/data'
import { ProductImage } from '../product-image'

type Address = { id: string; name: string; detail: string }

export function CartView({
  cart,
  onChangeQty,
  onRemove,
  onConfirm,
}: {
  cart: Record<string, number>
  onChangeQty: (id: string, delta: number) => void
  onRemove: (id: string) => void
  onConfirm: () => void
}) {
  const [addresses, setAddresses] = useState<Address[]>(ADDRESSES)
  const [selectedAddr, setSelectedAddr] = useState('a1')
  const [selectedPay, setSelectedPay] = useState(PAY_METHODS[0])

  const [showAddrForm, setShowAddrForm] = useState(false)
  const [newAddrName, setNewAddrName] = useState('')
  const [newAddrDetail, setNewAddrDetail] = useState('')

  const [codeInput, setCodeInput] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [codeError, setCodeError] = useState<string | null>(null)

  const ids = Object.keys(cart).filter((id) => cart[id] > 0)
  const subtotal = useMemo(
    () =>
      ids.reduce((sum, id) => {
        const p = findProduct(id)
        return sum + (p ? p.price * cart[id] : 0)
      }, 0),
    [ids, cart],
  )

  // Re-validate the applied code whenever the subtotal changes.
  const effectiveDiscount = useMemo(() => {
    if (!appliedDiscount) return 0
    const res = applyDiscount(subtotal, appliedDiscount.code)
    return res.discount ? res.amount : 0
  }, [appliedDiscount, subtotal])

  const total = Math.max(0, subtotal - effectiveDiscount)

  function handleAddAddress() {
    const name = newAddrName.trim()
    const detail = newAddrDetail.trim()
    if (!name || !detail) return
    const id = `a${Date.now()}`
    setAddresses((prev) => [...prev, { id, name, detail }])
    setSelectedAddr(id)
    setNewAddrName('')
    setNewAddrDetail('')
    setShowAddrForm(false)
  }

  function handleApplyCode() {
    const res = applyDiscount(subtotal, codeInput)
    if (res.error) {
      setCodeError(res.error)
      setAppliedDiscount(null)
      setDiscountAmount(0)
      return
    }
    if (res.discount) {
      setAppliedDiscount(res.discount)
      setDiscountAmount(res.amount)
      setCodeError(null)
    }
  }

  function handleRemoveCode() {
    setAppliedDiscount(null)
    setDiscountAmount(0)
    setCodeError(null)
    setCodeInput('')
  }

  return (
    <section className="flex flex-1 flex-col pb-10">
      <h1 className="px-5 pb-1 pt-6 font-display text-2xl font-semibold text-navy">
        รายการสินค้า
      </h1>

      {ids.length === 0 ? (
        <div className="px-[30px] py-[60px] text-center font-th-serif text-[13.5px] text-ink-soft">
          ยังไม่มีสินค้าในตะกร้า
          <br />
          เลือกซื้อสินค้าที่คุณชื่นชอบได้เลย
        </div>
      ) : (
        <>
          <div>
            {ids.map((id) => {
              const p = findProduct(id)
              if (!p) return null
              const qty = cart[id]
              return (
                <div
                  key={id}
                  className="flex items-center gap-[14px] border-b border-line px-5 py-[18px]"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[2px] bg-[linear-gradient(150deg,var(--color-cream-deep),#DED0AE)]">
                    <ProductImage
                      id={p.id}
                      name={p.name}
                      cat={p.cat}
                      className="h-full w-full object-cover"
                      iconClassName="h-1/2 w-1/2 text-brass opacity-60"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-th-serif text-[13.5px] leading-[1.4] text-ink">
                      {p.name}
                    </div>
                    <div className="mt-[5px] font-display text-sm font-semibold text-rust">
                      ฿{p.price}
                    </div>
                    <div className="mt-[3px] text-[11.5px] text-ink-soft">
                      {qty} ชิ้น
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(id)}
                      className="mt-[6px] inline-block text-[11px] text-[#B4A98F] underline"
                    >
                      นำออก
                    </button>
                  </div>
                  <div className="flex items-center rounded-[20px] border border-line">
                    <button
                      type="button"
                      onClick={() => onChangeQty(id, -1)}
                      aria-label="ลดจำนวน"
                      className="h-[26px] w-[26px] text-sm text-navy"
                    >
                      −
                    </button>
                    <span className="w-[22px] text-center text-[13px]">{qty}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQty(id, 1)}
                      aria-label="เพิ่มจำนวน"
                      className="h-[26px] w-[26px] text-sm text-navy"
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Address */}
          <BlockTitle>ที่อยู่จัดส่ง</BlockTitle>
          <div className="flex flex-col gap-[10px] px-5">
            {addresses.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setSelectedAddr(a.id)}
                className={`rounded-sm border-[1.5px] p-[14px_16px] text-left ${
                  selectedAddr === a.id ? 'border-navy bg-panel' : 'border-line'
                }`}
              >
                <div className="font-th-serif text-[13.5px] font-semibold text-navy">
                  {a.name}
                </div>
                <div className="mt-[5px] text-xs leading-[1.5] text-ink-soft">
                  {a.detail}
                </div>
              </button>
            ))}

            {showAddrForm ? (
              <div className="rounded-sm border-[1.5px] border-navy bg-panel p-4">
                <label className="mb-[6px] block text-[11.5px] font-semibold text-ink-soft">
                  ชื่อที่อยู่
                </label>
                <input
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  placeholder="เช่น บ้าน, ที่ทำงาน"
                  className="w-full rounded-sm border border-line bg-cream px-3 py-[10px] font-th-serif text-[13.5px] text-ink outline-none focus:border-navy"
                />
                <label className="mb-[6px] mt-3 block text-[11.5px] font-semibold text-ink-soft">
                  รายละเอียดที่อยู่
                </label>
                <textarea
                  value={newAddrDetail}
                  onChange={(e) => setNewAddrDetail(e.target.value)}
                  placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                  rows={3}
                  className="w-full resize-none rounded-sm border border-line bg-cream px-3 py-[10px] font-th-serif text-[13.5px] leading-[1.5] text-ink outline-none focus:border-navy"
                />
                <div className="mt-3 flex gap-[10px]">
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    disabled={!newAddrName.trim() || !newAddrDetail.trim()}
                    className="flex-1 rounded-sm bg-navy px-4 py-[11px] text-[13px] font-semibold text-cream transition-colors hover:bg-navy-soft disabled:opacity-40"
                  >
                    บันทึกที่อยู่
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddrForm(false)
                      setNewAddrName('')
                      setNewAddrDetail('')
                    }}
                    className="rounded-sm border border-line px-4 py-[11px] text-[13px] text-ink-soft"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddrForm(true)}
                className="cursor-pointer rounded-sm border border-dashed border-line p-[14px] text-center text-[12.5px] text-ink-soft transition-colors hover:border-navy hover:text-navy"
              >
                + เพิ่มที่อยู่ใหม่
              </button>
            )}
          </div>

          {/* Payment */}
          <BlockTitle>ชำระเงิน</BlockTitle>
          <div className="grid grid-cols-2 gap-[10px] px-5">
            {PAY_METHODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedPay(m)}
                className={`rounded-sm border-[1.5px] p-[16px_10px] text-center text-[13px] ${
                  selectedPay === m
                    ? 'border-navy bg-panel font-semibold text-navy'
                    : 'border-line text-ink'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Discount code */}
          <BlockTitle>โค้ดส่วนลด</BlockTitle>
          <div className="px-5">
            {appliedDiscount ? (
              <div className="flex items-center justify-between rounded-sm border-[1.5px] border-navy bg-panel px-4 py-[13px]">
                <div>
                  <div className="font-display text-[13.5px] font-semibold text-navy">
                    {appliedDiscount.code}
                  </div>
                  <div className="mt-[3px] text-[11.5px] text-ink-soft">
                    {appliedDiscount.label}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCode}
                  className="text-[12px] text-rust underline"
                >
                  นำออก
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-[10px]">
                  <input
                    value={codeInput}
                    onChange={(e) => {
                      setCodeInput(e.target.value)
                      setCodeError(null)
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' &&
                        !e.nativeEvent.isComposing &&
                        e.keyCode !== 229
                      ) {
                        handleApplyCode()
                      }
                    }}
                    placeholder="กรอกโค้ดส่วนลด เช่น NOAH10"
                    className="min-w-0 flex-1 rounded-sm border border-line bg-cream px-3 py-[12px] font-th-serif text-[13.5px] uppercase tracking-[0.04em] text-ink outline-none placeholder:normal-case placeholder:tracking-normal focus:border-navy"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCode}
                    className="shrink-0 rounded-sm bg-navy px-5 py-[12px] text-[13px] font-semibold text-cream transition-colors hover:bg-navy-soft"
                  >
                    ใช้โค้ด
                  </button>
                </div>
                {codeError && (
                  <div className="mt-2 text-[12px] text-rust">{codeError}</div>
                )}
              </>
            )}
          </div>

          {/* Summary */}
          <BlockTitle>สรุปคำสั่งซื้อ</BlockTitle>
          <div className="px-5 pb-1 pt-[14px]">
            <div className="flex justify-between py-2 font-th-serif text-[13.5px] text-ink-soft">
              <span>ราคารวม</span>
              <span>฿{subtotal}</span>
            </div>
            {effectiveDiscount > 0 && (
              <div className="flex justify-between py-2 font-th-serif text-[13.5px] text-rust">
                <span>ส่วนลด ({appliedDiscount?.code})</span>
                <span>−฿{effectiveDiscount}</span>
              </div>
            )}
            <div className="flex justify-between py-2 font-th-serif text-[13.5px] text-ink-soft">
              <span>ค่าจัดส่ง</span>
              <span>ฟรี</span>
            </div>
            <div className="mt-[6px] flex justify-between border-t border-line pt-[14px] font-display text-[19px] font-semibold text-navy">
              <span>รวม</span>
              <span className="text-rust">฿{total}</span>
            </div>
          </div>

          <div className="px-5 pb-[10px] pt-[22px]">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-sm bg-navy px-4 py-[15px] font-body text-[14.5px] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-navy-soft"
            >
              ยืนยันคำสั่งซื้อ
            </button>
          </div>
        </>
      )}
    </section>
  )
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-t-[6px] border-cream-deep px-5 pb-3 pt-[26px] font-display text-[16.5px] font-semibold text-navy">
      {children}
    </h2>
  )
}
