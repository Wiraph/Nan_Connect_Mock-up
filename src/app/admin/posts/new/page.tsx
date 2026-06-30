"use client";

import Link from "next/link";
import PostForm from "@/components/admin/PostForm";

export default function NewPost() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/posts" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">เพิ่มโพสต์</h1>
      <PostForm />
    </div>
  );
}
