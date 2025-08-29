import Header from "@/components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Ensure the root of the protected app takes full screen height
    <div className="flex flex-col h-screen">
      <Header />
      {/* Ensure the main content area grows and allows its children to have height */}
      <main className="flex-grow relative bg-gray-200">
        {children}
      </main>
    </div>
  )
}