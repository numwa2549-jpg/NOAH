'use client'

import { useMemo, useState } from 'react'

type NavKey = 'acc' | 'doc' | 'inv'
type AccountTab = 'led' | 'tax' | 'lrn'
type EntryType = 'in' | 'out'

type Entry = {
  id: number
  d: string
  t: EntryType
  c: string
  a: number
  n: string
}

type Stock = {
  n: string
  pe: number
  pb: number
  roe: number
  de: number
  dy: number
  g: number
  rsi: number
  tr: 'a' | 'm' | 'b'
  mc: 'u' | 'n' | 'd'
  rk: string[]
}

const CATS = {
  in: ['เงินเดือน', 'โบนัส', 'งานเสริม', 'ดอกเบี้ย/ปันผล', 'อื่น ๆ'],
  out: ['อาหาร', 'เดินทาง', 'ที่อยู่อาศัย', 'สาธารณูปโภค', 'ช้อปปิ้ง', 'สุขภาพ', 'การศึกษา', 'ลงทุน/ออม', 'อื่น ๆ'],
} as const

const INITIAL_ENTRIES: Entry[] = [
  { id: 1, d: '2026-09-01', t: 'in', c: 'เงินเดือน', a: 45000, n: 'เงินเดือนเดือนกันยายน' },
  { id: 2, d: '2026-09-03', t: 'out', c: 'อาหาร', a: 1200, n: 'อาหารกลางวัน' },
  { id: 3, d: '2026-09-05', t: 'out', c: 'ที่อยู่อาศัย', a: 7800, n: 'ค่าเช่าบ้าน' },
  { id: 4, d: '2026-09-10', t: 'in', c: 'งานเสริม', a: 6500, n: 'งาน freelance' },
  { id: 5, d: '2026-09-14', t: 'out', c: 'สุขภาพ', a: 1800, n: 'ซื้อยารักษา' },
  { id: 6, d: '2026-09-20', t: 'out', c: 'ช้อปปิ้ง', a: 2300, n: 'อุปกรณ์สำนักงาน' },
  { id: 7, d: '2026-08-15', t: 'in', c: 'โบนัส', a: 20000, n: 'โบนัสประจำปี' },
  { id: 8, d: '2026-08-12', t: 'out', c: 'การศึกษา', a: 4500, n: 'คอร์สออนไลน์' },
]

const INITIAL_STOCKS: Stock[] = [
  { n: 'ตัวอย่าง A (ธนาคาร)', pe: 8, pb: 0.8, roe: 10, de: 1.5, dy: 5.5, g: 4, rsi: 55, tr: 'a', mc: 'n', rk: ['reg', 'cyc'] },
  { n: 'ตัวอย่าง B (เทคโนโลยี)', pe: 28, pb: 6, roe: 22, de: 0.3, dy: 1.2, g: 18, rsi: 68, tr: 'a', mc: 'u', rk: ['conc', 'fx'] },
  { n: 'ตัวอย่าง C (พลังงาน)', pe: 6, pb: 0.7, roe: 7, de: 1.8, dy: 7, g: -3, rsi: 34, tr: 'b', mc: 'd', rk: ['cyc', 'debt', 'reg'] },
]

const formatMoney = (n: number) => Math.round(n).toLocaleString('th-TH')

const safeString = (value: string | null | undefined) => value ?? ''

export default function Page() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [activeNav, setActiveNav] = useState<NavKey>('acc')
  const [activeAccTab, setActiveAccTab] = useState<AccountTab>('led')
  const [ledgerType, setLedgerType] = useState<EntryType>('in')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState(CATS.in[0])
  const [entries, setEntries] = useState<Entry[]>(INITIAL_ENTRIES)
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS)

  const ledgerCategories = CATS[ledgerType]

  const stats = useMemo(() => {
    const ym = new Date().toISOString().slice(0, 7)
    const monthIncome = entries
      .filter((x) => x.t === 'in' && x.d.startsWith(ym))
      .reduce((sum, x) => sum + x.a, 0)
    const monthExpense = entries
      .filter((x) => x.t === 'out' && x.d.startsWith(ym))
      .reduce((sum, x) => sum + x.a, 0)
    const net = monthIncome - monthExpense
    return { monthIncome, monthExpense, net }
  }, [entries])

  const chartData = useMemo(() => {
    const monthSet: string[] = []
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date()
      d.setDate(1)
      d.setMonth(d.getMonth() - i)
      monthSet.push(d.toISOString().slice(0, 7))
    }

    const vals = monthSet.map((m) => {
      const income = entries
        .filter((x) => x.t === 'in' && x.d.startsWith(m))
        .reduce((sum, x) => sum + x.a, 0)
      const expense = entries
        .filter((x) => x.t === 'out' && x.d.startsWith(m))
        .reduce((sum, x) => sum + x.a, 0)
      return [income, expense] as [number, number]
    })
    const max = Math.max(1, ...vals.flat())
    return { monthSet, vals, max }
  }, [entries])

  const recentEntries = useMemo(
    () => [...entries].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 30),
    [entries],
  )

  const addEntry = () => {
    const parsed = Number(amount)
    if (!parsed || parsed <= 0) {
      alert('กรุณาใส่จำนวนเงินที่มากกว่า 0')
      return
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        d: date,
        t: ledgerType,
        c: category,
        a: parsed,
        n: note,
      },
    ])

    setAmount('')
    setNote('')
  }

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((x) => x.id !== id))
  }

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="moneywise-app" data-theme={theme}>
      <aside>
        <h1>Moneywise</h1>
        <button
          type="button"
          className={`nav ${activeNav === 'acc' ? 'on' : ''}`}
          onClick={() => setActiveNav('acc')}
        >
          บัญชีและภาษี
          <small>ขั้นที่ 1 · พร้อมใช้</small>
        </button>
        <button
          type="button"
          className={`nav ${activeNav === 'doc' ? 'on' : ''}`}
          onClick={() => setActiveNav('doc')}
        >
          สรุปไฟล์ / PDF
          <small>ขั้นที่ 2 · พร้อมใช้</small>
        </button>
        <button
          type="button"
          className={`nav ${activeNav === 'inv' ? 'on' : ''}`}
          onClick={() => setActiveNav('inv')}
        >
          ที่ปรึกษาการลงทุน
          <small>ขั้นที่ 3 · พร้อมใช้</small>
        </button>
        <div className="sp" />
        <button type="button" className="tg" onClick={() => alert('ตั้งค่า AI: ใส่ URL ของ AI proxy แล้วเชื่อมต่อ')}>ตั้งค่า AI</button>
        <button type="button" className="tg" onClick={handleThemeToggle}>โหมดมืด / สว่าง</button>
      </aside>

      <main>
        {activeNav === 'acc' && (
          <section id="m-acc">
            <h2>บัญชีและภาษี</h2>
            <p className="sub">บันทึกรายรับ-รายจ่าย คำนวณภาษีเงินได้บุคคลธรรมดา และเรียนรู้พื้นฐานบัญชี</p>

            <div className="tabs" id="tabs-acc">
              <button
                type="button"
                className={activeAccTab === 'led' ? 'on' : ''}
                onClick={() => setActiveAccTab('led')}
              >
                รายรับ-รายจ่าย
              </button>
              <button
                type="button"
                className={activeAccTab === 'tax' ? 'on' : ''}
                onClick={() => setActiveAccTab('tax')}
              >
                คำนวณภาษี
              </button>
              <button
                type="button"
                className={activeAccTab === 'lrn' ? 'on' : ''}
                onClick={() => setActiveAccTab('lrn')}
              >
                เรียนบัญชี
              </button>
            </div>

            {activeAccTab === 'led' && (
              <div id="t-led">
                <div className="grid" id="kpis">
                  <div className="card kpi">
                    <span>รายรับเดือนนี้</span>
                    <b className="up">{formatMoney(stats.monthIncome)}</b>
                  </div>
                  <div className="card kpi">
                    <span>รายจ่ายเดือนนี้</span>
                    <b className="down">{formatMoney(stats.monthExpense)}</b>
                  </div>
                  <div className="card kpi">
                    <span>คงเหลือเดือนนี้</span>
                    <b className={stats.net >= 0 ? 'up' : 'down'}>
                      {stats.net >= 0 ? '+' : '-'}
                      {formatMoney(Math.abs(stats.net))}
                    </b>
                  </div>
                </div>

                <div className="card" style={{ marginTop: 16 }}>
                  <b>เพิ่มรายการ</b>
                  <div className="grid" style={{ marginTop: 10 }}>
                    <div>
                      <label>วันที่</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                      <label>ประเภท</label>
                      <select value={ledgerType} onChange={(e) => {
                        const next = e.target.value as EntryType
                        setLedgerType(next)
                        setCategory(CATS[next][0])
                      }}>
                        <option value="in">รายรับ</option>
                        <option value="out">รายจ่าย</option>
                      </select>
                    </div>
                    <div>
                      <label>หมวดหมู่</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {ledgerCategories.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>จำนวนเงิน (บาท)</label>
                      <input type="number" min="0" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div>
                      <label>บันทึกช่วยจำ</label>
                      <input placeholder="เช่น ค่าอาหารกลางวัน" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                    <button type="button" className="btn" onClick={addEntry}>บันทึกรายการ</button>
                    <button type="button" className="btn ghost">สำรองข้อมูล (ดาวน์โหลด)</button>
                    <label className="btn ghost" style={{ margin: 0, color: 'var(--ink)' }}>
                      นำเข้าข้อมูล
                      <input type="file" accept=".json" className="hide" />
                    </label>
                  </div>
                </div>

                <div className="card">
                  <b>สรุปรายเดือน (6 เดือนล่าสุด)</b>
                  <div className="bar" style={{ marginTop: 12 }}>
                    {chartData.monthSet.map((m, index) => (
                      <div key={m}>
                        <div className="pair">
                          <i style={{ height: `${(chartData.vals[index][0] / chartData.max) * 100}%` }} />
                          <i className="e" style={{ height: `${(chartData.vals[index][1] / chartData.max) * 100}%` }} />
                        </div>
                        {m.slice(5)}/{m.slice(2, 4)}
                      </div>
                    ))}
                  </div>
                  <p className="sub" style={{ margin: '8px 0 0', fontSize: 13 }}>แท่งเขียว = รายรับ · แท่งแดง = รายจ่าย</p>
                </div>

                <div className="card">
                  <b>รายการล่าสุด</b>
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <tbody>
                        {recentEntries.length ? (
                          <>
                            <tr>
                              <th>วันที่</th>
                              <th>หมวด</th>
                              <th>บันทึก</th>
                              <th className="n">จำนวน</th>
                              <th></th>
                            </tr>
                            {recentEntries.map((x) => (
                              <tr key={x.id}>
                                <td>{x.d}</td>
                                <td>{x.c}</td>
                                <td>{safeString(x.n).replace(/[<>&]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char] ?? char))}</td>
                                <td className={`n ${x.t === 'in' ? 'up' : 'down'}`}>
                                  {x.t === 'in' ? '+' : '−'}
                                  {formatMoney(x.a)}
                                </td>
                                <td>
                                  <button type="button" className="btn ghost" style={{ padding: '2px 10px' }} onClick={() => deleteEntry(x.id)}>ลบ</button>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td>ยังไม่มีรายการ เริ่มจากกรอกฟอร์มด้านบน แล้วกด "บันทึกรายการ"</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="warn">ข้อมูลเก็บในเบราว์เซอร์ของคุณเท่านั้น ไม่ถูกส่งไปที่ใด หากล้างข้อมูลเบราว์เซอร์หรือเปลี่ยนเครื่อง ให้ใช้ปุ่มสำรอง/นำเข้า</p>
              </div>
            )}

            {activeAccTab === 'tax' && (
              <div id="t-tax">
                <div className="note">ปีภาษี 2569 (ยื่นแบบในปี 2570) · คำนวณตามอัตราขั้นบันไดของกรมสรรพากร สำหรับ <b>เงินเดือน/ค่าจ้าง (มาตรา 40(1))</b> · ใส่เฉพาะช่องที่เกี่ยวข้อง ที่เหลือเว้นว่างได้</div>
                <div className="grid card" style={{ marginTop: 14 }}>
                  <div><label>เงินเดือน/ค่าจ้างทั้งปี 40(1)</label><input type="number" min="0" placeholder="เช่น 600000" /></div>
                  <div><label>ฟรีแลนซ์/รับจ้างอิสระ 40(2) ทั้งปี</label><input type="number" min="0" /></div>
                  <div><label>ขายของ/ธุรกิจ 40(8) รายรับทั้งปี</label><input type="number" min="0" /></div>
                  <div><label>วิธีหักค่าใช้จ่าย 40(8)</label><select><option value="0.6">เหมา 60% (ทั่วไป)</option><option value="0.4">เหมา 40%</option><option value="0.3">เหมา 30%</option><option value="act">ตามจริง</option></select></div>
                  <div><label>ค่าใช้จ่ายจริง 40(8) (ถ้าเลือกตามจริง)</label><input type="number" min="0" /></div>
                  <div><label>ภาษีที่ถูกหัก ณ ที่จ่ายแล้ว</label><input type="number" min="0" /></div>
                  <div><label>คู่สมรสไม่มีเงินได้</label><select><option value="0">ไม่มี</option><option value="1">มี</option></select></div>
                  <div><label>จำนวนบุตร (คนละ 30,000)</label><input type="number" min="0" value="0" /></div>
                  <div><label>บุตรคนที่ 2 ขึ้นไป เกิดตั้งแต่ปี 2561 (เพิ่มคนละ 30,000)</label><input type="number" min="0" value="0" /></div>
                  <div><label>พ่อแม่ที่ดูแล (คนละ 30,000 สูงสุด 4 คน)</label><input type="number" min="0" max="4" value="0" /></div>
                  <div><label>ประกันสังคม (สูงสุด 9,000)</label><input type="number" min="0" /></div>
                  <div><label>เบี้ยประกันชีวิต (สูงสุด 100,000)</label><input type="number" min="0" /></div>
                  <div><label>เบี้ยประกันสุขภาพ (สูงสุด 25,000)</label><input type="number" min="0" /></div>
                  <div><label>กองทุน SSF (≤30% ของเงินได้, สูงสุด 200,000)</label><input type="number" min="0" /></div>
                  <div><label>กองทุน RMF (≤30% ของเงินได้, สูงสุด 500,000)</label><input type="number" min="0" /></div>
                  <div><label>กองทุนสำรองเลี้ยงชีพ (≤15% ของเงินได้)</label><input type="number" min="0" /></div>
                  <div><label>เงินบริจาคทั่วไป</label><input type="number" min="0" /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button type="button" className="btn">คำนวณภาษี</button>
                  <button type="button" className="btn ghost">ดึงรายรับจากสมุดบัญชีปีนี้</button>
                </div>
                <div style={{ marginTop: 18 }} id="x-out" />
                <p className="warn">ผลลัพธ์เป็นการประเมินเบื้องต้นเพื่อการศึกษา ไม่ใช่คำปรึกษาทางภาษี อัตราและเพดานลดหย่อนอาจเปลี่ยนแปลงได้ ตรวจสอบกับ <a href="https://www.rd.go.th" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>rd.go.th</a> หรือสรรพากรก่อนยื่นจริง</p>
              </div>
            )}

            {activeAccTab === 'lrn' && (
              <div id="t-lrn">
                <details open>
                  <summary>1. สมการบัญชี: ทุกอย่างต้องสมดุล</summary>
                  <p><b>สินทรัพย์ = หนี้สิน + ส่วนของเจ้าของ</b></p>
                  <p>ตัวอย่าง: คุณมีเงินสด 100,000 บาท (สินทรัพย์) โดยเป็นเงินกู้ 30,000 (หนี้สิน) และเงินของคุณเอง 70,000 (ส่วนของเจ้าของ) ทุกรายการที่บันทึกต้องทำให้สมการนี้ยังสมดุล</p>
                </details>
                <details>
                  <summary>2. เดบิต-เครดิต</summary>
                  <p>ทุกรายการลงบัญชี 2 ด้านเสมอ ด้านซ้ายคือ <b>เดบิต</b> ด้านขวาคือ <b>เครดิต</b> และยอดสองด้านต้องเท่ากัน</p>
                  <table>
                    <tbody>
                      <tr><th>ประเภทบัญชี</th><th>เดบิต</th><th>เครดิต</th></tr>
                      <tr><td>สินทรัพย์ / ค่าใช้จ่าย</td><td>เพิ่ม</td><td>ลด</td></tr>
                      <tr><td>หนี้สิน / ทุน / รายได้</td><td>ลด</td><td>เพิ่ม</td></tr>
                    </tbody>
                  </table>
                  <div className="tip">ตัวอย่าง: ขายของได้เงินสด 5,000 → เดบิต เงินสด 5,000 / เครดิต รายได้จากการขาย 5,000</div>
                </details>
                <details>
                  <summary>3. งบกำไรขาดทุน</summary>
                  <p>บอกว่า "ช่วงเวลาหนึ่ง" ธุรกิจหรือตัวคุณมีรายได้เท่าไร ใช้จ่ายไปเท่าไร และเหลือกำไรหรือขาดทุนเท่าไร</p>
                  <p><b>กำไรสุทธิ = รายได้ − ค่าใช้จ่าย</b> · หน้า "รายรับ-รายจ่าย" ในเว็บนี้ก็คืองบกำไรขาดทุนแบบง่ายของคุณ</p>
                </details>
                <details>
                  <summary>4. งบดุล</summary>
                  <p>บอกว่า "ณ วันใดวันหนึ่ง" มีสินทรัพย์อะไร เป็นหนี้เท่าไร และเหลือเป็นของเราเท่าไร ใช้ดูฐานะการเงิน ต่างจากงบกำไรขาดทุนที่ดูผลงานตลอดช่วงเวลา</p>
                </details>
                <details>
                  <summary>5. เกณฑ์เงินสด vs เกณฑ์คงค้าง</summary>
                  <p><b>เกณฑ์เงินสด</b> บันทึกเมื่อรับ/จ่ายเงินจริง (เหมาะกับบุคคลทั่วไป) · <b>เกณฑ์คงค้าง</b> บันทึกเมื่อเกิดรายการ แม้ยังไม่ได้รับหรือจ่ายเงิน (ใช้ในบริษัท)</p>
                </details>
                <details>
                  <summary>ศัพท์ที่ควรรู้</summary>
                  <p><b>เงินได้พึงประเมิน</b> รายได้ก่อนหักอะไรทั้งหมด · <b>เงินได้สุทธิ</b> รายได้หลังหักค่าใช้จ่ายและค่าลดหย่อน ซึ่งเป็นฐานคิดภาษี · <b>ภาษีหัก ณ ที่จ่าย</b> ภาษีที่ผู้จ่ายหักไว้ล่วงหน้า · <b>ภ.ง.ด.90/91</b> แบบยื่นภาษีประจำปี</p>
                </details>

                <div className="card" style={{ marginTop: 16 }}>
                  <b>ถามครู AI เรื่องบัญชีและความรู้ทั่วไป</b>
                  <div style={{ margin: '10px 0' }}>
                    <button type="button" className="chip">กำไรขั้นต้นกับกำไรสุทธิต่างกันอย่างไร</button>
                    <button type="button" className="chip">ค่าเสื่อมราคาคืออะไร ยกตัวอย่าง</button>
                    <button type="button" className="chip">ฟรีแลนซ์ควรเก็บเอกสารอะไรไว้ยื่นภาษี</button>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input placeholder="พิมพ์คำถามที่นี่" />
                    <button type="button" className="btn" style={{ whiteSpace: 'nowrap' }}>ถาม</button>
                  </div>
                  <div id="c-out" />
                </div>
              </div>
            )}
          </section>
        )}

        {activeNav === 'doc' && (
          <section id="m-doc">
            <h2>สรุปไฟล์ / PDF</h2>
            <p className="sub">อัปโหลดหรือวางเนื้อหา เลือกรูปแบบสรุป แล้วส่งออกเป็น PDF</p>
            <div className="card noprint">
              <div className="grid">
                <div>
                  <label>ไฟล์ (PDF, Word .docx, .txt)</label>
                  <input type="file" accept=".pdf,.docx,.txt,.md" />
                </div>
                <div>
                  <label>ชื่อเรื่องในฉบับสรุป</label>
                  <input placeholder="เช่น รายงานประชุมไตรมาส 3" />
                </div>
                <div>
                  <label>รูปแบบสรุป</label>
                  <select>
                    <option value="p">1 ย่อหน้า</option>
                    <option value="k">หัวข้อสำคัญ</option>
                    <option value="a">สิ่งที่ต้องทำ</option>
                  </select>
                </div>
              </div>
              <label style={{ marginTop: 12 }}>หรือวางข้อความที่นี่</label>
              <textarea defaultValue="" />
              <div style={{ marginTop: 12 }}>
                <button type="button" className="btn">สรุปเนื้อหา</button>
              </div>
              <p className="warn" style={{ marginBottom: 0 }}>สรุปแบบพื้นฐานทำงานในเครื่องคุณ ไม่ส่งไฟล์ออกไปไหน · "สรุปด้วย AI" จะส่งข้อความไปที่ AI ที่คุณตั้งค่าไว้ · ไฟล์สแกนที่เป็นรูปภาพอ่านไม่ได้</p>
            </div>
            <div id="d-out" />
          </section>
        )}

        {activeNav === 'inv' && (
          <section id="m-inv">
            <h2>ที่ปรึกษาการลงทุน</h2>
            <p className="sub">กรอกตัวเลขหุ้นที่สนใจ ระบบให้คะแนนและจัดอันดับพร้อมเหตุผล</p>
            <div className="note">เว็บนี้ไม่ดึงราคาสดอัตโนมัติ ให้กรอกตัวเลขล่าสุดจากแหล่งที่เชื่อถือได้เอง (เช่น SET, Settrade, งบการเงินบริษัท) · รายการ "ตัวอย่าง" เป็นตัวเลขสมมติ ลบทิ้งได้</div>
            <div className="card noprint" style={{ marginTop: 14 }}>
              <b>เพิ่มหุ้น</b>
              <div className="grid" style={{ marginTop: 10 }}>
                <div><label>ชื่อหุ้น</label><input type="text" /></div>
                <div><label>P/E (เท่า)</label><input type="number" step="any" /></div>
                <div><label>P/B (เท่า)</label><input type="number" step="any" /></div>
                <div><label>ROE (%)</label><input type="number" step="any" /></div>
                <div><label>D/E (เท่า)</label><input type="number" step="any" /></div>
                <div><label>ปันผล (%)</label><input type="number" step="any" /></div>
                <div><label>รายได้โต (%/ปี)</label><input type="number" step="any" /></div>
                <div><label>RSI (14)</label><input type="number" step="any" /></div>
                <div>
                  <label>แนวโน้มราคา</label>
                  <select>
                    <option value="a">เหนือเส้น MA50 และ MA200</option>
                    <option value="m">ผสม</option>
                    <option value="b">ต่ำกว่า MA50 และ MA200</option>
                  </select>
                </div>
                <div>
                  <label>สัญญาณ MACD</label>
                  <select>
                    <option value="u">ขาขึ้น</option>
                    <option value="n">เป็นกลาง</option>
                    <option value="d">ขาลง</option>
                  </select>
                </div>
              </div>
              <label style={{ marginTop: 12 }}>ปัจจัยเสี่ยงของบริษัทนี้ (เลือกได้หลายข้อ)</label>
              <div>
                <label style={{ display: 'inline-block', marginRight: 14, color: 'var(--ink)' }}><input type="checkbox" style={{ width: 'auto' }} /> หนี้สูง / ภาระดอกเบี้ย</label>
                <label style={{ display: 'inline-block', marginRight: 14, color: 'var(--ink)' }}><input type="checkbox" style={{ width: 'auto' }} /> ลูกค้าหรือรายได้กระจุกตัว</label>
                <label style={{ display: 'inline-block', marginRight: 14, color: 'var(--ink)' }}><input type="checkbox" style={{ width: 'auto' }} /> กฎระเบียบ / นโยบายรัฐ</label>
              </div>
              <button type="button" className="btn" style={{ marginTop: 12, display: 'inline-block' }}>เพิ่มและให้คะแนน</button>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <b>การจัดอันดับ</b>
                <select style={{ width: 'auto' }}>
                  <option value="all">ทั้งหมด</option>
                  <option value="div">ปันผลดี (≥4%)</option>
                  <option value="gr">เติบโต (รายได้ ≥10%)</option>
                  <option value="val">ราคาถูก (P/E&lt;12, P/B&lt;1.5)</option>
                </select>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <tbody>
                    <tr>
                      <th>อันดับ</th>
                      <th>หุ้น</th>
                      <th className="n">Fundamental</th>
                      <th className="n">Technical</th>
                      <th className="n">ความปลอดภัย</th>
                      <th className="n">รวม</th>
                      <th>สรุป</th>
                    </tr>
                    {stocks.map((stock, index) => (
                      <tr key={stock.n}>
                        <td>{index + 1}</td>
                        <td>{stock.n}</td>
                        <td className="n">{Math.round(stock.pe + stock.roe * 0.8)}</td>
                        <td className="n">{Math.round(stock.rsi / 2)}</td>
                        <td className="n">{Math.round((100 - stock.rk.length * 13) / 1.8)}</td>
                        <td className="n"><b>{Math.round((stock.pe || 0) + (stock.roe || 0) + (stock.dy || 0) * 6 + (stock.g || 0) * 2)}</b></td>
                        <td><span className="pill">น่าสนใจ</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="i-det" />
            <p className="warn">เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำการลงทุนส่วนบุคคล คะแนนเป็นเพียงสูตรคร่าว ๆ จากตัวเลขที่กรอก ไม่ได้พิจารณาข่าว ราคาล่าสุด หรือเป้าหมายการลงทุนของคุณ การลงทุนมีความเสี่ยง ผู้ลงทุนอาจสูญเสียเงินต้น</p>
          </section>
        )}
      </main>
    </div>
  )
}
