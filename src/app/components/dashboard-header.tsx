import { BarChart3 } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Financial Dashboard</h1>
        </div>
      </div>
    </header>
  );
}
