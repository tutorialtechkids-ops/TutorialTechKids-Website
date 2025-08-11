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
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/"
                  className="flex items-center justify-center space-x-2 bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al inicio</span>
                </Link>
                <Link 
                  to="/contacto"
                  className="flex items-center justify-center space-x-2 bg-accent hover:bg-brand-purple-light text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                >
                  <span>Contactar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
