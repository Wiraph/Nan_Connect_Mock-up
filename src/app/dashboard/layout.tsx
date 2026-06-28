import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-cream">
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">{children}</main>
    </div>
  );
}
