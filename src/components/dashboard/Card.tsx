export default function Card({
  title,
  icon,
  children,
  action,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="anim-rise rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-semibold text-navy">
          <i className={`ti ${icon} text-lg text-gold`} aria-hidden />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
