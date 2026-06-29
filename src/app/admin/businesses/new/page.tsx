"use client";

import Link from "next/link";
import BusinessForm from "@/components/admin/BusinessForm";

export default function NewBusiness() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/businesses" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">เพิ่มผู้ประกอบการ</h1>
      <BusinessForm />
    </div>
  );
}
