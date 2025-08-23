import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Crown, Menu, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { LoginForm } from "./LoginForm";

export function Header() {
  const { user, logout, isAdmin, isAuthenticated } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <LoginForm 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <header className="bg-white sticky top-0 z-50">
        {/* Simple top bar - Only logo */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand - Center */}
            <Link to="/" className="flex items-center group mx-auto">
              <h1 className="text-3xl font-bold text-black group-hover:text-primary transition-colors font-serif">
                TutorialTechKids
              </h1>
            </Link>

            {/* Mobile Menu Button - Right */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-foreground hover:text-primary transition-colors absolute right-4"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation bar - Black background with everything */}
        <div className="bg-black">
          <div className="container mx-auto px-4">
            <nav className="hidden lg:flex items-center justify-between py-3">
              {/* Left side - Navigation links */}
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Inicio
                </Link>
                <Link
                  to="/redes-sociales"
                  className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Redes Sociales
                </Link>
                <Link
                  to="/tienda"
                  className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Mi Tienda
                </Link>
                <Link
                  to="/sobre-nosotros"
                  className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Sobre nosotros
                </Link>
                <Link
                  to="/contacto"
                  className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  Contacto
                </Link>
              </div>

              {/* Right side - User area */}
              <div className="flex items-center space-x-4">
                {isAuthenticated() ? (
                  <div className="flex items-center space-x-3">
                    {isAdmin() && (
                      <div className="flex items-center space-x-1 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        <Crown className="h-4 w-4" />
                        <span>Admin</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-white">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-gray-300 hover:text-white transition-colors"
                      title="Cerrar sesión"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-white hover:text-gray-300 transition-colors font-medium text-sm uppercase tracking-wide"
                    >
                      Iniciar Sesión
                    </button>
                    <a
                      href="https://www.youtube.com/@TutorialTechKids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg text-sm uppercase tracking-wide"
                    >
                      Comenzar
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-black">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-6">
                <Link
                  to="/"
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2 uppercase tracking-wide"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/redes-sociales"
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2 uppercase tracking-wide"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Redes Sociales
                </Link>
                <Link
                  to="/tienda"
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2 uppercase tracking-wide"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Mi Tienda
                </Link>
                <Link
                  to="/sobre-nosotros"
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2 uppercase tracking-wide"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sobre nosotros
                </Link>
                <Link
                  to="/contacto"
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2 uppercase tracking-wide"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contacto
                </Link>
              </nav>

              {/* Mobile User Area */}
              <div className="border-t border-gray-600 pt-4">
                {isAuthenticated() ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-white">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user?.name}</span>
                      {isAdmin() && (
                        <div className="flex items-center space-x-1 bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
                          <Crown className="h-3 w-3" />
                          <span>Admin</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setShowMobileMenu(false);
                      }}
                      className="block text-white hover:text-gray-300 transition-colors font-medium uppercase tracking-wide"
                    >
                      Iniciar Sesión
                    </button>
                    <a
                      href="https://www.youtube.com/@TutorialTechKids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg text-center uppercase tracking-wide"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Comenzar
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
