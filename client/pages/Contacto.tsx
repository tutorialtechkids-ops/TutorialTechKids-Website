import { useState, useEffect, useRef } from "react";
import { Send, Bot, X, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Contacto() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizType, setQuizType] = useState<'emoji' | 'math'>('emoji');
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [quizError, setQuizError] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Welcome message added on mount
    setMessages([
      { from: 'bot', text: language === 'es' ? 'Hola 👋 Soy el asistente. Puedes hacerme preguntas sobre nuestros planners, guía de uso o dudas generales.' : 'Hi 👋 I am the assistant. Ask me about planners, usage guides or general questions.' }
    ]);

    // reCAPTCHA callbacks (if the script loads it will call these)
    // Expose callbacks on window for the static g-recaptcha element
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.onRecaptchaSuccess = () => setCaptchaPassed(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.onRecaptchaExpired = () => setCaptchaPassed(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.onRecaptchaError = () => setCaptchaPassed(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (!captchaPassed) {
      setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Por favor, completa la verificación anti-robots antes de chatear. Usa reCAPTCHA o el Quiz anti-robots.' : 'Please complete the anti-robot verification before chatting. Use reCAPTCHA or the Anti-robot quiz.' }]);
      return;
    }

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput("");

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = language === 'es' ? 'Gracias por tu pregunta. Nuestro equipo la responderá pronto.' : 'Thanks for your question. Our team will respond shortly.';

      if (lower.includes('planner') || lower.includes('planificador')) {
        reply = language === 'es' ? 'Puedo ayudarte a personalizar un planner. ¿Qué formato prefieres (GoodNotes, Notability, PDF)?' : 'I can help you customize a planner. Which format do you prefer (GoodNotes, Notability, PDF)?';
      } else if (lower.includes('precio') || lower.includes('price')) {
        reply = language === 'es' ? 'Nuestros planners personalizados suelen costar $10 USD. ¿Quieres que te muestre cómo pagar?' : 'Our customized planners usually cost $10 USD. Would you like instructions on how to pay?';
      } else if (lower.includes('hola') || lower.includes('hello')) {
        reply = language === 'es' ? '¡Hola! ¿En qué puedo ayudarte hoy?' : 'Hello! How can I help you today?';
      }

      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 700);
  };

  const openQuiz = (type: 'emoji' | 'math' = 'emoji') => {
    setQuizType(type);
    setQuizError("");
    if (type === 'math') {
      const a = Math.floor(Math.random() * 12) + 5; // harder numbers
      const b = Math.floor(Math.random() * 12) + 5;
      setQuizQuestion(language === 'es' ? `¿Cuánto es ${a} + ${b}?` : `How much is ${a} + ${b}?`);
      setExpectedAnswer(String(a + b));
      setQuizOptions([]);
      setShowQuiz(true);
    } else {
      // Emoji quiz: create subtle odd-one-out among related emojis
      const categories = {
        fruits: ['🍎','🍐','🍊','🍌','🍇','🍓'],
        vegetables: ['🥕','🥦','🌽','🍆','🥔','🥬'],
        animals: ['🐶','🐱','🐭','🐰','🦊','🐻'],
        transports: ['🚗','🚌','🚲','🏍️','🚀','✈️'],
        faces: ['😀','😅','😂','😊','😉','😍']
      } as const;

      const keys = Object.keys(categories);
      // pick base category and a different category for the odd one
      const baseKey = keys[Math.floor(Math.random() * keys.length)];
      let oddKey = baseKey;
      while (oddKey === baseKey) {
        oddKey = keys[Math.floor(Math.random() * keys.length)];
      }

      const baseArr = (categories as any)[baseKey];
      const oddArr = (categories as any)[oddKey];

      // pick 3 similar from base and 1 odd from oddArr
      const shuffledBase = baseArr.sort(() => 0.5 - Math.random());
      const chosenBase = shuffledBase.slice(0,3);
      const odd = oddArr[Math.floor(Math.random() * oddArr.length)];

      const options = [...chosenBase, odd].sort(() => 0.5 - Math.random());
      setQuizOptions(options);
      setExpectedAnswer(odd);
      setQuizQuestion(language === 'es' ? '¿Cuál de estos emojis NO pertenece al mismo grupo?' : 'Which of these emojis does NOT belong to the same group?');
      setShowQuiz(true);
    }
  };

  const submitQuiz = (answerInput?: string) => {
    // if emoji quiz, answerInput is the emoji chosen; for math, use expectedAnswer compared to input
    if (quizType === 'emoji') {
      if (!answerInput) return;
      if (answerInput === expectedAnswer) {
        setCaptchaPassed(true);
        setShowQuiz(false);
        setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Verificación completada con éxito. Ya puedes chatear.' : 'Verification completed successfully. You can now chat.' }]);
      } else {
        setQuizError(language === 'es' ? 'Respuesta incorrecta. Intenta otro quiz.' : 'Incorrect answer. Try another quiz.');
      }
    } else {
      if ((answerInput || '').trim() === expectedAnswer) {
        setCaptchaPassed(true);
        setShowQuiz(false);
        setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Verificación completada con éxito. Ya puedes chatear.' : 'Verification completed successfully. You can now chat.' }]);
      } else {
        setQuizError(language === 'es' ? 'Respuesta incorrecta. Intenta de nuevo.' : 'Incorrect answer. Try again.');
      }
    }
  };

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{language === 'es' ? 'Chat de Soporte' : 'Support Chat'}</h1>
            <p className="text-muted-foreground">{language === 'es' ? 'Habla con nuestro asistente automático. No es necesario enviar datos personales.' : 'Talk to our automated assistant. No personal data required.'}</p>
          </div>

          {/* Info bar with Quiz buttons and reCAPTCHA fallback */}
          <div className="flex items-center justify-between bg-muted/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{language === 'es' ? 'Asistente Automático' : 'Automated Assistant'}</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Si no funciona el reCAPTCHA, usa el quiz anti-robots (emoji o matemáticas).' : 'If reCAPTCHA is not available, use the anti-robot quiz (emoji or math).'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {!captchaPassed && (
                <>
                  <button onClick={() => openQuiz('emoji')} className="bg-primary text-white px-3 py-2 rounded-xl">{language === 'es' ? 'Quiz (Emoji)' : 'Quiz (Emoji)'}</button>
                  <button onClick={() => openQuiz('math')} className="bg-accent text-white px-3 py-2 rounded-xl">{language === 'es' ? 'Quiz (Matemáticas)' : 'Quiz (Math)'}</button>
                </>
              )}
              {captchaPassed && (
                <div className="flex items-center space-x-2 text-green-600"><CheckCircle className="h-5 w-5" /><span className="font-medium">{language === 'es' ? 'Verificado' : 'Verified'}</span></div>
              )}
            </div>
          </div>

          {/* reCAPTCHA element (kept as fallback if it loads) */}
          <div className="mb-6 flex justify-center">
            <div className="g-recaptcha" data-sitekey="6LdoPK8rAAAAACjJnvHEF2McHDnVB5R1oC-Akuk1" data-callback="onRecaptchaSuccess" data-expired-callback="onRecaptchaExpired" data-error-callback="onRecaptchaError"></div>
          </div>

          {/* Chat Area */}
          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
            <div ref={messagesRef} className="p-4 h-96 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-full ${m.from === 'bot' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block px-3 py-2 rounded-xl ${m.from === 'bot' ? 'bg-muted/50 text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-center space-x-3">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }} placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'} className="flex-1 px-3 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary" disabled={!captchaPassed} />
                <button onClick={() => sendMessage(input)} className={`px-3 py-2 rounded-xl ${captchaPassed ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`} title={language === 'es' ? 'Enviar' : 'Send'}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {!captchaPassed && (
                <p className="text-xs text-muted-foreground mt-2">{language === 'es' ? 'Necesitas completar la verificación anti-robots para enviar mensajes.' : 'You need to complete the anti-robot verification to send messages.'}</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{language === 'es' ? 'Quiz anti-robots' : 'Anti-robot quiz'}</h3>
              <button onClick={() => setShowQuiz(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
            </div>

            <p className="mb-4 font-medium">{quizQuestion}</p>

            {quizType === 'emoji' ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {quizOptions.map((opt) => (
                  <button key={opt} onClick={() => submitQuiz(opt)} className="px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/30">{opt}</button>
                ))}
              </div>
            ) : (
              <>
                <input value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-2 border border-border rounded-xl mb-3" placeholder={language === 'es' ? 'Escribe la respuesta aquí' : 'Type the answer here'} />
                {quizError && <div className="text-sm text-red-600 mb-3">{quizError}</div>}
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setShowQuiz(false)} className="px-4 py-2 rounded-xl bg-muted">{language === 'es' ? 'Cancelar' : 'Cancel'}</button>
                  <button onClick={() => submitQuiz(input)} className="px-4 py-2 rounded-xl bg-primary text-white">{language === 'es' ? 'Enviar' : 'Submit'}</button>
                </div>
              </>
            )}

            {quizError && <div className="text-sm text-red-600 mt-3">{quizError}</div>}

          </div>
        </div>
      )}
    </main>
  );
}
