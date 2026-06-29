"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/lib/DataStore";
import { craftTypes, districts, TINT_HEX } from "@/lib/data";
import type { Place } from "@/lib/types";

const TINTS = Object.keys(TINT_HEX);

function emptyPlace(): Place {
  return {
    id: "",
    qrPoint: 0,
    name: { th: "", en: "" },
    district: "อ.เมืองน่าน",
    craftType: "culture",
    tint: "navy",
    icon: "ti-map-pin",
    lat: 18.78,
    lon: 100.77,
    rating: 5,
    reviews: 0,
    tags: { th: [], en: [] },
    summary: { th: "", en: "" },
    image: "",
    about: { th: "", en: "" },
    source: { th: "", en: "" },
    directory: { th: "", en: "" },
    certDocs: [],
    experiences: [],
    shopping: [],
    visit: {
      hours: { th: "", en: "" },
      admission: { th: "", en: "" },
      contact: "",
      howToGet: { th: "", en: "" },
      price: { th: "", en: "" },
      rentalCar: { th: "", en: "" },
    },
    news: [],
  };
}

const cx = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy-300";

export default function PlaceForm({ initial }: { initial?: Place }) {
  const router = useRouter();
  const { savePlace } = useDataStore();
  const [p, setP] = useState<Place>(initial ? structuredClone(initial) : emptyPlace());
  const isEdit = !!initial;

  const set = (patch: Partial<Place>) => setP((v) => ({ ...v, ...patch }));

  const submit = () => {
    const id = p.id || p.name.en.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `place-${Date.now()}`;
    savePlace({ ...p, id });
    router.push("/admin/places");
  };

  return (
    <div className="flex flex-col gap-5">
      <Section n={1} title="เกี่ยวกับสถานที่และวัฒนธรรม (About & Culture)">
        <Row>
          <Field label="ชื่อ (ไทย)"><input className={cx} value={p.name.th} onChange={(e) => set({ name: { ...p.name, th: e.target.value } })} /></Field>
          <Field label="ชื่อ (อังกฤษ)"><input className={cx} value={p.name.en} onChange={(e) => set({ name: { ...p.name, en: e.target.value } })} /></Field>
        </Row>
        <Row>
          <Field label="อำเภอ">
            <select className={cx} value={p.district} onChange={(e) => set({ district: e.target.value })}>
              {districts.map((d) => <option key={d.key} value={`อ.${d.name.th}`}>{d.name.th}</option>)}
            </select>
          </Field>
          <Field label="ประเภทคราฟ/หมวด">
            <select className={cx} value={p.craftType} onChange={(e) => set({ craftType: e.target.value })}>
              {craftTypes.map((c) => <option key={c.key} value={c.key}>{c.name.th}</option>)}
            </select>
          </Field>
        </Row>
        <Row>
          <Field label="สรุปสั้น (ไทย)"><input className={cx} value={p.summary.th} onChange={(e) => set({ summary: { ...p.summary, th: e.target.value } })} /></Field>
          <Field label="สรุปสั้น (อังกฤษ)"><input className={cx} value={p.summary.en} onChange={(e) => set({ summary: { ...p.summary, en: e.target.value } })} /></Field>
        </Row>
        <Field label="ประวัติ (ไทย)"><textarea rows={3} className={cx} value={p.about.th} onChange={(e) => set({ about: { ...p.about, th: e.target.value } })} /></Field>
        <Field label="ประวัติ (อังกฤษ)"><textarea rows={3} className={cx} value={p.about.en} onChange={(e) => set({ about: { ...p.about, en: e.target.value } })} /></Field>
        <Row>
          <Field label="ที่มา (ไทย)"><input className={cx} value={p.source?.th ?? ""} onChange={(e) => set({ source: { th: e.target.value, en: p.source?.en ?? "" } })} /></Field>
          <Field label="ที่มา (อังกฤษ)"><input className={cx} value={p.source?.en ?? ""} onChange={(e) => set({ source: { th: p.source?.th ?? "", en: e.target.value } })} /></Field>
        </Row>
        <Row>
          <Field label="ทำเนียบ (ไทย)"><input className={cx} value={p.directory?.th ?? ""} onChange={(e) => set({ directory: { th: e.target.value, en: p.directory?.en ?? "" } })} /></Field>
          <Field label="ทำเนียบ (อังกฤษ)"><input className={cx} value={p.directory?.en ?? ""} onChange={(e) => set({ directory: { th: p.directory?.th ?? "", en: e.target.value } })} /></Field>
        </Row>
        <Field label="รูปหลัก (URL/path เช่น /places/wat-phumin.jpg)"><input className={cx} value={p.image ?? ""} onChange={(e) => set({ image: e.target.value })} /></Field>
        <Field label="เอกสารรับรองประกอบกิจการ">
          <ListEditor
            items={p.certDocs ?? []}
            onChange={(certDocs) => set({ certDocs })}
            empty={{ name: { th: "", en: "" }, url: "" }}
            render={(it, upd) => (
              <>
                <Row>
                  <input className={cx} placeholder="ชื่อเอกสาร (ไทย)" value={it.name.th} onChange={(e) => upd({ name: { ...it.name, th: e.target.value } })} />
                  <input className={cx} placeholder="ชื่อเอกสาร (อังกฤษ)" value={it.name.en} onChange={(e) => upd({ name: { ...it.name, en: e.target.value } })} />
                </Row>
                <input className={cx} placeholder="URL/path เอกสาร" value={it.url} onChange={(e) => upd({ url: e.target.value })} />
              </>
            )}
          />
        </Field>
        <Row>
          <Field label="แท็ก ไทย (คั่นด้วย ,)"><input className={cx} value={p.tags.th.join(", ")} onChange={(e) => set({ tags: { ...p.tags, th: splitTags(e.target.value) } })} /></Field>
          <Field label="แท็ก อังกฤษ (คั่นด้วย ,)"><input className={cx} value={p.tags.en.join(", ")} onChange={(e) => set({ tags: { ...p.tags, en: splitTags(e.target.value) } })} /></Field>
        </Row>
        <Row>
          <Field label="สีธีม">
            <select className={cx} value={p.tint} onChange={(e) => set({ tint: e.target.value })}>
              {TINTS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="ไอคอน (Tabler เช่น ti-building-arch)"><input className={cx} value={p.icon} onChange={(e) => set({ icon: e.target.value })} /></Field>
        </Row>
      </Section>

      <Section n={2} title="ประสบการณ์และกิจกรรม (Experiences)">
        <ListEditor
          items={p.experiences}
          onChange={(experiences) => set({ experiences })}
          empty={{ title: { th: "", en: "" }, detail: { th: "", en: "" } }}
          render={(it, upd) => (
            <>
              <Row>
                <input className={cx} placeholder="ชื่อกิจกรรม (ไทย)" value={it.title.th} onChange={(e) => upd({ title: { ...it.title, th: e.target.value } })} />
                <input className={cx} placeholder="ชื่อกิจกรรม (อังกฤษ)" value={it.title.en} onChange={(e) => upd({ title: { ...it.title, en: e.target.value } })} />
              </Row>
              <Row>
                <input className={cx} placeholder="รายละเอียด (ไทย)" value={it.detail.th} onChange={(e) => upd({ detail: { ...it.detail, th: e.target.value } })} />
                <input className={cx} placeholder="รายละเอียด (อังกฤษ)" value={it.detail.en} onChange={(e) => upd({ detail: { ...it.detail, en: e.target.value } })} />
              </Row>
              <div className="grid gap-3 sm:grid-cols-3">
                <input type="number" className={cx} placeholder="เวลา (นาที)" value={it.duration ?? ""} onChange={(e) => upd({ duration: numOrUndef(e.target.value) })} />
                <input type="number" className={cx} placeholder="จำนวนคน" value={it.capacity ?? ""} onChange={(e) => upd({ capacity: numOrUndef(e.target.value) })} />
                <input type="number" className={cx} placeholder="ราคา (บาท)" value={it.price ?? ""} onChange={(e) => upd({ price: numOrUndef(e.target.value) })} />
              </div>
              <input className={cx} placeholder="รูปภาพ (URL/path)" value={it.image ?? ""} onChange={(e) => upd({ image: e.target.value })} />
            </>
          )}
        />
      </Section>

      <Section n={3} title="การเลือกซื้อและจัดแสดง (Shopping & Exhibition)">
        <ListEditor
          items={p.shopping}
          onChange={(shopping) => set({ shopping })}
          empty={{ title: { th: "", en: "" }, detail: { th: "", en: "" } }}
          render={(it, upd) => (
            <>
              <Row>
                <input className={cx} placeholder="ชื่อ (ไทย)" value={it.title.th} onChange={(e) => upd({ title: { ...it.title, th: e.target.value } })} />
                <input className={cx} placeholder="ชื่อ (อังกฤษ)" value={it.title.en} onChange={(e) => upd({ title: { ...it.title, en: e.target.value } })} />
              </Row>
              <Row>
                <input className={cx} placeholder="รายละเอียด (ไทย)" value={it.detail.th} onChange={(e) => upd({ detail: { ...it.detail, th: e.target.value } })} />
                <input className={cx} placeholder="รายละเอียด (อังกฤษ)" value={it.detail.en} onChange={(e) => upd({ detail: { ...it.detail, en: e.target.value } })} />
              </Row>
              <input className={cx} placeholder="รูปภาพ (URL/path)" value={it.image ?? ""} onChange={(e) => upd({ image: e.target.value })} />
            </>
          )}
        />
      </Section>

      <Section n={4} title="ข้อมูลการเข้าชมและบริการ (Visit & Services)">
        <Row>
          <Field label="เวลาทำการ (ไทย)"><input className={cx} value={p.visit.hours.th} onChange={(e) => set({ visit: { ...p.visit, hours: { ...p.visit.hours, th: e.target.value } } })} /></Field>
          <Field label="เวลาทำการ (อังกฤษ)"><input className={cx} value={p.visit.hours.en} onChange={(e) => set({ visit: { ...p.visit, hours: { ...p.visit.hours, en: e.target.value } } })} /></Field>
        </Row>
        <Row>
          <Field label="ค่าเข้าชม (ไทย)"><input className={cx} value={p.visit.admission.th} onChange={(e) => set({ visit: { ...p.visit, admission: { ...p.visit.admission, th: e.target.value } } })} /></Field>
          <Field label="ค่าเข้าชม (อังกฤษ)"><input className={cx} value={p.visit.admission.en} onChange={(e) => set({ visit: { ...p.visit, admission: { ...p.visit.admission, en: e.target.value } } })} /></Field>
        </Row>
        <Field label="ติดต่อ (เบอร์โทร)"><input className={cx} value={p.visit.contact} onChange={(e) => set({ visit: { ...p.visit, contact: e.target.value } })} /></Field>
        <Row>
          <Field label="ราคา (ไทย)"><input className={cx} value={p.visit.price?.th ?? ""} onChange={(e) => set({ visit: { ...p.visit, price: { th: e.target.value, en: p.visit.price?.en ?? "" } } })} /></Field>
          <Field label="ราคา (อังกฤษ)"><input className={cx} value={p.visit.price?.en ?? ""} onChange={(e) => set({ visit: { ...p.visit, price: { th: p.visit.price?.th ?? "", en: e.target.value } } })} /></Field>
        </Row>
        <Row>
          <Field label="รถเช่า (ไทย)"><input className={cx} value={p.visit.rentalCar?.th ?? ""} onChange={(e) => set({ visit: { ...p.visit, rentalCar: { th: e.target.value, en: p.visit.rentalCar?.en ?? "" } } })} /></Field>
          <Field label="รถเช่า (อังกฤษ)"><input className={cx} value={p.visit.rentalCar?.en ?? ""} onChange={(e) => set({ visit: { ...p.visit, rentalCar: { th: p.visit.rentalCar?.th ?? "", en: e.target.value } } })} /></Field>
        </Row>
        <Row>
          <Field label="การเดินทาง (ไทย)"><input className={cx} value={p.visit.howToGet.th} onChange={(e) => set({ visit: { ...p.visit, howToGet: { ...p.visit.howToGet, th: e.target.value } } })} /></Field>
          <Field label="การเดินทาง (อังกฤษ)"><input className={cx} value={p.visit.howToGet.en} onChange={(e) => set({ visit: { ...p.visit, howToGet: { ...p.visit.howToGet, en: e.target.value } } })} /></Field>
        </Row>
        <Row>
          <Field label="ละติจูด (lat)"><input type="number" step="0.0001" className={cx} value={p.lat} onChange={(e) => set({ lat: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="ลองจิจูด (lon)"><input type="number" step="0.0001" className={cx} value={p.lon} onChange={(e) => set({ lon: parseFloat(e.target.value) || 0 })} /></Field>
        </Row>
        <Row>
          <Field label="QR จุดที่"><input type="number" className={cx} value={p.qrPoint} onChange={(e) => set({ qrPoint: parseInt(e.target.value) || 0 })} /></Field>
          <Field label="คะแนน (rating)"><input type="number" step="0.1" className={cx} value={p.rating} onChange={(e) => set({ rating: parseFloat(e.target.value) || 0 })} /></Field>
        </Row>
      </Section>

      <Section n={5} title="ข่าวสารและกิจกรรมพิเศษ (News & Events)">
        <ListEditor
          items={p.news}
          onChange={(news) => set({ news })}
          empty={{ title: { th: "", en: "" }, detail: { th: "", en: "" }, month: "" }}
          render={(it, upd) => (
            <>
              <Row>
                <input className={cx} placeholder="หัวข้อ (ไทย)" value={it.title.th} onChange={(e) => upd({ title: { ...it.title, th: e.target.value } })} />
                <input className={cx} placeholder="หัวข้อ (อังกฤษ)" value={it.title.en} onChange={(e) => upd({ title: { ...it.title, en: e.target.value } })} />
              </Row>
              <Row>
                <input className={cx} placeholder="รายละเอียด (ไทย)" value={it.detail.th} onChange={(e) => upd({ detail: { ...it.detail, th: e.target.value } })} />
                <input className={cx} placeholder="เดือน เช่น ก.พ." value={it.month} onChange={(e) => upd({ month: e.target.value })} />
              </Row>
              <Row>
                <input className={cx} placeholder="ช่วงเวลา (ไทย)" value={it.timeframe?.th ?? ""} onChange={(e) => upd({ timeframe: { th: e.target.value, en: it.timeframe?.en ?? "" } })} />
                <input className={cx} placeholder="สภาพอากาศ (ไทย)" value={it.weather?.th ?? ""} onChange={(e) => upd({ weather: { th: e.target.value, en: it.weather?.en ?? "" } })} />
              </Row>
            </>
          )}
        />
      </Section>

      <div className="sticky bottom-0 flex gap-2 border-t border-line bg-cream/95 py-3 backdrop-blur">
        <button onClick={submit} className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-cream hover:bg-navy-600">
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มสถานที่"}
        </button>
        <button onClick={() => router.push("/admin/places")} className="rounded-full border border-navy px-6 py-2.5 text-sm text-navy">
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

function splitTags(s: string): string[] {
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

function numOrUndef(s: string): number | undefined {
  if (s.trim() === "") return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : n;
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <h2 className="mb-3 flex items-center gap-2 font-semibold text-navy">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs text-gold">{n}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-navy">{label}</span>
      {children}
    </label>
  );
}

function ListEditor<T>({
  items,
  onChange,
  empty,
  render,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  empty: T;
  render: (item: T, upd: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-line bg-cream/40 p-3">
          <div className="mb-2 flex flex-col gap-2">
            {render(it, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))))}
          </div>
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-xs text-[#993c1d]">
            <i className="ti ti-trash" aria-hidden /> ลบรายการ
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, structuredClone(empty)])}
        className="flex w-fit items-center gap-1 rounded-full border border-dashed border-navy-300 px-3 py-1.5 text-xs text-navy"
      >
        <i className="ti ti-plus" aria-hidden /> เพิ่มรายการ
      </button>
    </div>
  );
}
