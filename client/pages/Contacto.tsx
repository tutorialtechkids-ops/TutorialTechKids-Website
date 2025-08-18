import { useState, useEffect } from "react";
import { Send, Shield, MessageCircle, Bot, CheckCircle, X } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [botResponse, setBotResponse] = useState("");
  const [showError, setShowError] = useState("");

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max wait

    const checkRecaptcha = () => {
      if (retryCount >= maxRetries) {
        console.log('reCAPTCHA failed to load after maximum retries');
        return;
      }

      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          const container = document.getElementById('contact-recaptcha');
          if (container && !container.innerHTML) {
            window.grecaptcha.render('contact-recaptcha', {
              'sitekey': '6LfRkKcrAAAAAO16M1EkNu5Rx7kZKphc6dgScsjb',
              'callback': (token: string) => {
                console.log('reCAPTCHA completed');
                setCaptchaCompleted(true);
              },
              'expired-callback': () => {
                console.log('reCAPTCHA expired');
                setCaptchaCompleted(false);
              },
              'error-callback': () => {
                console.log('reCAPTCHA error');
                setCaptchaCompleted(false);
              }
            });
          }
        } catch (error) {
          console.log('Error rendering reCAPTCHA:', error);
          retryCount++;
          setTimeout(checkRecaptcha, 100);
        }
      } else {
        retryCount++;
        setTimeout(checkRecaptcha, 100);
      }
    };

    // Wait a bit for the page to load completely
    setTimeout(checkRecaptcha, 500);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBotResponse = (name: string, message: string) => {
    const responses = [
      `¡Hola ${name}! 🤖 Gracias por contactar TutorialTechKids. He recibido tu mensaje sobre "${message.substring(0, 50)}..." y lo he enviado a nuestro equipo.`,
      `¡Saludos ${name}! 👋 Tu consulta ha sido registrada exitosamente. Nuestro equipo revisará tu mensaje y te responderá pronto.`,
      `¡Hola ${name}! ✨ Mensaje recibido. Nos comunicaremos contigo en las próximas 24 horas para ayudarte con tu consulta.`,
      `¡Hi ${name}! 🚀 Tu mensaje sobre tecnología ha llegado al lugar correcto. Nuestros expertos te responderán muy pronto.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setShowError("Por favor, completa todos los campos.");
      return;
    }

    if (!captchaCompleted) {
      setShowError("Por favor, completa la verificación reCAPTCHA antes de enviar el mensaje.");
      return;
    }

    // Generate bot response
    const response = generateBotResponse(formData.name, formData.message);
    setBotResponse(response);

    // Simulate form submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">¡Mensaje Enviado!</h1>
              <p className="text-lg text-muted-foreground">
                Gracias por contactarnos. Nuestro bot de soporte responderá pronto.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-semibold text-foreground">Respuesta Automática del Bot</span>
              </div>
              <div className="bg-white rounded-xl p-4 border-l-4 border-primary mb-4">
                <p className="text-foreground italic">"{botResponse}"</p>
              </div>
              <p className="text-muted-foreground text-sm text-center">
                También hemos enviado tu consulta a nuestro equipo humano para una respuesta más detallada.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", message: "" });
                setCaptchaCompleted(false);
              }}
              className="bg-primary hover:bg-brand-blue-light text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
            >
              Enviar Otro Mensaje
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Contáctanos</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              ¿Tienes preguntas, sugerencias o necesitas ayuda? Escríbenos y te responderemos pronto.
            </p>
          </div>

          {/* Bot Info */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Soporte Automático 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Tenemos un bot inteligente que responde automáticamente a las consultas más comunes. 
                  También contamos con un bot especializado para la creación de planners digitales.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 space-y-6">
              
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Escribe tu nombre completo"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tu Correo Electrónico *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tu Mensaje *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Escribe tu mensaje, pregunta o sugerencia aquí..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Google reCAPTCHA */}
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="text-foreground font-medium mb-1">Verificación de Seguridad</p>
                      <p className="text-muted-foreground">
                        {captchaCompleted
                          ? "✅ Verificación completada exitosamente"
                          : "Completa el reCAPTCHA para enviar tu mensaje"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div id="contact-recaptcha"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-brand-blue-light text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Enviar Mensaje</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
