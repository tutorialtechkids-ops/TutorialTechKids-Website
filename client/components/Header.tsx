import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F75429be7c5c14d53944e7223414b1226%2Fc5904ce66f4149d4807a7346fef65976?format=webp&width=200"
                alt="TutorialTechKids Logo"
                className="h-12 w-auto group-hover:scale-105 transition-transform"
              />
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
              to="/redes-sociales"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Redes Sociales
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
            <a
              href="https://www.youtube.com/@TutorialTechKids"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg inline-block"
            >
              Comenzar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
