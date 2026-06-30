"use client";

import { useState } from "react";
import Link from "next/link";
import { usePostStore } from "@/lib/PostStore";
import { seedPosts, POST_CATEGORIES, POST_CATEGORY_META, PostCategory } from "@/lib/posts";
import { dict } from "@/i18n/dictionaries";

const seedIds = new Set(seedPosts.map((p) => p.id));
const label = (c: PostCategory) => dict.th[POST_CATEGORY_META[c].labelKey];

export default function AdminPosts() {
  const { posts, deletePost } = usePostStore();
  const [filter, setFilter] = useState<PostCategory | "all">("all");

  const shown = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy">โพสต์ ({posts.length})</h1>
        <Link href="/admin/posts/new" className="flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream hover:bg-navy-600">
          <i className="ti ti-plus" aria-hidden /> เพิ่มโพสต์
        </Link>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${filter === "all" ? "border-navy bg-navy text-cream" : "border-line bg-white text-navy"}`}
        >
          ทั้งหมด
        </button>
        {POST_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium ${filter === c ? "border-navy bg-navy text-cream" : "border-line bg-white text-navy"}`}
          >
            <i className={`ti ${POST_CATEGORY_META[c].icon} text-xs`} aria-hidden /> {label(c)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {shown.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
            <i className={`ti ${POST_CATEGORY_META[p.category].icon} text-xl text-navy`} aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium text-navy">{p.title.th || p.title.en}</span>
                {!seedIds.has(p.id) && (
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] text-gold-700">เพิ่มใหม่</span>
                )}
              </div>
              <div className="truncate text-[11px] text-muted">{label(p.category)} · {p.title.en}</div>
            </div>
            <Link href={`/admin/posts/${p.id}/edit`} className="rounded-full border border-line px-3 py-1.5 text-xs text-navy hover:border-navy-300">
              แก้ไข
            </Link>
            <button
              onClick={() => { if (confirm(`ลบ "${p.title.th || p.title.en}"?`)) deletePost(p.id); }}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-[#993c1d] hover:border-[#993c1d]"
            >
              ลบ
            </button>
          </div>
        ))}
        {shown.length === 0 && <p className="py-8 text-center text-sm text-muted">ไม่มีโพสต์ในหมวดนี้</p>}
      </div>
    </div>
  );
}
