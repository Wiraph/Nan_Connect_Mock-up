"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/lib/DataStore";
import { categories, districts } from "@/lib/data";
import type { Business } from "@/lib/types";

const cx = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy-300";

function emptyBiz(): Business {
  return { id: "", name: "", category: "restaurant", address: "", phone: "", district: "อ.เมืองน่าน", contact: "", facebook: "" };
}

export default function BusinessForm({ initial }: { initial?: Business }) {
  const router = useRouter();
  const { saveBusiness } = useDataStore();
  const [b, setB] = useState<Business>(initial ? { ...initial } : emptyBiz());
  const set = (patch: Partial<Business>) => setB((v) => ({ ...v, ...patch }));

  const submit = () => {
    const id = b.id || `biz-${Date.now()}`;
    saveBusiness({ ...b, id });
    router.push("/admin/businesses");
  };

  return (
    <div className="flex max-w-2xl flex-col gap-3 rounded-2xl border border-line bg-white p-5">
      <Field label="ชื่อสถานประกอบการ"><input className={cx} value={b.name} onChange={(e) => set({ name: e.target.value })} /></Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="หมวด">
          <select className={cx} value={b.category} onChange={(e) => set({ category: e.target.value })}>
            {categories.filter((c) => c.key !== "attraction").map((c) => <option key={c.key} value={c.key}>{c.name.th}</option>)}
          </select>
        </Field>
        <Field label="อำเภอ">
          <select className={cx} value={b.district} onChange={(e) => set({ district: e.target.value })}>
            {districts.map((d) => <option key={d.key} value={`อ.${d.name.th}`}>{d.name.th}</option>)}
          </select>
        </Field>
      </div>
      <Field label="ที่อยู่"><input className={cx} value={b.address} onChange={(e) => set({ address: e.target.value })} /></Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="เบอร์โทร"><input className={cx} value={b.phone} onChange={(e) => set({ phone: e.target.value })} /></Field>
        <Field label="ผู้ติดต่อ"><input className={cx} value={b.contact ?? ""} onChange={(e) => set({ contact: e.target.value })} /></Field>
      </div>
      <Field label="Facebook"><input className={cx} value={b.facebook ?? ""} onChange={(e) => set({ facebook: e.target.value })} /></Field>

      <div className="mt-2 flex gap-2">
        <button onClick={submit} className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-cream hover:bg-navy-600">
          {initial ? "บันทึก" : "เพิ่ม"}
        </button>
        <button onClick={() => router.push("/admin/businesses")} className="rounded-full border border-navy px-6 py-2.5 text-sm text-navy">
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-navy">{label}</span>
      {children}
    </label>
  );
}
