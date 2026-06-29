"use client";

import { use } from "react";
import Link from "next/link";
import BusinessForm from "@/components/admin/BusinessForm";
import { useDataStore } from "@/lib/DataStore";

export default function EditBusiness({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getBusiness, hydrated } = useDataStore();
  const biz = getBusiness(id);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/businesses" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">แก้ไขผู้ประกอบการ</h1>
      {biz ? <BusinessForm initial={biz} /> : <p className="text-sm text-muted">{hydrated ? "ไม่พบข้อมูล" : "…"}</p>}
    </div>
  );
}
