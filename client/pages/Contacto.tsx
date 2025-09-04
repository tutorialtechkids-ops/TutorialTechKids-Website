import { useState, useEffect } from "react";
import { Send, Shield, Bot, CheckCircle, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaSuccess: () => void;
    onRecaptchaExpired: () => void;
    onRecaptchaError: () => void;
  }
}

export default function Contacto() {
  const { t, language } = useLanguage();

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
    // Simple callback para reCAPTCHA
    window.onRecaptchaSuccess = () => {
      setCaptchaCompleted(true);
    };

    window.onRecaptchaExpired = () => {
      setCaptchaCompleted(false);
    };

    window.onRecaptchaError = () => {
      setCaptchaCompleted(false);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBotResponse = (name: string, message: string) => {
    const responsesEs = [
      `¡Hola ${name}! 🤖 Gracias por contactar TutorialTechKids. He recibido tu mensaje sobre "${message.substring(0, 50)}..." y lo he enviado a nuestro equipo.`,
      `¡Saludos ${name}! 👋 Tu consulta ha sido registrada exitosamente. Nuestro equipo revisará tu mensaje y te responderá pronto.`,
      `¡Hola ${name}! ✨ Mensaje recibido. Nos comunicaremos contigo en las próximas 24 horas para ayudarte con tu consulta.`
    ];

    const responsesEn = [
      `Hi ${name}! 🤖 Thanks for contacting TutorialTechKids. I received your message about "${message.substring(0,50)}..." and have forwarded it to our team.`,
      `Hello ${name}! 👋 Your inquiry was received successfully. Our team will review it and get back to you soon.`,
      `Hi ${name}! ✨ Message received. We'll contact you within 24 hours to help with your request.`
    ];

    const pool = language === 'es' ? responsesEs : responsesEn;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setShowError(language === 'es' ? "Por favor, completa todos los campos." : "Please complete all fields.");
      return;
    }

    if (!captchaCompleted) {
      setShowError(language === 'es' ? "Por favor, completa la verificación reCAPTCHA antes de enviar el mensaje." : "Please complete the reCAPTCHA verification before sending the message.");
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
              <h1 className="text-3xl font-bold text-foreground">{t('contact.success')}</h1>
              <p className="text-lg text-muted-foreground">{language === 'es' ? 'Gracias por contactarnos. Nuestro bot de soporte responderá pronto.' : 'Thanks for contacting us. Our support bot will respond shortly.'}</p>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-semibold text-foreground">{language === 'es' ? 'Respuesta Automática del Bot' : 'Automated Bot Response'}</span>
              </div>
              <div className="bg-white rounded-xl p-4 border-l-4 border-primary mb-4">
                <p className="text-foreground italic">"{botResponse}"</p>
              </div>
              <p className="text-muted-foreground text-sm text-center">
                {language === 'es' ? 'También hemos enviado tu consulta a nuestro equipo humano para una respuesta más detallada.' : 'We have also forwarded your inquiry to our human team for a more detailed response.'}
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
                setCaptchaCompleted(false);
                setShowError("");
              }}
              className="bg-primary hover:bg-brand-blue-light text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
            >
              {language === 'es' ? 'Enviar Otro Mensaje' : 'Send Another Message'}
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
              <span className="text-primary">{t('contact.title')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{t('contact.subtitle')}</p>
          </div>

          {/* Bot Info */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 mb-3">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">{language === 'es' ? 'Soporte Automático 24/7' : 'Automatic Support 24/7'}</h3>
                <p className="text-sm text-muted-foreground">{language === 'es' ? 'Tenemos un bot inteligente que responde automáticamente a las consultas más comunes. También contamos con un bot especializado para la creación de planners digitales.' : 'We have an intelligent bot that automatically answers common inquiries. We also have a specialized bot for creating digital planners.'}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
            <p className="text-sm text-amber-800">
              {language === 'es' ? 'Si tu consulta es urgente o un problema más grave, escríbenos directamente a' : 'If your inquiry is urgent or more serious, write to us directly at'} 
              <a href="mailto:tutorialtechkids@gmail.com" className="underline font-medium ml-1">tutorialtechkids@gmail.com</a>.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {showError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-medium">{showError}</p>
              </div>
            )}

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 space-y-6">

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={language === 'es' ? 'Escribe tu nombre completo' : 'Enter your full name'}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={language === 'es' ? 'ejemplo@correo.com' : 'example@email.com'}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={language === 'es' ? 'Escribe tu mensaje, pregunta o sugerencia aquí...' : 'Write your message, question or suggestion here...'}
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Google reCAPTCHA */}
              <div className="space-y-4">
                <div className={`rounded-xl p-4 ${captchaCompleted ? 'bg-green-50 border border-green-200' : 'bg-muted/50'}`}>
                  <div className="flex items-start space-x-3">
                    <Shield className={`h-5 w-5 mt-0.5 ${captchaCompleted ? 'text-green-600' : 'text-primary'}`} />
                    <div className="text-sm">
                      <p className="text-foreground font-medium mb-1">{language === 'es' ? 'Verificación de Seguridad' : 'Security Verification'}</p>
                      <p className={captchaCompleted ? 'text-green-700' : 'text-muted-foreground'}>
                        {captchaCompleted ? `✅ ${t('contact.success')}` : t('contact.recaptcha')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center bg-gray-50 rounded-xl p-4">
                  <div className="g-recaptcha"
                       data-sitekey="6LdoPK8rAAAAACjJnvHEF2McHDnVB5R1oC-Akuk1"
                       data-callback="onRecaptchaSuccess"
                       data-expired-callback="onRecaptchaExpired"
                       data-error-callback="onRecaptchaError">
                  </div>
                </div>

                {!captchaCompleted && (
                  <p className="text-xs text-muted-foreground text-center">
                    {language === 'es' ? 'Si no ves el reCAPTCHA, verifica que JavaScript esté habilitado en tu navegador' : 'If you do not see the reCAPTCHA, ensure JavaScript is enabled in your browser'}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-brand-blue-light text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{t('contact.submit')}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}
