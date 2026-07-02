export type CategoryKey = 'sweets' | 'wine' | 'agri'

export type Product = {
  id: string
  name: string
  price: number
  was: number | null
  tag: string | null
  gold: boolean
  badge?: string | null
}

export const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: 'sweets', label: 'ขนมไทย' },
  { key: 'wine', label: 'ไวน์ผลไม้ไทย' },
  { key: 'agri', label: 'สินค้าเกษตร' },
]

export const CATALOG: Record<CategoryKey, Product[]> = {
  sweets: [
    { id: 'sw1', name: 'ข้าวเหนียวมะม่วงอกร่องทอง', price: 255, was: null, tag: 'ขายดี', gold: false },
    { id: 'sw2', name: 'ลูกชุบผลไม้รวม 12 ชิ้น', price: 189, was: 220, tag: 'ลด 15%', gold: false },
    { id: 'sw3', name: 'ทองหยิบทองหยอดฝอยทอง เซตของฝาก', price: 340, was: 400, tag: 'ลด 15%', gold: false },
    { id: 'sw4', name: 'ขนมชั้นใบเตยแท้ ถาดเล็ก', price: 145, was: null, tag: 'ใหม่', gold: true },
    { id: 'sw5', name: 'สังขยาฟักทองอบ', price: 165, was: null, tag: null, gold: false },
    { id: 'sw6', name: 'บัวลอยไข่หวานกะทิสด', price: 120, was: 140, tag: 'ลด 15%', gold: false },
  ],
  wine: [
    { id: 'w1', name: 'ไวน์มะม่วงหิมพานต์ Cashew Fruit Wine', price: 553, was: 650, tag: 'ลด 15%', gold: false, badge: 'ขายดี' },
    { id: 'w2', name: 'ไวน์ลำไย Longan Wine Reserve', price: 502, was: 590, tag: 'ลด 15%', gold: false, badge: null },
    { id: 'w3', name: 'ไวน์มังคุด Mangosteen Estate Wine', price: 459, was: 540, tag: 'ลด 15%', gold: false, badge: 'ใหม่' },
    { id: 'w4', name: 'ไวน์สับปะรดภูแล Pineapple Blossom', price: 399, was: 470, tag: 'ลด 15%', gold: false, badge: null },
    { id: 'w5', name: 'ไวน์กระเจี๊ยบ Roselle Rosé', price: 480, was: 565, tag: 'ลด 15%', gold: false, badge: null },
    { id: 'w6', name: 'ไวน์ลิ้นจี่ Lychee Blanc', price: 429, was: 505, tag: 'ลด 15%', gold: false, badge: null },
  ],
  agri: [
    { id: 'ag1', name: 'ข้าวหอมมะลิ 100% ตราชาวนาไทย 5 กก.', price: 249, was: 290, tag: 'ลด 15%', gold: false, badge: 'ขายดี' },
    { id: 'ag2', name: 'มะม่วงน้ำดอกไม้สีทอง เกรดส่งออก 1 กก.', price: 179, was: null, tag: null, gold: false, badge: 'ใหม่' },
    { id: 'ag3', name: 'น้ำผึ้งป่าดอยแท้ 100% ขวด 500 มล.', price: 320, was: 380, tag: 'ลด 15%', gold: false, badge: null },
    { id: 'ag4', name: 'กล้วยหอมทองอินทรีย์ หวีละ', price: 65, was: null, tag: null, gold: false, badge: null },
    { id: 'ag5', name: 'พริกแกงเผ็ดโฮมเมด สูตรแม่บ้านเกษตรกร', price: 95, was: 110, tag: 'ลด 15%', gold: false, badge: null },
    { id: 'ag6', name: 'ผักสลัดไฮโดรโปนิกส์รวม เซตครอบครัว', price: 139, was: null, tag: null, gold: false, badge: 'ใหม่' },
  ],
}

export const HERO_COPY: Record<
  CategoryKey,
  { sub: string; eyebrow: string; title: string; lede: string }
> = {
  sweets: {
    sub: 'Thai of Sweet',
    eyebrow: 'Thai of Sweet',
    title: 'ขนมไทยแท้\nรสชาติต้นตำรับ',
    lede: 'คัดสรรสดใหม่ทุกวัน ส่งตรงถึงบ้านภายใน 24 ชั่วโมง',
  },
  wine: {
    sub: 'Thai Fruit Wines',
    eyebrow: 'Thai Fruit Wines',
    title: 'รสชาติผลไม้ไทย\nในทุกแก้ว',
    lede: 'หมักบ่มจากผลไม้ไทยแท้ คัดสรรและจัดส่งอย่างพิถีพิถัน',
  },
  agri: {
    sub: 'Farm Fresh',
    eyebrow: 'Farm Fresh',
    title: 'ผลผลิตจากไร่\nตรงถึงมือคุณ',
    lede: 'รับซื้อตรงจากเกษตรกรไทย สดใหม่ ปลอดภัย ส่งตรงถึงบ้าน',
  },
}

export const CATPICK_CARDS: {
  key: CategoryKey
  cls: string
  eyebrow: string
  title: string
  image: string
}[] = [
  { key: 'sweets', cls: 'sweets', eyebrow: 'Thai of Sweet', title: 'ขนมไทย', image: '/products/sw1.png' },
  { key: 'wine', cls: 'wine', eyebrow: 'Thai Fruit Wines', title: 'ไวน์ผลไม้ไทย', image: '/products/w1.png' },
  { key: 'agri', cls: 'agri', eyebrow: 'Farm Fresh', title: 'สินค้าเกษตร', image: '/products/ag1.png' },
]

export const PROMOS = [
  { pct: 'ลด 15%', desc: 'สำหรับเซตของหวานผลไม้รวม และหมวดสินค้าทุกรายการ' },
  { pct: 'ซื้อ 1 แถม 1', desc: 'ลูกชุบผลไม้รวมและสินค้าในรายการที่ร่วมโปรโมชั่น' },
  { pct: 'ส่งฟรี', desc: 'เมื่อสั่งครบ 500 บาท ทั่วกรุงเทพฯ และปริมณฑล' },
]

export const ADDRESSES = [
  { id: 'a1', name: 'ที่อยู่ 1 — บ้าน', detail: 'ลาดพร้าว 93, วังทองหลาง กทม. 10310' },
  { id: 'a2', name: 'ที่อยู่ 2 — ที่ทำงาน', detail: 'ลาดพร้าว 63, วังทองหลาง กทม. 10310' },
]

export const PAY_METHODS = ['เก็บเงินปลายทาง', 'VISA', 'Mastercard', 'PayPal']

export type Discount = {
  code: string
  label: string
  kind: 'percent' | 'fixed'
  value: number
  minSpend: number
}

export const DISCOUNT_CODES: Discount[] = [
  { code: 'NOAH10', label: 'ลด 10% ทั้งบิล', kind: 'percent', value: 10, minSpend: 0 },
  { code: 'SWEET50', label: 'ลด 50 บาท', kind: 'fixed', value: 50, minSpend: 200 },
  { code: 'WINE20', label: 'ลด 20% ทั้งบิล', kind: 'percent', value: 20, minSpend: 500 },
]

export function applyDiscount(
  subtotal: number,
  code: string,
): { discount: Discount | null; amount: number; error: string | null } {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return { discount: null, amount: 0, error: null }
  const found = DISCOUNT_CODES.find((d) => d.code === normalized)
  if (!found) return { discount: null, amount: 0, error: 'ไม่พบโค้ดส่วนลดนี้' }
  if (subtotal < found.minSpend)
    return {
      discount: null,
      amount: 0,
      error: `ใช้ได้เมื่อยอดขั้นต่ำ ฿${found.minSpend}`,
    }
  const raw =
    found.kind === 'percent'
      ? Math.round((subtotal * found.value) / 100)
      : found.value
  return { discount: found, amount: Math.min(raw, subtotal), error: null }
}

export type OrderStatus = 'prep' | 'ship' | 'done'

export const SAMPLE_ORDERS: {
  no: string
  tid: string
  name: string
  qty: number
  price: number | ''
  date: string
  status: OrderStatus
}[] = [
  { no: '8252622', tid: '2250020', name: 'ข้าวเหนียวมะม่วงอกร่องทอง', qty: 1, price: 255, date: '15 ก.พ. 2568', status: 'done' },
  { no: '8252623', tid: '2256020', name: 'ข้าวเหนียวมะม่วงอกร่องทอง', qty: 1, price: 255, date: '13 ก.พ. 2568', status: 'ship' },
]

export const STATUS_LABEL: Record<OrderStatus, string> = {
  prep: 'กำลังเตรียมสินค้า',
  ship: 'กำลังจัดส่ง',
  done: 'จัดส่งสำเร็จ',
}

export const STEP_INDEX: Record<OrderStatus, number> = { prep: 1, ship: 2, done: 3 }

export function findProduct(id: string): (Product & { cat: CategoryKey }) | null {
  for (const cat of Object.keys(CATALOG) as CategoryKey[]) {
    const found = CATALOG[cat].find((p) => p.id === id)
    if (found) return { ...found, cat }
  }
  return null
}
