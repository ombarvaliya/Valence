'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';

// Define the structure for a message in the chat
interface Message {
  text: string;
  isUser: boolean;
}

const defaultQuestions = [
  "How do I add an asset?",
  "What do the different colors on the map mean?",
  "What is the Dashboard page for?",
  "How do I filter my assets?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([{ text: "Hello! I am the Valence AI Assistant. How can I help you today?", isUser: false }]);
        setIsLoading(false);
      }, 500);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { text: messageText, isUser: true };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText, history: newMessages }),
        });
        const result = await response.json();
        
        const aiMessage: Message = { 
            text: result.data || "Sorry, I encountered an issue. Please try again.", 
            isUser: false 
        };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        const errorMessage: Message = { text: "I'm having trouble connecting. Please check your internet connection.", isUser: false };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  const handleDefaultQuestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* The floating button to open the chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-[url('/bgImg.png')] text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Open help chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/10 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div 
            className="w-full max-w-2xl h-[80vh] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col"
          >
            <header className="bg-gray-800 text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0">
                <div>
                    <h3 className="text-xl font-bold">Valence Help Assistant</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>
            
            <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            {!msg.isUser && 
                                <div className="w-8 h-8 rounded-full bg-[#406D32] flex-shrink-0 flex items-center justify-center font-bold text-white">V</div>
                            }
                            <div className={`max-w-md px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-[#406D32] text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center font-bold text-white">V</div>
                            <div className="max-w-md px-4 py-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                               <div className="flex items-center space-x-2">
                                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                               </div>
                            </div>
                        </div>
                     )}
                    <div ref={messagesEndRef} />
                </div>
                {messages.length === 1 && !isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                        {defaultQuestions.map((q, i) => (
                            <button key={i} onClick={() => handleDefaultQuestionClick(q)} className="p-3 bg-white border border-gray-200 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-100 hover:border-green-400 transition-colors">
                                {q}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t bg-gradient-to-tl from-gray-700 to-gray-400 rounded-b-2xl flex-shrink-0">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Valence or anything else..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-green-500"
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="bg-[#406D32] text-white p-3 rounded-full hover:bg-[#406D32]/60 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}