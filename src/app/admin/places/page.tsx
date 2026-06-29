"use client";

import Link from "next/link";
import { useDataStore } from "@/lib/DataStore";
import { places as seedPlaces } from "@/lib/data";

const seedIds = new Set(seedPlaces.map((p) => p.id));

export default function AdminPlaces() {
  const { places, deletePlace } = useDataStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">สถานที่ท่องเที่ยว ({places.length})</h1>
        <Link href="/admin/places/new" className="flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream hover:bg-navy-600">
          <i className="ti ti-plus" aria-hidden /> เพิ่มสถานที่
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {places.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
            <i className={`ti ${p.icon} text-xl text-navy`} aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium text-navy">{p.name.th}</span>
                {!seedIds.has(p.id) && (
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] text-gold-700">เพิ่มโดยชุมชน</span>
                )}
              </div>
              <div className="truncate text-[11px] text-muted">{p.district} · {p.name.en}</div>
            </div>
            <Link href={`/admin/places/${p.id}/edit`} className="rounded-full border border-line px-3 py-1.5 text-xs text-navy hover:border-navy-300">
              แก้ไข
            </Link>
            <button
              onClick={() => { if (confirm(`ลบ "${p.name.th}"?`)) deletePlace(p.id); }}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-[#993c1d] hover:border-[#993c1d]"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
