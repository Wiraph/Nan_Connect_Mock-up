"use client";

import { use } from "react";
import Link from "next/link";
import PlaceForm from "@/components/admin/PlaceForm";
import { useDataStore } from "@/lib/DataStore";

export default function EditPlace({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getPlace, hydrated } = useDataStore();
  const place = getPlace(id);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/places" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">แก้ไขสถานที่</h1>
      {place ? (
        <PlaceForm initial={place} />
      ) : (
        <p className="text-sm text-muted">{hydrated ? "ไม่พบสถานที่นี้" : "…"}</p>
      )}
    </div>
  );
}
