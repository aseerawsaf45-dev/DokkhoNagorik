import { DashboardSidebar } from "@/components/shared/DashboardSidebar";

export default function EarnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      <DashboardSidebar role="earner" />
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
