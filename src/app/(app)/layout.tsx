import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot"; 

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="sticky top-0 z-50 bg-transparent">
        <Header/>
      </div>
      <main className="flex-grow relative bg-gray-200">
        {children}
      </main>
      <Chatbot /> 
    </div>
  )
}