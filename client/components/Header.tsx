import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Crown, Search, Menu, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { LoginForm } from "./LoginForm";

export function Header() {
  const { user, logout, isAdmin, isAuthenticated } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <>
      <LoginForm 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <header className="bg-white sticky top-0 z-50">
        {/* Top bar similar to HappyDownloads */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Logo/Brand - Left */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <h1 className="text-3xl font-bold text-black group-hover:text-primary transition-colors font-serif">
                TutorialTechKids
              </h1>
            </Link>

            {/* Search Bar - Center, prominent */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar tutoriales, tips, recursos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md text-lg focus:border-primary focus:outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
                  </button>
                </div>
              </form>
            </div>

            {/* User area - Right */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-foreground hover:text-primary transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Desktop User Area */}
              <div className="hidden lg:flex items-center space-x-3">
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
        </div>

        {/* Navigation bar - Black background like HappyDownloads */}
        <div className="bg-black">
          <div className="container mx-auto px-4">
            <nav className="hidden lg:flex items-center justify-center space-x-8 py-3">
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
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar tutoriales, tips, recursos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md text-lg focus:border-primary focus:outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-3 mb-4">
                <Link 
                  to="/" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/redes-sociales" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Redes Sociales
                </Link>
                <Link 
                  to="/tienda" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Mi Tienda
                </Link>
                <Link 
                  to="/sobre-nosotros" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sobre nosotros
                </Link>
                <Link 
                  to="/contacto" 
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contacto
                </Link>
              </nav>

              {/* Mobile User Area */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated() ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-foreground">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{user?.name}</span>
                      {isAdmin() && (
                        <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
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
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
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
                      className="block text-foreground hover:text-primary transition-colors font-medium"
                    >
                      Iniciar Sesión
                    </button>
                    <a 
                      href="https://www.youtube.com/@TutorialTechKids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg text-center"
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
