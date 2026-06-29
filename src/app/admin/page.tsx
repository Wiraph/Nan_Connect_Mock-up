"use client";

import Link from "next/link";
import { useDataStore } from "@/lib/DataStore";
import { categories } from "@/lib/data";

export default function AdminDashboard() {
  const { places, businesses } = useDataStore();

  const byCategory = categories.map((c) => ({
    ...c,
    count:
      c.key === "attraction"
        ? places.length
        : businesses.filter((b) => b.category === c.key).length,
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-navy p-5 text-cream">
        <h1 className="font-lanna text-2xl">ระบบจัดการข้อมูลการท่องเที่ยว</h1>
        <p className="mt-1 text-sm text-cream/75">
          เพิ่ม/แก้ไขข้อมูลสถานที่และผู้ประกอบการ — ข้อมูลจะแสดงบนเว็บจริงทันที
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat icon="ti-map-pin" label="สถานที่ (POI)" value={places.length} href="/admin/places" />
        <Stat icon="ti-building-store" label="ผู้ประกอบการ" value={businesses.length} href="/admin/businesses" />
        <Stat icon="ti-category" label="หมวดหมู่" value={categories.length} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-navy">
            <i className="ti ti-chart-bar text-gold" aria-hidden /> จำนวนตามหมวด
          </h2>
          <div className="flex flex-col gap-1.5">
            {byCategory.map((c) => (
              <div key={c.key} className="flex items-center gap-2 border-b border-line py-1.5 text-sm last:border-0">
                <i className={`ti ${c.icon} text-navy-300`} aria-hidden />
                <span className="flex-1 text-ink">{c.name.th}</span>
                <span className="font-medium text-navy">{c.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-navy">
            <i className="ti ti-plus text-gold" aria-hidden /> เพิ่มข้อมูลใหม่
          </h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/places/new" className="flex items-center gap-2 rounded-xl border border-line p-3 text-sm text-navy hover:border-navy-300">
              <i className="ti ti-map-pin-plus text-lg text-gold" aria-hidden />
              เพิ่มสถานที่ท่องเที่ยว (5 หมวดข้อมูล)
            </Link>
            <Link href="/admin/businesses/new" className="flex items-center gap-2 rounded-xl border border-line p-3 text-sm text-navy hover:border-navy-300">
              <i className="ti ti-building-store text-lg text-gold" aria-hidden />
              เพิ่มผู้ประกอบการ / ร้านค้า
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, href }: { icon: string; label: string; value: number; href?: string }) {
  const body = (
    <div className="rounded-2xl border border-line bg-white p-4">
      <i className={`ti ${icon} text-lg text-navy-300`} aria-hidden />
      <div className="mt-2 text-2xl font-bold text-navy">{value}</div>
      <div className="text-[12px] text-muted">{label}</div>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
