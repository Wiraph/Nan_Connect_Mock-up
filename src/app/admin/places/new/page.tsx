"use client";

import Link from "next/link";
import PlaceForm from "@/components/admin/PlaceForm";

export default function NewPlace() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/places" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">เพิ่มสถานที่ท่องเที่ยว</h1>
      <PlaceForm />
    </div>
  );
}
