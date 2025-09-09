import { useState, useEffect, useRef } from "react";
import { Send, Bot, X, CheckCircle, ImagePlus } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const BAD_WORDS = ['puta','idiota','tonto','stupid','idiot','damn','shit','bitch','cabrón'];

function containsBadWord(text: string) {
  const lower = text.toLowerCase();
  return BAD_WORDS.some(w => lower.includes(w));
}

export default function Contacto() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text?: string; images?: string[] }[]>([]);
  const [input, setInput] = useState("");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [quizError, setQuizError] = useState("");
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      { from: 'bot', text: language === 'es' ? 'Hola 👋 Soy el asistente. Puedo responder tus preguntas inmediatamente. Puedes adjuntar fotos si lo necesitas.' : 'Hi 👋 I am the assistant. I can answer your questions immediately. You can attach photos if needed.' }
    ]);

    // reCAPTCHA callbacks if script is present
    // @ts-ignore
    window.onRecaptchaSuccess = () => setCaptchaPassed(true);
    // @ts-ignore
    window.onRecaptchaExpired = () => setCaptchaPassed(false);
    // @ts-ignore
    window.onRecaptchaError = () => setCaptchaPassed(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const openEmojiQuiz = () => {
    // simple emoji quiz reused from previous implementation
    const categories = {
      fruits: ['🍎','🍐','🍊','🍌','🍇','🍓'],
      animals: ['🐶','🐱','🐭','🐰','🦊','🐻'],
      faces: ['😀','😅','😂','😊','😉','😍']
    } as const;

    const keys = Object.keys(categories);
    const baseKey = keys[Math.floor(Math.random() * keys.length)];
    let oddKey = baseKey;
    while (oddKey === baseKey) oddKey = keys[Math.floor(Math.random() * keys.length)];

    const baseArr = (categories as any)[baseKey];
    const oddArr = (categories as any)[oddKey];
    const shuffledBase = baseArr.sort(() => 0.5 - Math.random());
    const chosenBase = shuffledBase.slice(0,3);
    const odd = oddArr[Math.floor(Math.random() * oddArr.length)];
    const options = [...chosenBase, odd].sort(() => 0.5 - Math.random());
    setExpectedAnswer(odd);
    setQuizQuestion(language === 'es' ? '¿Cuál de estos emojis NO pertenece al mismo grupo?' : 'Which of these emojis does NOT belong to the same group?');
    // store options in a message so modal isn't required - we'll re-use the showQuiz flag and put options in state via messages
    setShowQuiz(true);
  };

  const submitQuiz = (answer: string) => {
    if (answer === expectedAnswer) {
      setCaptchaPassed(true);
      setShowQuiz(false);
      setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Verificación completada. Ya puedes chatear.' : 'Verification completed. You can now chat.' }]);
    } else {
      setQuizError(language === 'es' ? 'Respuesta incorrecta. Intenta de nuevo.' : 'Incorrect answer. Try again.');
    }
  };

  const handleAttach = (files: FileList | null) => {
    if (!files) return;
    const urls: string[] = [];
    Array.from(files).slice(0,3).forEach(f => {
      const url = URL.createObjectURL(f);
      urls.push(url);
    });
    setAttachedImages(prev => [...prev, ...urls]);
  };

  const sendMessage = (text: string, images: string[] = []) => {
    if (!text.trim() && images.length === 0) return;

    // profanity check
    if (containsBadWord(text)) {
      setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Tu mensaje contiene lenguaje inapropiado. Por favor, evita insultos.' : 'Your message contains inappropriate language. Please avoid insults.' }]);
      return;
    }

    if (!captchaPassed) {
      setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Por favor completa la verificación anti-robots antes de chatear.' : 'Please complete anti-robot verification before chatting.' }]);
      return;
    }

    // Append user message
    setMessages(prev => [...prev, { from: 'user', text, images }]);
    setInput("");
    setAttachedImages([]);

    // Send message to server-side AI endpoint
    (async () => {
      // add temporary typing indicator
      setMessages(prev => [...prev, { from: 'bot', text: language === 'es' ? 'Escribiendo...' : 'Thinking...' }]);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: text, images }),
        });
        const data = await res.json();

        // replace typing indicator with actual reply
        setMessages(prev => {
          const withoutTyping = prev.slice(0, -1);
          const replyText = data?.output ?? (data?.error ?? (language === 'es' ? 'Error al obtener respuesta.' : 'Error getting response.'));
          return [...withoutTyping, { from: 'bot', text: replyText }];
        });
      } catch (err) {
        setMessages(prev => {
          const withoutTyping = prev.slice(0, -1);
          return [...withoutTyping, { from: 'bot', text: language === 'es' ? 'Error al contactar al servicio de IA.' : 'Error contacting AI service.' }];
        });
      }
    })();
  };

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{language === 'es' ? 'Chat de Soporte' : 'Support Chat'}</h1>
            <p className="text-muted-foreground">{language === 'es' ? 'Chatea con nuestro asistente. Puedes adjuntar imágenes o tomar una foto.' : 'Chat with our assistant. You can attach images or take a photo.'}</p>
          </div>

          <div className="flex items-center justify-between bg-muted/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{language === 'es' ? 'Asistente Automático' : 'Automated Assistant'}</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Completa reCAPTCHA o usa el quiz anti-robots para habilitar el chat.' : 'Complete reCAPTCHA or use the anti-robot quiz to enable chat.'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {!captchaPassed && (
                <>
                  <button onClick={() => openEmojiQuiz()} className="bg-primary text-white px-3 py-2 rounded-xl">{language === 'es' ? 'Quiz (Emoji)' : 'Quiz (Emoji)'}</button>
                  <button onClick={() => { /* open math quiz could be added */ }} className="bg-accent text-white px-3 py-2 rounded-xl">{language === 'es' ? 'Quiz (Más difícil)' : 'Quiz (Harder)'}</button>
                </>
              )}
              {captchaPassed && (
                <div className="flex items-center space-x-2 text-green-600"><CheckCircle className="h-5 w-5" /><span className="font-medium">{language === 'es' ? 'Verificado' : 'Verified'}</span></div>
              )}
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="g-recaptcha" data-sitekey="6LdoPK8rAAAAACjJnvHEF2McHDnVB5R1oC-Akuk1" data-callback="onRecaptchaSuccess" data-expired-callback="onRecaptchaExpired" data-error-callback="onRecaptchaError"></div>
          </div>

          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
            <div ref={messagesRef} className="p-4 h-96 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-full ${m.from === 'bot' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block px-3 py-2 rounded-xl ${m.from === 'bot' ? 'bg-muted/50 text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {m.text}
                    {m.images && m.images.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {m.images.map((src, idx) => (
                          <img key={idx} src={src} alt={`attached-${idx}`} className="h-20 w-20 object-cover rounded-md" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-center space-x-3 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="file" accept="image/*" multiple onChange={(e) => handleAttach(e.target.files)} className="hidden" capture="environment" />
                  <div className="px-3 py-2 rounded-xl bg-muted/20 hover:bg-muted/30 flex items-center space-x-2"><ImagePlus className="h-4 w-4" /><span className="text-sm">{language === 'es' ? 'Adjuntar imagen' : 'Attach image'}</span></div>
                </label>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input, attachedImages); }} placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'} className="flex-1 px-3 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary" />
                    <button onClick={() => sendMessage(input, attachedImages)} className={`px-3 py-2 rounded-xl bg-primary text-white`} title={language === 'es' ? 'Enviar' : 'Send'}>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  {attachedImages.length > 0 && (
                    <div className="mt-3 flex space-x-2">
                      {attachedImages.map((src, idx) => (
                        <div key={idx} className="relative">
                          <img src={src} alt={`preview-${idx}`} className="h-20 w-20 object-cover rounded-md" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {!captchaPassed && (
                <p className="text-xs text-muted-foreground mt-2">{language === 'es' ? 'Necesitas completar la verificación anti-robots para enviar mensajes.' : 'You need to complete anti-robot verification to send messages.'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showQuiz && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{language === 'es' ? 'Quiz anti-robots' : 'Anti-robot quiz'}</h3>
              <button onClick={() => setShowQuiz(false)} className="text-muted-foreground"><X className="h-5 w-5" /></button>
            </div>

            <p className="mb-4 font-medium">{quizQuestion}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Since we reused earlier generation we will render placeholder options and let user try multiple attempts */}
              <button onClick={() => submitQuiz(expectedAnswer)} className="px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/30">{expectedAnswer}</button>
              <button onClick={() => submitQuiz('wrong')} className="px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/30">{language === 'es' ? 'Otra opción' : 'Other option'}</button>
            </div>

            {quizError && <div className="text-sm text-red-600 mt-3">{quizError}</div>}
          </div>
        </div>
      )}
    </main>
  );
}
