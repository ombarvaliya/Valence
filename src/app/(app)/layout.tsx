import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot"; // 1. Import the new component

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // We use a relative container to position the chatbot correctly
    <div className="flex flex-col h-screen bg-white">
      <div className="sticky top-0 z-50 bg-transparent">
        <Header/>
      </div>
      <main className="flex-grow relative bg-gray-200">
        {children}
      </main>
      <Chatbot /> {/* 2. Add the chatbot component here */}
    </div>
  )
}