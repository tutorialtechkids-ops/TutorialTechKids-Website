import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ChatWidget() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // Welcome message
    setMessages(prev => [
      ...prev,
      { from: 'bot', text: language === 'es' ? 'Hola 👋 Soy el asistente automático. ¿En qué te puedo ayudar hoy?' : 'Hi 👋 I am the automated assistant. How can I help you today?' }
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');

    // Simple canned responses
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = language === 'es' ? 'Gracias por tu mensaje. Te responderemos pronto.' : 'Thanks for your message. We will get back to you soon.';

      if (lower.includes('urgent') || lower.includes('urgente')) {
        reply = language === 'es' ? 'Si tu consulta es urgente, por favor utiliza el correo en la página de contacto para atención prioritaria.' : 'If your inquiry is urgent, please use the email on the contact page for priority support.';
      }

      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 700);
  };

  return (
    <div>
      {/* Floating button */}
      <div className={`fixed right-6 bottom-6 z-50`}>
        {open ? (
          <div className="w-80 max-w-sm bg-white border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-primary/5">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm font-medium">{language === 'es' ? 'Asistente' : 'Assistant'}</div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={messagesRef} className="p-3 flex-1 h-48 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-full ${m.from === 'bot' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block px-3 py-2 rounded-xl ${m.from === 'bot' ? 'bg-muted/50 text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t border-border bg-white">
              <div className="flex items-center space-x-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { sendMessage(input); } }}
                  placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
                  className="flex-1 px-3 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary"
                />
                <button onClick={() => sendMessage(input)} className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-3 py-2 rounded-xl">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className="bg-primary shadow-lg p-3 rounded-full text-white flex items-center justify-center hover:scale-105">
            <MessageCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
