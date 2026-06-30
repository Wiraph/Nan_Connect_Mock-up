"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/adminAuth";
import { useDataStore } from "@/lib/DataStore";
import { usePostStore } from "@/lib/PostStore";

const tabs = [
  { href: "/admin", icon: "ti-layout-dashboard", label: "ภาพรวม" },
  { href: "/admin/places", icon: "ti-map-pin", label: "สถานที่" },
  { href: "/admin/posts", icon: "ti-article", label: "โพสต์" },
  { href: "/admin/businesses", icon: "ti-building-store", label: "ผู้ประกอบการ" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const { resetAll } = useDataStore();
  const { resetPosts } = usePostStore();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-navy text-cream">
      <div className="lanna-strip h-2.5 bg-navy" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <i className="ti ti-shield-cog text-xl text-gold" aria-hidden />
          <div className="leading-tight">
            <div className="font-lanna text-lg">Nan Connect</div>
            <div className="text-[11px] text-cream/70">ระบบจัดการข้อมูล (หลังบ้าน)</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden rounded-full bg-navy-600 px-3 py-1.5 text-xs hover:bg-navy-300/40 sm:block">
            ดูเว็บจริง
          </Link>
          <span className="hidden text-xs text-cream/70 sm:inline">
            {user?.role === "admin" ? "ผู้ดูแล" : "ผู้ประกอบการ"} · {user?.name}
          </span>
          <button onClick={logout} className="rounded-full bg-navy-600 px-3 py-1.5 text-xs hover:bg-navy-300/40">
            ออก
          </button>
        </div>
      </div>
      <div className="lanna-subnav-surface border-t border-gold/20 shadow-inner shadow-navy/20">
      <nav className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-2 sm:px-6">
        {tabs.map((tb) => {
          const active = tb.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tb.href);
          return (
            <Link
              key={tb.href}
              href={tb.href}
              className={`lanna-subnav-link flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm transition ${
                active
                  ? "border-gold bg-gold/10 text-cream"
                  : "border-transparent text-cream/60 hover:bg-navy-600/35 hover:text-cream"
              }`}
            >
              <i className={`ti ${tb.icon} text-base`} aria-hidden />
              {tb.label}
            </Link>
          );
        })}
        <button
          onClick={() => {
            if (confirm("รีเซ็ตข้อมูลที่เพิ่ม/แก้ทั้งหมด กลับเป็นค่าตั้งต้น?")) { resetAll(); resetPosts(); }
          }}
          className="lanna-subnav-link ml-auto flex shrink-0 items-center gap-1 px-3 py-2.5 text-xs text-cream/60 hover:bg-navy-600/35 hover:text-cream"
        >
          <i className="ti ti-refresh text-sm" aria-hidden /> รีเซ็ต
        </button>
      </nav>
      </div>
    </header>
  );
}
