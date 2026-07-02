import type { CategoryKey } from '@/lib/noah/data'

type IconProps = { className?: string }

export function LogoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6L34 26H14L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M6 30C10 27 14 33 18 30C22 27 26 33 30 30C34 27 38 33 42 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M4 11l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" />
    </svg>
  )
}

export function TrackIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  )
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
    </svg>
  )
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 24l6 6 12-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CategoryMotif({ cat, className }: { cat: CategoryKey; className?: string }) {
  if (cat === 'wine') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M16 6h16l-2 16a6 6 0 0 1-12 0L16 6Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 28v14M17 42h14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  if (cat === 'agri') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <path d="M24 42V18M24 18c0-8-8-10-14-8 2 8 8 10 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 26c0-6 8-8 14-6-2 7-8 9-14 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 12v24M12 24h24" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
