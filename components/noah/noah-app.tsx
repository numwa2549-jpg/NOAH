'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  CATALOG,
  HERO_COPY,
  type CategoryKey,
} from '@/lib/noah/data'
import { TopNav } from './top-nav'
import { CategoryTabs } from './category-tabs'
import { BottomTabbar } from './bottom-tabbar'
import { LoginView } from './views/login-view'
import { CatpickView } from './views/catpick-view'
import { HomeView } from './views/home-view'
import { CartView } from './views/cart-view'
import { ConfirmView } from './views/confirm-view'
import { TrackingView } from './views/tracking-view'

export type ViewName =
  | 'login'
  | 'catpick'
  | 'home'
  | 'cart'
  | 'confirm'
  | 'tracking'

export function NoahApp() {
  const [view, setView] = useState<ViewName>('home')
  const [category, setCategory] = useState<CategoryKey>('sweets')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [lastOrderNo, setLastOrderNo] = useState<string | null>(null)
  const [claimedPromos, setClaimedPromos] = useState<Set<number>>(new Set())

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart],
  )

  const showView = useCallback((name: ViewName) => {
    setView(name)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [])

  const addToCart = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  }, [])

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((c) => {
      const next = { ...c }
      const q = Math.max(0, (next[id] || 0) + delta)
      if (q === 0) delete next[id]
      else next[id] = q
      return next
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c }
      delete next[id]
      return next
    })
  }, [])

  const confirmOrder = useCallback(() => {
    const no = String(Math.floor(8000000 + Math.random() * 900000))
    setLastOrderNo(no)
    setCart({})
    showView('confirm')
  }, [showView])

  const claimPromo = useCallback((idx: number) => {
    setClaimedPromos((s) => new Set(s).add(idx))
  }, [])

  const hero = HERO_COPY[category]

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[480px] flex-col bg-cream shadow-[0_0_60px_rgba(35,42,59,0.08)]">
      {/* Announcement bar */}
      <div className="bg-navy px-3 py-[9px] text-center font-th-serif text-xs tracking-[0.04em] text-brass-light">
        จัดส่งฟรีเมื่อสั่งครบ 500 บาท
        <span className="mx-2 opacity-50">·</span>
        ลดราคา 10–20% ทุกรายการ
      </div>

      <TopNav
        brandSub={hero.sub}
        cartCount={cartCount}
        onLogo={() => showView('home')}
        onCart={() => showView('cart')}
        onAccount={() => showView('login')}
      />

      {view !== 'login' && (
        <CategoryTabs
          category={category}
          onSelect={(cat) => {
            setCategory(cat)
          }}
        />
      )}

      {view === 'login' && <LoginView onEnter={() => showView('catpick')} />}

      {view === 'catpick' && (
        <CatpickView
          onPick={(cat) => {
            setCategory(cat)
            showView('home')
          }}
        />
      )}

      {view === 'home' && (
        <HomeView
          hero={hero}
          products={CATALOG[category]}
          category={category}
          cart={cart}
          claimedPromos={claimedPromos}
          onClaimPromo={claimPromo}
          onAdd={addToCart}
        />
      )}

      {view === 'cart' && (
        <CartView
          cart={cart}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onConfirm={confirmOrder}
        />
      )}

      {view === 'confirm' && (
        <ConfirmView
          orderNo={lastOrderNo}
          onTrack={() => showView('tracking')}
          onContinue={() => showView('home')}
        />
      )}

      {view === 'tracking' && <TrackingView lastOrderNo={lastOrderNo} />}

      <BottomTabbar
        active={view}
        onHome={() => showView('home')}
        onCart={() => showView('cart')}
        onTracking={() => showView('tracking')}
        onAccount={() => showView('login')}
      />
    </main>
  )
}
