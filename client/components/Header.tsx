import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Crown, Menu, X, ShoppingCart, Youtube, Instagram, MessageCircle, AtSign } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useLanguage } from "../contexts/LanguageContext";
import { LoginForm } from "./LoginForm";

export function Header() {
  const { user, logout, isAdmin, isAuthenticated } = useUser();
  const { t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <LoginForm 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          {/* Logo/Brand - Center */}
          <div className="text-center mb-4">
            <Link to="/" className="inline-block group">
              <h1 className="text-3xl font-bold text-black group-hover:text-primary transition-colors">
                TutorialTechKids
              </h1>
            </Link>
          </div>

          {/* Navigation - Below logo */}
          <div className="flex items-center justify-between">
            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center space-x-8 mx-auto">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/redes-sociales"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.social')}
              </Link>
              <Link
                to="/tienda"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.store')}
              </Link>
              <Link
                to="/sobre-nosotros"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contacto"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* User area - Right */}
            <div className="hidden lg:flex items-center space-x-4 absolute right-4">
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
                  <Link to="/carrito" className="text-foreground hover:text-primary transition-colors ml-2" title="Carrito">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/carrito" className="text-foreground hover:text-primary transition-colors mr-2" title="Carrito">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {t('nav.login')}
                  </button>
                  <a
                    href="https://www.youtube.com/@TutorialTechKids"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    {t('nav.start')}
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-foreground hover:text-primary transition-colors absolute right-4"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation - brand centered on top */}
              <div className="text-center mb-4">
                <Link to="/" className="inline-block">
                  <h2 className="text-2xl font-bold">TutorialTechKids</h2>
                </Link>
              </div>

              <nav className="space-y-4 mb-6">
                <Link
                  to="/"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/redes-sociales"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('nav.social')}
                </Link>
                <Link
                  to="/tienda"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('nav.store')}
                </Link>
                <Link
                  to="/sobre-nosotros"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('nav.about')}
                </Link>
                <Link
                  to="/contacto"
                  className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('nav.contact')}
                </Link>
              </nav>

              {/* Mobile User Area */}
              <div className="border-t border-border pt-4">
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
                    <div className="flex items-center space-x-4">
                      <Link to="/carrito" className="text-foreground hover:text-primary transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                      </Link>
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
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-4">
                      <Link to="/carrito" className="text-foreground hover:text-primary transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setShowMobileMenu(false);
                        }}
                        className="block text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {t('nav.login')}
                      </button>
                    </div>

                    <a
                      href="https://www.youtube.com/@TutorialTechKids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-primary hover:bg-brand-blue-light text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg text-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('nav.start')}
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
