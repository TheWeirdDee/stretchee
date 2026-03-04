import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-black font-sans selection:bg-[#1A3626] selection:text-white">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile nav placeholder - will add a sliding menu layer later if needed */}
    </div>
  );
}
