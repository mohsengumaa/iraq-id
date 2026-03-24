import { ResidentBottomNav } from "@/components/resident/resident-bottom-nav";
import { ResidentHeader } from "@/components/resident/resident-header";

export default async function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col bg-[var(--rm-surface)] pb-24 md:max-w-3xl">
      <ResidentHeader />
      <main className="flex-1 px-4 py-4">{children}</main>
      <ResidentBottomNav />
    </div>
  );
}
