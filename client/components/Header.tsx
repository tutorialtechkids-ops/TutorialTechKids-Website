import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, User, LogOut, Crown, Search, Menu, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { LoginForm } from "./LoginForm";

export function Header() {
  const { user, logout, isAdmin, isAuthenticated } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <LoginForm 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="relative">
                <h1 className="text-2xl font-bold text-primary group-hover:text-brand-blue-light transition-colors">
                  TutorialTechKids
                </h1>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar tutoriales, tips, recursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-muted/30 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                />
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6 flex-shrink-0">
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

            <div className="flex items-center space-x-4 flex-shrink-0">
              {isAuthenticated() ? (
                <div className="flex items-center space-x-3">
                  {isAdmin() && (
                    <div className="flex items-center space-x-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      <Crown className="h-4 w-4" />
                      <span>Admin</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-foreground">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    Iniciar Sesión
                  </button>
                  <a 
                    href="https://www.youtube.com/@TutorialTechKids"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg inline-block"
                  >
                    Comenzar
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
