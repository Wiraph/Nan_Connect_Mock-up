"use client";

import { use } from "react";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { usePostStore } from "@/lib/PostStore";

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getPost, hydrated } = usePostStore();
  const post = getPost(id);

  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/posts" className="flex w-fit items-center gap-1 text-sm text-navy">
        <i className="ti ti-chevron-left" aria-hidden /> กลับ
      </Link>
      <h1 className="text-xl font-bold text-navy">แก้ไขโพสต์</h1>
      {post ? (
        <PostForm initial={post} />
      ) : (
        <p className="text-sm text-muted">{hydrated ? "ไม่พบโพสต์นี้" : "…"}</p>
      )}
    </div>
  );
}
