import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Check, Palette, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    grecaptcha: any;
    recaptchaToken: string;
  }
}

export default function PlannerPersonalizado() {
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showFallbackCaptcha, setShowFallbackCaptcha] = useState(false);

  // Fallback captcha images
  const [captchaImages] = useState([
    { id: 1, emoji: "🚗", name: "car", isCorrect: true },
    { id: 2, emoji: "🏠", name: "house", isCorrect: false },
    { id: 3, emoji: "🚗", name: "car", isCorrect: true },
    { id: 4, emoji: "🌳", name: "tree", isCorrect: false },
    { id: 5, emoji: "🚗", name: "car", isCorrect: true },
    { id: 6, emoji: "🎈", name: "balloon", isCorrect: false },
    { id: 7, emoji: "🏠", name: "house", isCorrect: false },
    { id: 8, emoji: "🚗", name: "car", isCorrect: true },
    { id: 9, emoji: "🌳", name: "tree", isCorrect: false }
  ]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    app: "",
    customization: "",
    plannerType: "",
    plannerColor: "",
    customPlannerColor: "",
    paperStyle: "white",
    customImage: null,
    croppingBoxSize: 50,
    imageOpacity: 50,
    paperBackingColor: "ffffff",
    headerBoxesColor: "f7d7f0",
    dated: "",
    startMonth: "january",
    startDate: "",
    tabColors: "rainbow",
    customTabColors: "",
    tabFontColor: "white",
    tabTitles: "recommended",
    customTabTitles: Array(12).fill(""),
    dailyTimeStart: 6,
    calendarLinks: "",
    language: "spanish",
    isNotRobot: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomTabTitleChange = (index: number, value: string) => {
    const newTitles = [...formData.customTabTitles];
    newTitles[index] = value;
    setFormData(prev => ({ ...prev, customTabTitles: newTitles }));
  };

  const handleImageClick = (imageId: number) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(prev => prev.filter(id => id !== imageId));
    } else {
      setSelectedImages(prev => [...prev, imageId]);
    }
  };

  const verifyFallbackCaptcha = () => {
    const correctImages = captchaImages.filter(img => img.isCorrect).map(img => img.id);
    const isCorrect = selectedImages.length === correctImages.length &&
                     selectedImages.every(id => correctImages.includes(id));

    if (isCorrect) {
      setRecaptchaCompleted(true);
      setShowFallbackCaptcha(false);
    } else {
      alert("Por favor, selecciona solo los carros. Inténtalo de nuevo.");
      setSelectedImages([]);
    }
  };

  useEffect(() => {
    let recaptchaCheckCount = 0;
    const maxRetries = 50; // 5 seconds max

    const checkRecaptcha = () => {
      recaptchaCheckCount++;

      if (window.grecaptcha && window.grecaptcha.render) {
        setRecaptchaLoaded(true);
        try {
          setTimeout(() => {
            const container = document.getElementById('planner-recaptcha');
            if (container && !container.innerHTML) {
              window.grecaptcha.render('planner-recaptcha', {
                'sitekey': '6LfRkKcrAAAAAO16M1EkNu5Rx7kZKphc6dgScsjb',
                'callback': (token: string) => {
                  setRecaptchaCompleted(true);
                  window.dispatchEvent(new CustomEvent('recaptchaCompleted', { detail: token }));
                }
              });
            }
          }, 200);
        } catch (error) {
          console.log('reCAPTCHA failed, showing fallback');
          setShowFallbackCaptcha(true);
        }
      } else if (recaptchaCheckCount < maxRetries) {
        setTimeout(checkRecaptcha, 100);
      } else {
        // Fallback to custom captcha if reCAPTCHA doesn't load
        console.log('reCAPTCHA timeout, showing fallback');
        setShowFallbackCaptcha(true);
      }
    };

    const handleRecaptchaComplete = (event: any) => {
      setRecaptchaCompleted(!!event.detail);
    };

    window.addEventListener('recaptchaCompleted', handleRecaptchaComplete);
    checkRecaptcha();

    return () => {
      window.removeEventListener('recaptchaCompleted', handleRecaptchaComplete);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaCompleted) {
      if (!showFallbackCaptcha && !recaptchaLoaded) {
        setShowFallbackCaptcha(true);
        return;
      }
      alert("Por favor, completa la verificación de seguridad");
      return;
    }
    // Here you would process the form and generate the custom planner
    window.location.href = "/gracias";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-accent/5 via-white to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            to="/tienda" 
            className="inline-flex items-center space-x-2 text-primary hover:text-brand-blue-light transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la tienda</span>
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center">
              <Palette className="h-6 w-6 text-accent" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Personaliza tu Planner Digital
          </h1>
          <p className="text-muted-foreground">
            Completa este formulario para crear tu planner completamente personalizado
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">
            
            {/* App Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">What app are you using?</h3>
              <div className="space-y-3">
                {[
                  "Apple apps other than Goodnotes 6",
                  "GoodNotes 6 (make sure you're using Safari browser and not a different browser)",
                  "Penly for Android",
                  "Other Android apps"
                ].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="app"
                      value={option}
                      checked={formData.app === option}
                      onChange={(e) => handleInputChange("app", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">¿En qué idioma quieres tu planner?</h3>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="spanish">Español</option>
                <option value="english">English</option>
                <option value="portuguese">Português</option>
                <option value="french">Français</option>
                <option value="italian">Italiano</option>
                <option value="german">Deutsch</option>
                <option value="chinese">中文</option>
                <option value="japanese">日本語</option>
                <option value="korean">한국어</option>
                <option value="arabic">العربية</option>
                <option value="russian">Русский</option>
                <option value="hindi">हिन्दी</option>
                <option value="dutch">Nederlands</option>
                <option value="swedish">Svenska</option>
                <option value="norwegian">Norsk</option>
                <option value="danish">Dansk</option>
                <option value="finnish">Suomi</option>
                <option value="polish">Polski</option>
                <option value="czech">Čeština</option>
                <option value="hungarian">Magyar</option>
                <option value="romanian">Română</option>
                <option value="bulgarian">Български</option>
                <option value="croatian">Hrvatski</option>
                <option value="serbian">Српски</option>
                <option value="ukrainian">Українська</option>
                <option value="greek">Ελληνικά</option>
                <option value="turkish">Türkçe</option>
                <option value="hebrew">עברית</option>
                <option value="thai">ไทย</option>
                <option value="vietnamese">Tiếng Việt</option>
                <option value="indonesian">Bahasa Indonesia</option>
                <option value="malay">Bahasa Melayu</option>
                <option value="tagalog">Tagalog</option>
                <option value="swahili">Kiswahili</option>
              </select>
            </div>

            {/* Customization Option */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select customization option:</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {["Simple", "Advanced"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange("customization", option)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      formData.customization === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Planner Type */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Full or minimalist planner</h3>
              <div className="space-y-3">
                {[
                  "Full planner (give me everything!)",
                  "Minimalist planner (no extra templates)"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="plannerType"
                      value={option}
                      checked={formData.plannerType === option}
                      onChange={(e) => handleInputChange("plannerType", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Planner Color */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Planner color:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {[
                  { name: "Blush", color: "#F8D7DA" },
                  { name: "Black", color: "#000000" },
                  { name: "Blue", color: "#ADD8E6" },
                  { name: "Green", color: "#90EE90" },
                  { name: "Pink", color: "#FFB6C1" },
                  { name: "Purple", color: "#DDA0DD" }
                ].map((colorOption) => (
                  <label key={colorOption.name} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="plannerColor"
                      value={colorOption.name}
                      checked={formData.plannerColor === colorOption.name}
                      onChange={(e) => handleInputChange("plannerColor", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{colorOption.name}:</span>
                    <div 
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: colorOption.color }}
                    ></div>
                  </label>
                ))}
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="plannerColor"
                    value="custom"
                    checked={formData.plannerColor === "custom"}
                    onChange={(e) => handleInputChange("plannerColor", e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Custom planner color</span>
                </label>
                {formData.plannerColor === "custom" && (
                  <input
                    type="text"
                    placeholder="ffffff"
                    value={formData.customPlannerColor}
                    onChange={(e) => handleInputChange("customPlannerColor", e.target.value)}
                    className="ml-6 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                )}
                <p className="text-sm text-muted-foreground ml-6">
                  Find hex color codes <span className="text-primary">here</span>.
                </p>
              </div>
            </div>

            {/* Paper Style */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Paper Style:</h3>
              <div className="space-y-3">
                {["White", "Cream"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paperStyle"
                      value={option.toLowerCase()}
                      checked={formData.paperStyle === option.toLowerCase()}
                      onChange={(e) => handleInputChange("paperStyle", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Image Upload */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Upload a custom image (use a high resolution image - max 5MB):
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                  <span className="text-sm text-muted-foreground">No file chosen</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cropping box size:</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.croppingBoxSize}
                      onChange={(e) => handleInputChange("croppingBoxSize", parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Image opacity:</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.imageOpacity}
                      onChange={(e) => handleInputChange("imageOpacity", parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <button type="button" className="text-primary hover:underline">Center horizontally</button>
                    <button type="button" className="text-primary hover:underline">Center vertically</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Paper/Backing Color */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Paper/backing color:</label>
              <input
                type="text"
                value={formData.paperBackingColor}
                onChange={(e) => handleInputChange("paperBackingColor", e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Find hex color codes <span className="text-primary">here</span>
              </p>
            </div>

            {/* Header Boxes Color */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Header boxes color:</label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={formData.headerBoxesColor}
                  onChange={(e) => handleInputChange("headerBoxesColor", e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div 
                  className="w-8 h-8 rounded border border-border"
                  style={{ backgroundColor: `#${formData.headerBoxesColor}` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Find hex color codes <span className="text-primary">here</span>
              </p>
            </div>

            {/* Dated Planner Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select your planner dates:</h3>
              <div className="space-y-3">
                {[
                  "One year dated: 2024",
                  "Two year dated: Jan 2024 - Dec 2025",
                  "One year dated: 2025",
                  "Two year dated: Jan 2025 - Dec 2026",
                  "One year dated: 2026"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dated"
                      value={option}
                      checked={formData.dated === option}
                      onChange={(e) => handleInputChange("dated", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Start Month */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Start month:</label>
              <select
                value={formData.startMonth}
                onChange={(e) => handleInputChange("startMonth", e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month) => (
                  <option key={month} value={month.toLowerCase()}>{month}</option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Start date:</h3>
              <div className="space-y-3">
                {["Monday", "Sunday"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="startDate"
                      value={option}
                      checked={formData.startDate === option}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tab Colors */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tab colors:</h3>
              <div className="space-y-3">
                {["Rainbow tabs", "Cream tabs"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tabColors"
                      value={option.toLowerCase().replace(" ", "_")}
                      checked={formData.tabColors === option.toLowerCase().replace(" ", "_")}
                      onChange={(e) => handleInputChange("tabColors", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tabColors"
                    value="custom"
                    checked={formData.tabColors === "custom"}
                    onChange={(e) => handleInputChange("tabColors", e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Custom tab colors</span>
                </label>
                {formData.tabColors === "custom" && (
                  <input
                    type="text"
                    value={formData.customTabColors}
                    onChange={(e) => handleInputChange("customTabColors", e.target.value)}
                    className="ml-6 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                  />
                )}
              </div>
            </div>

            {/* Tab Font Color */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tab font color:</h3>
              <div className="space-y-3">
                {["Black", "White"].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tabFontColor"
                      value={option.toLowerCase()}
                      checked={formData.tabFontColor === option.toLowerCase()}
                      onChange={(e) => handleInputChange("tabFontColor", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tab Titles */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tab titles and links:</h3>
              <div className="space-y-3 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tabTitles"
                    value="recommended"
                    checked={formData.tabTitles === "recommended"}
                    onChange={(e) => handleInputChange("tabTitles", e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">1-12 tabs with dividers (recommended for beginners):</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="tabTitles"
                    value="custom"
                    checked={formData.tabTitles === "custom"}
                    onChange={(e) => handleInputChange("tabTitles", e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Custom tab titles and links:</span>
                </label>
              </div>

              {formData.tabTitles === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(12).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-foreground w-20">
                        Tab name {index + 1}:
                      </label>
                      <input
                        type="text"
                        placeholder={`TAB ${index + 1}`}
                        value={formData.customTabTitles[index]}
                        onChange={(e) => handleCustomTabTitleChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <select className="px-2 py-2 border border-border rounded-lg text-sm">
                        <option>Standard divider page</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Time Start */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">Daily time start:</label>
              <select
                value={formData.dailyTimeStart}
                onChange={(e) => handleInputChange("dailyTimeStart", parseInt(e.target.value))}
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {Array.from({length: 24}, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            {/* Calendar Links */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Apple and Google calendar links on daily pages:</h3>
              <div className="space-y-3">
                {[
                  "None",
                  "Apple calendar links for Apple devices",
                  "Google calendar links for Apple devices",
                  "Google calendar links for Android devices"
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="calendarLinks"
                      value={option}
                      checked={formData.calendarLinks === option}
                      onChange={(e) => handleInputChange("calendarLinks", e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Captcha Section */}
            <div className="mb-8">
              <p className="text-sm font-medium text-foreground mb-4">
                {recaptchaCompleted
                  ? "✅ Verificación completada - ¡Listo para generar tu planner!"
                  : "Completa la verificación para generar tu planner:"
                }
              </p>

              {!recaptchaCompleted && (
                <div className="space-y-4">
                  {/* Google reCAPTCHA */}
                  {!showFallbackCaptcha && (
                    <div className="flex flex-col items-center space-y-3">
                      <div id="planner-recaptcha"></div>
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
            <div className="text-center">
              <button
                type="submit"
                disabled={!recaptchaCompleted}
                className="bg-primary hover:bg-brand-blue-light disabled:bg-muted disabled:text-muted-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Check className="h-5 w-5" />
                <span>Generar mi Planner Personalizado</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
