import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({ 
  title, 
  description, 
  icon = <FileText className="h-12 w-12 text-muted-foreground" />
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            {icon}
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                🚧 Página en construcción
              </h3>
              <p className="text-muted-foreground">
                Estamos trabajando en crear el mejor contenido para ti. 
                ¡Pronto tendrás acceso a esta sección!
              </p>
            </div>
            
            <div className="border-t border-border pt-6 space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                ¿Quieres que prioricemos esta página? ¡Déjanos saber!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <Link to="/politica" className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <span>Política</span>
                </Link>

                <Link to="/privacidad" className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <span>Privacidad</span>
                </Link>

                <Link to="/cookies" className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <span>Cookies</span>
                </Link>

                <Link to="/terminos" className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <span>Términos</span>
                </Link>

                <a href="https://www.youtube.com/@TutorialTechKids" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-accent hover:bg-brand-purple-light text-white px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <span>Tutoriales (YouTube)</span>
                </a>

                <Link to="/" className="flex items-center justify-center space-x-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al inicio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
