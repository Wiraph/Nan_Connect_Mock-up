"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDataStore } from "@/lib/DataStore";
import { getCategory } from "@/lib/data";

export default function AdminBusinesses() {
  const { businesses, deleteBusiness } = useDataStore();
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(30);

  const filtered = useMemo(
    () => businesses.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()) || b.district.includes(q)),
    [businesses, q]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">ผู้ประกอบการ ({businesses.length})</h1>
        <Link href="/admin/businesses/new" className="flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream hover:bg-navy-600">
          <i className="ti ti-plus" aria-hidden /> เพิ่ม
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
        <i className="ti ti-search text-muted" aria-hidden />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาชื่อ/อำเภอ" className="flex-1 bg-transparent text-sm outline-none" />
      </div>

      <div className="flex flex-col gap-2">
        {filtered.slice(0, limit).map((b) => (
          <div key={b.id} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
            <i className={`ti ${getCategory(b.category)?.icon ?? "ti-building-store"} text-xl text-navy`} aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-navy">{b.name}</div>
              <div className="truncate text-[11px] text-muted">{getCategory(b.category)?.name.th} · {b.district}</div>
            </div>
            <Link href={`/admin/businesses/${b.id}/edit`} className="rounded-full border border-line px-3 py-1.5 text-xs text-navy hover:border-navy-300">แก้ไข</Link>
            <button onClick={() => { if (confirm(`ลบ "${b.name}"?`)) deleteBusiness(b.id); }} className="rounded-full border border-line px-3 py-1.5 text-xs text-[#993c1d]">ลบ</button>
          </div>
        ))}
      </div>
      {filtered.length > limit && (
        <button onClick={() => setLimit((l) => l + 30)} className="rounded-full border border-navy py-2.5 text-sm text-navy">
          แสดงเพิ่ม ({filtered.length - limit})
        </button>
      )}
    </div>
  );
}
