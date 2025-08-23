import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'pt' | 'fr' | 'it' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.social': 'Redes Sociales',
    'nav.store': 'Mi Tienda',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.start': 'Comenzar',
    
    // Contact form
    'contact.title': 'Contáctanos',
    'contact.subtitle': '¿Tienes preguntas, sugerencias o necesitas ayuda? Escríbenos y te responderemos pronto.',
    'contact.name': 'Tu Nombre',
    'contact.email': 'Tu Correo Electrónico',
    'contact.message': 'Tu Mensaje',
    'contact.submit': 'Enviar Mensaje',
    'contact.success': '¡Mensaje Enviado!',
    'contact.recaptcha': 'Completa la verificación reCAPTCHA',
    
    // Planner form
    'planner.title': 'Personaliza tu Planner Digital',
    'planner.subtitle': 'Completa este formulario para crear tu planner completamente personalizado',
    'planner.language': '¿En qué idioma quieres tu planner?',
    'planner.submit': 'Generar mi Planner Personalizado',
    'planner.app': '¿Qué aplicación estás usando?',
    'planner.customization': 'Selecciona opción de personalización:',
    'planner.type': 'Planner completo o minimalista',
    'planner.color': 'Color del planner:',
    'planner.paperStyle': 'Estilo de papel:',
    'planner.customImage': 'Subir imagen personalizada (máx 5MB):',
    'planner.paperBacking': 'Color de fondo del papel:',
    'planner.headerBoxes': 'Color de cajas de encabezado:',
    'planner.dates': 'Selecciona las fechas de tu planner:',
    'planner.startMonth': 'Mes de inicio:',
    'planner.startDate': 'Fecha de inicio:',
    'planner.tabColors': 'Colores de pestañas:',
    'planner.tabFont': 'Color de fuente de pestañas:',
    'planner.tabTitles': 'Títulos y enlaces de pestañas:',
    'planner.dailyTime': 'Hora de inicio diaria:',
    'planner.calendar': 'Enlaces de calendario Apple y Google en páginas diarias:',
    'planner.recaptcha': 'Completa la verificación reCAPTCHA para generar tu planner:',
    'planner.chooseFile': 'Elegir Archivo',
    'planner.noFile': 'Ningún archivo seleccionado',
    'planner.hexColors': 'Encuentra códigos de color hex',
    
    // Store
    'store.title': 'Mi Tienda Digital',
    'store.subtitle': 'Descubre nuestros planners digitales personalizados',
    'store.buy': 'Comprar por $10',
    'store.customize': 'Personalizar'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.social': 'Social Media',
    'nav.store': 'My Store',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.start': 'Get Started',
    
    // Contact form
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Do you have questions, suggestions or need help? Write to us and we will respond soon.',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Message Sent!',
    'contact.recaptcha': 'Complete reCAPTCHA verification',
    
    // Planner form
    'planner.title': 'Customize your Digital Planner',
    'planner.subtitle': 'Complete this form to create your fully customized planner',
    'planner.language': 'What language do you want your planner in?',
    'planner.submit': 'Generate my Custom Planner',
    'planner.app': 'What app are you using?',
    'planner.customization': 'Select customization option:',
    'planner.type': 'Full or minimalist planner',
    'planner.color': 'Planner color:',
    
    // Store
    'store.title': 'My Digital Store',
    'store.subtitle': 'Discover our customized digital planners',
    'store.buy': 'Buy for $10',
    'store.customize': 'Customize'
  },
  pt: {
    // Header
    'nav.home': 'Início',
    'nav.social': 'Redes Sociais',
    'nav.store': 'Minha Loja',
    'nav.about': 'Sobre Nós',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'nav.start': 'Começar',
    
    // Contact form
    'contact.title': 'Contate-nos',
    'contact.subtitle': 'Tem dúvidas, sugestões ou precisa de ajuda? Escreva-nos e responderemos em breve.',
    'contact.name': 'Seu Nome',
    'contact.email': 'Seu Email',
    'contact.message': 'Sua Mensagem',
    'contact.submit': 'Enviar Mensagem',
    'contact.success': 'Mensagem Enviada!',
    'contact.recaptcha': 'Complete a verificação reCAPTCHA',
    
    // Planner form
    'planner.title': 'Personalize seu Planner Digital',
    'planner.subtitle': 'Complete este formulário para criar seu planner totalmente personalizado',
    'planner.language': 'Em que idioma você quer seu planner?',
    'planner.submit': 'Gerar meu Planner Personalizado',
    'planner.app': 'Que aplicativo você está usando?',
    'planner.customization': 'Selecione a opção de personalização:',
    'planner.type': 'Planner completo ou minimalista',
    'planner.color': 'Cor do planner:',
    
    // Store
    'store.title': 'Minha Loja Digital',
    'store.subtitle': 'Descubra nossos planners digitais personalizados',
    'store.buy': 'Comprar por $10',
    'store.customize': 'Personalizar'
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.social': 'Réseaux Sociaux',
    'nav.store': 'Ma Boutique',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.login': 'Se Connecter',
    'nav.start': 'Commencer',
    
    // Contact form
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Avez-vous des questions, des suggestions ou besoin d\'aide? Écrivez-nous et nous vous répondrons bientôt.',
    'contact.name': 'Votre Nom',
    'contact.email': 'Votre Email',
    'contact.message': 'Votre Message',
    'contact.submit': 'Envoyer le Message',
    'contact.success': 'Message Envoyé!',
    'contact.recaptcha': 'Complétez la vérification reCAPTCHA',
    
    // Planner form
    'planner.title': 'Personnalisez votre Planner Numérique',
    'planner.subtitle': 'Complétez ce formulaire pour créer votre planner entièrement personnalisé',
    'planner.language': 'Dans quelle langue voulez-vous votre planner?',
    'planner.submit': 'Générer mon Planner Personnalisé',
    'planner.app': 'Quelle application utilisez-vous?',
    'planner.customization': 'Sélectionnez l\'option de personnalisation:',
    'planner.type': 'Planner complet ou minimaliste',
    'planner.color': 'Couleur du planner:',
    
    // Store
    'store.title': 'Ma Boutique Numérique',
    'store.subtitle': 'Découvrez nos planners numériques personnalisés',
    'store.buy': 'Acheter pour $10',
    'store.customize': 'Personnaliser'
  },
  it: {
    // Header
    'nav.home': 'Home',
    'nav.social': 'Social Media',
    'nav.store': 'Il Mio Negozio',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatto',
    'nav.login': 'Accedi',
    'nav.start': 'Inizia',
    
    // Contact form
    'contact.title': 'Contattaci',
    'contact.subtitle': 'Hai domande, suggerimenti o hai bisogno di aiuto? Scrivici e ti risponderemo presto.',
    'contact.name': 'Il Tuo Nome',
    'contact.email': 'La Tua Email',
    'contact.message': 'Il Tuo Messaggio',
    'contact.submit': 'Invia Messaggio',
    'contact.success': 'Messaggio Inviato!',
    'contact.recaptcha': 'Completa la verifica reCAPTCHA',
    
    // Planner form
    'planner.title': 'Personalizza il tuo Planner Digitale',
    'planner.subtitle': 'Completa questo modulo per creare il tuo planner completamente personalizzato',
    'planner.language': 'In che lingua vuoi il tuo planner?',
    'planner.submit': 'Genera il mio Planner Personalizzato',
    'planner.app': 'Che app stai usando?',
    'planner.customization': 'Seleziona l\'opzione di personalizzazione:',
    'planner.type': 'Planner completo o minimalista',
    'planner.color': 'Colore del planner:',
    
    // Store
    'store.title': 'Il Mio Negozio Digitale',
    'store.subtitle': 'Scopri i nostri planner digitali personalizzati',
    'store.buy': 'Acquista per $10',
    'store.customize': 'Personalizza'
  },
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.social': 'Soziale Medien',
    'nav.store': 'Mein Shop',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.start': 'Loslegen',
    
    // Contact form
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Haben Sie Fragen, Vorschläge oder brauchen Hilfe? Schreiben Sie uns und wir antworten bald.',
    'contact.name': 'Ihr Name',
    'contact.email': 'Ihre E-Mail',
    'contact.message': 'Ihre Nachricht',
    'contact.submit': 'Nachricht Senden',
    'contact.success': 'Nachricht Gesendet!',
    'contact.recaptcha': 'reCAPTCHA-Verifizierung abschließen',
    
    // Planner form
    'planner.title': 'Personalisieren Sie Ihren Digitalen Planer',
    'planner.subtitle': 'Füllen Sie dieses Formular aus, um Ihren vollständig personalisierten Planer zu erstellen',
    'planner.language': 'In welcher Sprache möchten Sie Ihren Planer?',
    'planner.submit': 'Meinen Personalisierten Planer Erstellen',
    'planner.app': 'Welche App verwenden Sie?',
    'planner.customization': 'Wählen Sie die Anpassungsoption:',
    'planner.type': 'Vollständiger oder minimalistischer Planer',
    'planner.color': 'Planer-Farbe:',
    
    // Store
    'store.title': 'Mein Digitaler Shop',
    'store.subtitle': 'Entdecken Sie unsere personalisierten digitalen Planer',
    'store.buy': 'Für $10 kaufen',
    'store.customize': 'Anpassen'
  }
};

// Función para detectar idioma del navegador
function detectBrowserLanguage(): Language {
  const browserLang = navigator.language || navigator.languages[0] || 'en-US';
  const languageCode = browserLang.split('-')[0].toLowerCase();
  
  // Mapear códigos de idioma a idiomas soportados
  const supportedLanguages: { [key: string]: Language } = {
    'es': 'es',
    'en': 'en', 
    'pt': 'pt',
    'fr': 'fr',
    'it': 'it',
    'de': 'de'
  };
  
  return supportedLanguages[languageCode] || 'en'; // Default a inglés
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Intentar obtener idioma del localStorage, si no, detectar del navegador
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    return savedLanguage || detectBrowserLanguage();
  });

  useEffect(() => {
    // Guardar idioma en localStorage cuando cambie
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
