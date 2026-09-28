import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw } from 'lucide-react';

const WEBHOOK_URL = 'https://yelamanchalisaipriya.app.n8n.cloud/webhook/f8370c1d-c525-4364-94c2-d24adc3d4511/chat';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const N8nChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('velora_n8n_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg-welcome-1',
        sender: 'bot',
        text: 'Greetings. Welcome to VÉLORA ATELIER.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'msg-welcome-2',
        sender: 'bot',
        text: 'I am your Atelier AI Stylist & Concierge. How may I assist you with our garments, sizing recommendations, fabric care, or order tracking today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem('velora_n8n_session_id');
      if (existing) return existing;
      const created = 'velora_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('velora_n8n_session_id', created);
      return created;
    } catch {
      return 'velora_session_' + Date.now();
    }
  });

  const [officialLoaded, setOfficialLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync chat history
  useEffect(() => {
    try {
      localStorage.setItem('velora_n8n_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Listen for custom trigger from any button across the store (e.g. Contact, PDP)
  useEffect(() => {
    const handleOpenChat = () => {
      // If official n8n widget exists in DOM, click its toggle
      const officialToggle = document.querySelector('.chat-toggle, .n8n-chat-widget-toggle') as HTMLElement;
      if (officialToggle) {
        officialToggle.click();
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('open-n8n-chat', handleOpenChat);
    return () => window.removeEventListener('open-n8n-chat', handleOpenChat);
  }, []);

  // Attempt to load official @n8n/chat bundle
  useEffect(() => {
    let active = true;

    const tryLoadOfficialChat = async () => {
      try {
        const importModule = new Function('url', 'return import(url)');
        const module = await importModule('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        const createChat = module.createChat;
        if (!active || typeof createChat !== 'function') return;

        createChat({
          webhookUrl: WEBHOOK_URL,
          showWelcomeScreen: true,
          defaultLanguage: 'en',
          initialMessages: [
            'Greetings! Welcome to VÉLORA ATELIER.',
            'I am your Atelier AI Stylist. Ask me about sizing, garment fabrics, styling advice, or order inquiries.'
          ],
          i18n: {
            en: {
              title: 'VÉLORA Atelier Stylist',
              subtitle: 'AI Concierge · Online',
              footer: '',
              getStarted: 'Start Consultation',
              inputPlaceholder: 'Ask our concierge anything...'
            }
          }
        });
        setOfficialLoaded(true);
      } catch (e) {
        // Fallback to custom luxury React chat widget
        setOfficialLoaded(false);
      }
    };

    tryLoadOfficialChat();

    return () => {
      active = false;
    };
  }, []);

  // Send message to n8n webhook
  const handleSendMessage = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: textToSend.trim(),
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      let botResponseText = '';

      if (typeof data === 'string') {
        botResponseText = data;
      } else if (data && typeof data === 'object') {
        botResponseText =
          data.output ||
          data.text ||
          data.message ||
          data.response ||
          (Array.isArray(data) && data[0]?.text) ||
          (Array.isArray(data) && data[0]?.output) ||
          JSON.stringify(data);
      } else {
        botResponseText = 'Thank you for your inquiry. Our atelier team will get back to you shortly.';
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.warn('n8n webhook error:', err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'bot',
        text: "I received your request! If you need immediate assistance with orders or custom fittings, you can also reach our atelier concierge directly on WhatsApp (+91 98450 12345) or phone (+91 80 4912 3456).",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const newSession = 'velora_' + Math.random().toString(36).substring(2, 11);
    setSessionId(newSession);
    try {
      localStorage.setItem('velora_n8n_session_id', newSession);
      localStorage.removeItem('velora_n8n_chat_history');
    } catch {
      // ignore
    }
    setMessages([
      {
        id: 'msg-welcome-1',
        sender: 'bot',
        text: 'Greetings. Welcome to VÉLORA ATELIER.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'msg-welcome-2',
        sender: 'bot',
        text: 'How may I assist you with our garments, sizing recommendations, or order inquiries today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    'Recommend women’s evening wear',
    'How does Normandy linen fit?',
    'What is your return policy?',
    'Current voucher codes'
  ];

  // If official n8n chat widget successfully injected its launcher into the document,
  // we do not render duplicate launcher unless opened programmatically.
  if (officialLoaded) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Concierge Chat"
          className="fixed bottom-6 right-6 z-40 p-4 bg-[#171717] hover:bg-[#9B7E51] text-[#FAF9F5] rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2.5 group border border-white/20"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#171717]" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider pr-1">
            Stylist Concierge
          </span>
        </button>
      )}

      {/* Bespoke Atelier AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] h-[580px] max-h-[85vh] bg-[#FAF9F5] border border-[#EBE8DF] rounded-xs shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#171717] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#292929] border border-[#444] flex items-center justify-center text-[#D8B984]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-white">
                    VÉLORA ATELIER
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-[#A8A49B]">Virtual AI Stylist · Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 text-[#A8A49B] hover:text-white rounded-xs hover:bg-[#2B2B2B] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="p-1.5 text-[#A8A49B] hover:text-white rounded-xs hover:bg-[#2B2B2B] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 divide-y-0">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#EAE7DE] flex items-center justify-center text-[#171717] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9B7E51]" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] p-3 rounded-xs text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-white border border-[#EBE8DF] text-[#171717] shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`text-[9px] block mt-1 ${
                      m.sender === 'user' ? 'text-white/60 text-right' : 'text-[#8E8B82]'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center text-xs text-[#8E8B82] pt-1">
                <div className="w-7 h-7 rounded-full bg-[#EAE7DE] flex items-center justify-center text-[#9B7E51] shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-[#EBE8DF] px-3.5 py-2.5 rounded-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 border-t border-[#EBE8DF] bg-[#FAF9F5] overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                type="button"
                onClick={() => handleSendMessage(qp)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 bg-white border border-[#E5E2D9] hover:border-[#171717] text-[11px] text-[#54524D] hover:text-[#171717] rounded-xs transition-colors shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#EBE8DF] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about garments, fits, fabrics..."
              disabled={isLoading}
              className="flex-1 bg-[#FAF9F5] border border-[#E5E2D9] focus:border-[#171717] px-3 py-2 text-xs text-[#171717] outline-hidden placeholder:text-[#8E8B82] rounded-xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2 bg-[#171717] hover:bg-[#9B7E51] disabled:bg-[#D4D0C5] text-white rounded-xs transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
