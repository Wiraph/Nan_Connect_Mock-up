"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/lib/PostStore";
import { POST_CATEGORIES, Post, PostCategory } from "@/lib/posts";
import { craftTypes } from "@/lib/data";
import { dict } from "@/i18n/dictionaries";

const cx =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy-300";

const CATEGORY_LABEL: Record<PostCategory, string> = {
  about: dict.th["place.about"],
  experiences: dict.th["place.experiences"],
  shopping: dict.th["place.shopping"],
  visit: dict.th["place.visit"],
  news: dict.th["place.news"],
};

function emptyPost(): Post {
  return {
    id: "",
    category: "news",
    title: { th: "", en: "" },
    detail: { th: "", en: "" },
    image: "",
  };
}

function numOrUndef(s: string): number | undefined {
  if (s.trim() === "") return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : n;
}

export default function PostForm({ initial }: { initial?: Post }) {
  const router = useRouter();
  const { savePost } = usePostStore();
  const [p, setP] = useState<Post>(initial ? structuredClone(initial) : emptyPost());
  const isEdit = !!initial;

  const set = (patch: Partial<Post>) => setP((v) => ({ ...v, ...patch }));
  const locVal = (key: "source" | "directory" | "price" | "rentalCar" | "timeframe" | "weather") =>
    p[key] ?? { th: "", en: "" };

  const submit = () => {
    const id =
      p.id ||
      `${p.category}-${(p.title.en || p.title.th).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` ||
      `post-${Date.now()}`;
    savePost({ ...p, id });
    router.push("/admin/posts");
  };

  return (
    <div className="flex flex-col gap-5">
      <Section title="ข้อมูลหลัก">
        <Field label="หมวดหมู่">
          <select className={cx} value={p.category} onChange={(e) => set({ category: e.target.value as PostCategory })}>
            {POST_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]} ({c})
              </option>
            ))}
          </select>
        </Field>
        <Row>
          <Field label="หัวข้อ (ไทย)"><input className={cx} value={p.title.th} onChange={(e) => set({ title: { ...p.title, th: e.target.value } })} /></Field>
          <Field label="หัวข้อ (อังกฤษ)"><input className={cx} value={p.title.en} onChange={(e) => set({ title: { ...p.title, en: e.target.value } })} /></Field>
        </Row>
        <Field label="รายละเอียด (ไทย)"><textarea rows={3} className={cx} value={p.detail.th} onChange={(e) => set({ detail: { ...p.detail, th: e.target.value } })} /></Field>
        <Field label="รายละเอียด (อังกฤษ)"><textarea rows={3} className={cx} value={p.detail.en} onChange={(e) => set({ detail: { ...p.detail, en: e.target.value } })} /></Field>
        <Field label="รูปภาพ (URL/path)"><input className={cx} value={p.image ?? ""} onChange={(e) => set({ image: e.target.value })} /></Field>
      </Section>

      <Section title={`รายละเอียดเฉพาะหมวด: ${CATEGORY_LABEL[p.category]}`}>
        {p.category === "about" && (
          <>
            <Field label="ประเภทกิจการ">
              <select className={cx} value={p.craftType ?? ""} onChange={(e) => set({ craftType: e.target.value || undefined })}>
                <option value="">—</option>
                {craftTypes.map((c) => <option key={c.key} value={c.key}>{c.name.th}</option>)}
              </select>
            </Field>
            <LocRow label="ที่มา" v={locVal("source")} onChange={(source) => set({ source })} />
            <LocRow label="ทำเนียบ" v={locVal("directory")} onChange={(directory) => set({ directory })} />
          </>
        )}

        {p.category === "experiences" && (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="เวลา (นาที)"><input type="number" className={cx} value={p.duration ?? ""} onChange={(e) => set({ duration: numOrUndef(e.target.value) })} /></Field>
              <Field label="จำนวนคน"><input type="number" className={cx} value={p.capacity ?? ""} onChange={(e) => set({ capacity: numOrUndef(e.target.value) })} /></Field>
              <div />
            </div>
            <LocRow label="ราคา" v={locVal("price")} onChange={(price) => set({ price })} />
          </>
        )}

        {p.category === "shopping" && (
          <p className="text-xs text-muted">หมวดนี้ใช้เฉพาะ หัวข้อ / รายละเอียด / รูปภาพ</p>
        )}

        {p.category === "visit" && (
          <>
            <Field label="ติดต่อ (เบอร์โทร)"><input className={cx} value={p.contact ?? ""} onChange={(e) => set({ contact: e.target.value || undefined })} /></Field>
            <LocRow label="ราคา" v={locVal("price")} onChange={(price) => set({ price })} />
            <LocRow label="รถเช่า" v={locVal("rentalCar")} onChange={(rentalCar) => set({ rentalCar })} />
            <Row>
              <Field label="ละติจูด (lat)"><input type="number" step="0.0001" className={cx} value={p.lat ?? ""} onChange={(e) => set({ lat: numOrUndef(e.target.value) })} /></Field>
              <Field label="ลองจิจูด (lon)"><input type="number" step="0.0001" className={cx} value={p.lon ?? ""} onChange={(e) => set({ lon: numOrUndef(e.target.value) })} /></Field>
            </Row>
          </>
        )}

        {p.category === "news" && (
          <>
            <Field label="เดือน (เช่น ต.ค.)"><input className={cx} value={p.month ?? ""} onChange={(e) => set({ month: e.target.value || undefined })} /></Field>
            <LocRow label="ช่วงเวลา" v={locVal("timeframe")} onChange={(timeframe) => set({ timeframe })} />
            <LocRow label="สภาพอากาศ" v={locVal("weather")} onChange={(weather) => set({ weather })} />
          </>
        )}
      </Section>

      <div className="sticky bottom-0 flex gap-2 border-t border-line bg-cream/95 py-3 backdrop-blur">
        <button onClick={submit} className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-cream hover:bg-navy-600">
          {isEdit ? "บันทึกการแก้ไข" : "เพิ่มโพสต์"}
        </button>
        <button onClick={() => router.push("/admin/posts")} className="rounded-full border border-navy px-6 py-2.5 text-sm text-navy">
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <h2 className="mb-3 font-semibold text-navy">{title}</h2>
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

function LocRow({
  label,
  v,
  onChange,
}: {
  label: string;
  v: { th: string; en: string };
  onChange: (val: { th: string; en: string }) => void;
}) {
  return (
    <Row>
      <Field label={`${label} (ไทย)`}><input className={cx} value={v.th} onChange={(e) => onChange({ ...v, th: e.target.value })} /></Field>
      <Field label={`${label} (อังกฤษ)`}><input className={cx} value={v.en} onChange={(e) => onChange({ ...v, en: e.target.value })} /></Field>
    </Row>
  );
}
