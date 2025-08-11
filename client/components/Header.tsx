import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary group-hover:text-brand-blue-light transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">TutorialTechKids</span>
              <span className="text-xs text-muted-foreground">Tecnología para niños</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/tutoriales"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Tutoriales
            </Link>
            <Link
              to="/tienda"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Mi Tienda
            </Link>
            <Link
              to="/sobre-nosotros"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Sobre nosotros
            </Link>
            <Link
              to="/contacto"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
              Comenzar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
