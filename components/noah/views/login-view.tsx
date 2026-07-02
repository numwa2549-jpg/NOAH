'use client'

import { LogoIcon } from '../icons'

const inputCls =
  'w-full rounded-sm border border-line bg-cream-deep px-[14px] py-[13px] font-body text-sm text-ink outline-none placeholder:text-[#B4A98F] focus:border-brass focus:bg-panel'

export function LoginView({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="flex flex-1 flex-col px-5 pb-10 pt-2">
      <div className="my-[22px] mt-[34px] flex justify-center">
        <LogoIcon className="h-[58px] w-[58px] text-navy" />
      </div>
      <h1 className="text-center font-display text-[28px] font-semibold leading-[1.15] text-navy text-balance">
        ยินดีต้อนรับกลับมา
      </h1>
      <p className="mx-auto mt-2 max-w-[320px] text-center font-th-serif text-[13.5px] leading-relaxed text-ink-soft">
        เข้าสู่ระบบเพื่อเริ่มสั่งซื้อ
      </p>

      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault()
          onEnter()
        }}
      >
        <div>
          <label className="mb-[7px] block font-th-serif text-[12.5px] text-ink-soft">
            อีเมล หรือ ชื่อผู้ใช้
          </label>
          <input type="text" placeholder="you@example.com" className={inputCls} />
        </div>
        <div className="mt-5">
          <label className="mb-[7px] block font-th-serif text-[12.5px] text-ink-soft">
            รหัสผ่าน
          </label>
          <input type="password" placeholder="••••••••" defaultValue="password" className={inputCls} />
          <div className="mt-2 cursor-pointer text-right font-th-serif text-xs text-ink-soft underline">
            ลืมรหัสผ่าน?
          </div>
        </div>

        <button
          type="submit"
          className="mt-[26px] w-full rounded-sm bg-navy px-4 py-[15px] font-body text-[14.5px] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-navy-soft"
        >
          เข้าสู่ระบบ
        </button>
      </form>

      <div className="my-[22px] flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-line" />
        หรือ
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="flex gap-[10px]">
        <button
          type="button"
          onClick={onEnter}
          className="flex-1 rounded-sm border border-line bg-cream-deep py-3 text-center text-[13.5px] text-ink"
        >
          Facebook
        </button>
        <button
          type="button"
          onClick={onEnter}
          className="flex-1 rounded-sm border border-line bg-cream-deep py-3 text-center text-[13.5px] text-ink"
        >
          Google
        </button>
      </div>

      <p className="mt-6 text-center font-th-serif text-[13px] text-ink-soft">
        ยังไม่มีบัญชี?{' '}
        <button type="button" onClick={onEnter} className="font-semibold text-navy underline">
          สมัครสมาชิก
        </button>
      </p>
    </section>
  )
}
