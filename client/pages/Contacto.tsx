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

  useEffect(() => {
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          setTimeout(() => {
            const container = document.getElementById('contact-recaptcha');
            if (container && !container.innerHTML) {
              window.grecaptcha.render('contact-recaptcha', {
                'sitekey': '6LfRkKcrAAAAAO16M1EkNu5Rx7kZKphc6dgScsjb',
                'callback': (token: string) => {
                  setCaptchaCompleted(true);
                }
              });
            }
          }, 500);
        } catch (error) {
          console.log('reCAPTCHA failed to load');
        }
      } else {
        setTimeout(checkRecaptcha, 100);
      }
    };

    checkRecaptcha();
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

    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!captchaCompleted) {
      if (!showFallbackCaptcha && !recaptchaLoaded) {
        setShowFallbackCaptcha(true);
        return;
      }
      alert("Por favor, completa la verificación de seguridad.");
      return;
    }

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
                <span className="font-semibold text-foreground">Bot de Soporte Automático</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Nuestro bot inteligente procesará tu mensaje y te enviará una respuesta 
                personalizada en las próximas horas. ¡Gracias por tu paciencia!
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

              {/* Captcha Section */}
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="text-foreground font-medium mb-1">Verificación de Seguridad</p>
                      <p className="text-muted-foreground">
                        {captchaCompleted
                          ? "✅ Verificación completada exitosamente"
                          : "Para evitar spam, completa la verificación antes de enviar tu mensaje."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {!captchaCompleted && (
                  <div className="space-y-4">
                    {/* Google reCAPTCHA */}
                    {!showFallbackCaptcha && (
                      <div className="flex flex-col items-center space-y-3">
                        <div id="contact-recaptcha"></div>
                        <button
                          type="button"
                          onClick={() => setShowFallbackCaptcha(true)}
                          className="text-sm text-primary hover:underline"
                        >
                          ¿Problemas con reCAPTCHA? Usar verificación alternativa
                        </button>
                      </div>
                    )}

                    {/* Fallback Puzzle Captcha */}
                    {showFallbackCaptcha && (
                      <div className="border-2 border-primary/20 rounded-xl p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-foreground mb-2">Puzzle de Verificación</h4>
                          <p className="text-sm text-muted-foreground">
                            Selecciona todas las imágenes que contienen <strong className="text-primary">carros 🚗</strong>
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {captchaImages.map((image) => (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => handleImageClick(image.id)}
                              className={`aspect-square border-2 rounded-xl flex items-center justify-center text-4xl transition-all hover:scale-105 ${
                                selectedImages.includes(image.id)
                                  ? "border-primary bg-primary/10 scale-95 shadow-md"
                                  : "border-gray-200 hover:border-primary/50"
                              }`}
                            >
                              {image.emoji}
                            </button>
                          ))}
                        </div>

                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowFallbackCaptcha(false);
                              setSelectedImages([]);
                            }}
                            className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-3 px-4 rounded-xl font-medium transition-colors"
                          >
                            Usar reCAPTCHA
                          </button>
                          <button
                            type="button"
                            onClick={verifyFallbackCaptcha}
                            disabled={selectedImages.length === 0}
                            className="flex-1 bg-primary hover:bg-brand-blue-light disabled:bg-muted disabled:text-muted-foreground text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                          >
                            Verificar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
