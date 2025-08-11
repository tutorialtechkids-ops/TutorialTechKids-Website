import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-50 p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm text-foreground font-medium">
                🍪 Utilizamos cookies para mejorar tu experiencia
              </p>
              <p className="text-xs text-muted-foreground">
                Usamos cookies esenciales y de análisis para ofrecerte el mejor contenido educativo. 
                <Link to="/cookies" className="text-primary hover:underline ml-1">
                  Más información
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-muted"
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2 text-sm bg-primary hover:bg-brand-blue-light text-primary-foreground rounded-lg transition-all duration-200 hover:shadow-md"
            >
              Aceptar todas
            </button>
            <button
              onClick={handleReject}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar banner de cookies"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
