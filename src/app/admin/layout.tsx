"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminAuthProvider, useAdminAuth, type AdminRole } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";

function LoginScreen() {
  const { login } = useAdminAuth();
  const [role, setRole] = useState<AdminRole>("admin");
  const [name, setName] = useState("");

  return (
    <div className="tourist-bg flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
        <div className="lanna-strip h-2.5 bg-navy" />
        <div className="p-6">
          <Link
            href="/"
            aria-label="กลับ"
            className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-navy transition hover:border-gold hover:bg-cream"
          >
            <i className="ti ti-chevron-left text-xl" aria-hidden />
          </Link>
          <div className="mb-1 flex items-center gap-2">
            <i className="ti ti-shield-cog text-2xl text-gold" aria-hidden />
            <span className="font-lanna text-2xl text-navy">Nan Connect</span>
          </div>
          <p className="mb-5 text-sm text-muted">เข้าสู่ระบบจัดการข้อมูล</p>

          <label className="mb-1.5 block text-xs font-medium text-navy">บทบาท</label>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {(
              [
                ["admin", "ผู้ดูแลระบบ", "ti-user-shield"],
                ["operator", "ผู้ประกอบการ", "ti-building-store"],
              ] as const
            ).map(([r, label, icon]) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm transition ${
                  role === r
                    ? "border-gold bg-gold/10 text-navy"
                    : "border-line text-muted hover:border-navy-300"
                }`}
              >
                <i className={`ti ${icon} text-xl`} aria-hidden />
                {label}
              </button>
            ))}
          </div>

          <label className="mb-1.5 block text-xs font-medium text-navy">ชื่อผู้ใช้</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น ชุมชนสะปัน"
            className="mb-4 w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-sm outline-none focus:border-navy-300"
          />

          <button
            onClick={() => login({ role, name: name.trim() || "ผู้ใช้" })}
            className="w-full rounded-full bg-navy py-2.5 text-sm font-medium text-cream transition hover:bg-navy-600"
          >
            เข้าสู่ระบบ
          </button>
          <p className="mt-3 text-center text-[11px] text-muted">
            * ไม่มีรหัสผ่านจริง ข้อมูลเก็บในเบราว์เซอร์
          </p>
        </div>
      </div>
    </div>
  );
}

function Gate({ children }: { children: React.ReactNode }) {
  const { ready, user } = useAdminAuth();
  if (!ready) return <div className="p-10 text-center text-muted">…</div>;
  if (!user) return <LoginScreen />;
  return (
    <div className="min-h-dvh bg-cream">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Gate>{children}</Gate>
    </AdminAuthProvider>
  );
}
