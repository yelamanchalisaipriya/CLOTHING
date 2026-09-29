import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, COUPONS } from '../data/products';

const N8N_WEBHOOK_URL = 'https://yelamanchalisaipriya.app.n8n.cloud/webhook/f8370c1d-c525-4364-94c2-d24adc3d4511/chat';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  source?: 'n8n' | 'atelier-ai';
}

export const N8nChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('velora_n8n_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Greetings. Welcome to VÉLORA ATELIER.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'atelier-ai'
      },
      {
        id: 'welcome-2',
        sender: 'bot',
        text: 'I am your Atelier AI Concierge, powered by your n8n workflow. How may I assist you with garment sizing, fabric composition, personal styling, or order tracking today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'atelier-ai'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('velora_n8n_session_id');
      if (stored) return stored;
      const gen = 'velora_session_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('velora_n8n_session_id', gen);
      return gen;
    } catch {
      return 'velora_session_1';
    }
  });

  const [webhookStatus, setWebhookStatus] = useState<'connected' | 'checking' | 'active'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('velora_n8n_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Global listener for triggers from any page button (e.g., Contact page, PDP "Consult AI Stylist")
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-n8n-chat', handleOpenChat);
    return () => window.removeEventListener('open-n8n-chat', handleOpenChat);
  }, []);

  // Built-in intelligent fallback in case n8n workflow is paused or returns 500 Error in workflow
  const getAtelierKnowledgeResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 1. Sizing inquiries
    if (q.includes('size') || q.includes('fitting') || q.includes('measurement') || q.includes('chart')) {
      return (
        "Here is our standard Atelier Sizing Guide (measurements in inches):\n\n" +
        "• XS (34): Chest 33-35\" · Waist 26-28\" · Hip 35-37\"\n" +
        "• S (36): Chest 36-38\" · Waist 29-31\" · Hip 38-40\"\n" +
        "• M (38): Chest 39-41\" · Waist 32-34\" · Hip 41-43\"\n" +
        "• L (40): Chest 42-44\" · Waist 35-37\" · Hip 44-46\"\n" +
        "• XL (42): Chest 45-47\" · Waist 38-40\" · Hip 47-49\"\n\n" +
        "Most of our linen and poplin shirts feature a relaxed silhouette. If you prefer a tailored slim profile, we recommend sizing down one size."
      );
    }

    // 2. Shipping & Delivery
    if (q.includes('shipping') || q.includes('delivery') || q.includes('track') || q.includes('time') || q.includes('how long')) {
      return (
        "Shipping & Delivery details:\n\n" +
        "• Complimentary Delivery: Free express shipping on all orders over ₹1,999 (₹149 for smaller orders).\n" +
        "• Metro Cities (Bengaluru, Mumbai, Delhi, Chennai, Hyderabad): 2 to 3 business days.\n" +
        "• Rest of India: 3 to 5 business days.\n" +
        "• Dispatched within 24 hours from our Mumbai and Bengaluru atelier facilities with live SMS/email tracking."
      );
    }

    // 3. Returns & Exchange
    if (q.includes('return') || q.includes('exchange') || q.includes('refund') || q.includes('cancel')) {
      return (
        "Returns & Exchanges Policy:\n\n" +
        "• 7-day effortless reverse doorstep pickup across India.\n" +
        "• Garments must be unworn, unwashed, with original atelier tags intact.\n" +
        "• Once picked up, you can choose an instant size exchange or a 100% full refund to your original payment method or UPI."
      );
    }

    // 4. Coupons & Offers
    if (q.includes('coupon') || q.includes('voucher') || q.includes('discount') || q.includes('offer') || q.includes('promo') || q.includes('code')) {
      return (
        "Active Atelier Privileges & Voucher Codes:\n\n" +
        "• VELORA10 — 10% off orders exceeding ₹1,500\n" +
        "• FIRSTBUY — Flat ₹500 discount on your inaugural order over ₹2,500\n" +
        "• ATELIER20 — 20% off luxury orders above ₹5,000\n\n" +
        "You can apply these directly in your Shopping Bag or at Checkout!"
      );
    }

    // 5. Specific garment inquiries
    if (q.includes('linen') || q.includes('shirt')) {
      const p = PRODUCTS.find((x) => x.id === 'prod-m-01');
      return `Our flagship ${p?.name} (₹${p?.price.toLocaleString('en-IN')}) is crafted from 100% certified Normandy flax linen with natural horn/mother-of-pearl buttons. It is pre-washed for incredible softness and drapes effortlessly with a band collar.`;
    }

    if (q.includes('silk') || q.includes('dress') || q.includes('evening')) {
      const p = PRODUCTS.find((x) => x.id === 'prod-w-01');
      return `For evening elegance, we recommend our ${p?.name} (₹${p?.price.toLocaleString('en-IN')}). Cut on the bias from 100% Grade 6A Mulberry silk (19 momme) in Bengaluru, it falls gracefully around the mid-calf with an asymmetric cowl drape.`;
    }

    if (q.includes('cashmere') || q.includes('winter') || q.includes('sweater') || q.includes('knit')) {
      const p = PRODUCTS.find((x) => x.id === 'prod-w-07');
      return `Our ${p?.name} (₹${p?.price.toLocaleString('en-IN')}) features pure 2-ply Grade-A Mongolian cashmere, spun and hand-knit in Himachal Pradesh for cloud-like lightweight insulation.`;
    }

    if (q.includes('denim') || q.includes('jeans')) {
      return "We use 13oz shuttle-loomed Japanese Kurabo selvedge denim, finished with vegetable-tanned leather patches and antique copper rivets for exceptional durability and personalized fading.";
    }

    if (q.includes('contact') || q.includes('human') || q.includes('phone') || q.includes('store') || q.includes('location') || q.includes('bengaluru') || q.includes('mumbai')) {
      return (
        "Direct Atelier Concierge & Boutiques:\n\n" +
        "• Phone: +91 (80) 4912 3456 (Mon–Sat, 10am–8pm IST)\n" +
        "• WhatsApp Line: +91 98450 12345\n" +
        "• Email: concierge@veloraatelier.com\n" +
        "• Bengaluru Flagship: 12th Main Road, HAL 2nd Stage, Indiranagar\n" +
        "• Mumbai Heritage Store: Ropewalk Lane, Kala Ghoda, Fort"
      );
    }

    // Default general styling advisor response
    return (
      "Thank you for contacting VÉLORA ATELIER. We curate ready-to-wear silhouettes crafted from pure Mulberry silk, Normandy linen, and organic cotton for Men, Women, and Kids.\n\n" +
      "You can ask me about:\n" +
      "1. Garment recommendations by occasion\n" +
      "2. Sizing and measurements\n" +
      "3. Active voucher codes (e.g. VELORA10)\n" +
      "4. Shipping, returns, and order dispatch"
    );
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the user's specified n8n Webhook
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: messageContent,
          sessionId: sessionId,
          metadata: {
            brand: 'VELORA ATELIER',
            timestamp: new Date().toISOString()
          }
        })
      });

      let botText = '';

      if (response.ok) {
        const data = await response.json();
        if (typeof data === 'string') {
          botText = data;
        } else if (data && typeof data === 'object') {
          botText =
            data.output ||
            data.text ||
            data.message ||
            data.response ||
            (Array.isArray(data) && data[0]?.text) ||
            (Array.isArray(data) && data[0]?.output) ||
            JSON.stringify(data);
        }
      }

      // If n8n workflow returned an error (e.g. "Error in workflow" or 500),
      // we gracefully fall back to the brand intelligence knowledge base
      if (!botText || botText.toLowerCase().includes('error in workflow')) {
        botText = getAtelierKnowledgeResponse(messageContent);
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.ok && !botText.includes('VÉLORA ATELIER') ? 'n8n' : 'atelier-ai'
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('n8n webhook network exception, falling back to local engine:', err);
      const fallbackResponse = getAtelierKnowledgeResponse(messageContent);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'atelier-ai'
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const newSession = 'velora_session_' + Math.random().toString(36).substring(2, 10);
    setSessionId(newSession);
    try {
      localStorage.setItem('velora_n8n_session_id', newSession);
      localStorage.removeItem('velora_n8n_chat_messages');
    } catch {
      // ignore
    }
    setMessages([
      {
        id: 'welcome-reset-1',
        sender: 'bot',
        text: 'Session reset. Greetings! Welcome back to VÉLORA ATELIER.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'atelier-ai'
      },
      {
        id: 'welcome-reset-2',
        sender: 'bot',
        text: 'How can I assist your wardrobe selections today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'atelier-ai'
      }
    ]);
  };

  const quickPrompts = [
    'Recommend an evening dress',
    'How does the French Linen shirt fit?',
    'What are the active discount codes?',
    'Shipping & delivery times',
    'Return and exchange policy'
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open n8n AI Chatbot"
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-4 sm:py-3.5 bg-[#171717] hover:bg-[#9B7E51] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 border border-white/20 group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#171717]" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              n8n AI Stylist
            </span>
            <span className="text-[10px] text-[#D8B984] font-medium leading-none">
              Online · Concierge
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[600px] max-h-[88vh] bg-[#FAF9F5] border border-[#EBE8DF] rounded-xs shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#171717] text-white flex items-center justify-between border-b border-[#2B2B2B]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#262626] border border-[#444] flex items-center justify-center text-[#D8B984]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-white">
                    VÉLORA ATELIER
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#A8A49B]">
                  <Zap className="w-3 h-3 text-[#D8B984]" />
                  <span>n8n Chatbot Webhook Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Restart conversation"
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

          {/* Webhook Status Banner */}
          <div className="bg-[#242424] text-[10px] text-[#D8B984] px-4 py-1.5 flex items-center justify-between border-b border-[#333]">
            <span className="truncate pr-2">Webhook: yelamanchalisaipriya.app.n8n.cloud</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              Ready
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F5]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#EAE7DE] flex items-center justify-center text-[#171717] shrink-0 mt-0.5 border border-[#DDD9CE]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9B7E51]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-xs text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-white border border-[#EBE8DF] text-[#171717] shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-black/5">
                    <span
                      className={`text-[9px] ${
                        m.sender === 'user' ? 'text-white/60' : 'text-[#8E8B82]'
                      }`}
                    >
                      {m.time}
                    </span>
                    {m.sender === 'bot' && m.source && (
                      <span className="text-[9px] uppercase tracking-wider text-[#9B7E51] font-medium">
                        {m.source === 'n8n' ? 'n8n Agent' : 'Atelier AI'}
                      </span>
                    )}
                  </div>
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
                  <span className="text-[11px] text-[#6E6D6A] mr-1 font-medium">n8n is thinking</span>
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#9B7E51] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 border-t border-[#EBE8DF] bg-[#F4F2EC] overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 bg-white border border-[#E5E2D9] hover:border-[#171717] text-[11px] text-[#54524D] hover:text-[#171717] rounded-xs transition-colors shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
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
              placeholder="Ask n8n AI about sizes, fabrics, styling..."
              disabled={isLoading}
              className="flex-1 bg-[#FAF9F5] border border-[#E5E2D9] focus:border-[#171717] px-3 py-2 text-xs text-[#171717] outline-hidden placeholder:text-[#8E8B82] rounded-xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message to n8n"
              className="p-2.5 bg-[#171717] hover:bg-[#9B7E51] disabled:bg-[#D4D0C5] text-white rounded-xs transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
