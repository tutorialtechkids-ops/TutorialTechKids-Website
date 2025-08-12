import { Link } from "react-router-dom";
import { Brain, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F75429be7c5c14d53944e7223414b1226%2F335b8a9d39094c17b6860854819efdd4?format=webp&width=150"
                alt="TutorialTechKids Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Educación tecnológica accesible y divertida para niños y jóvenes hispanohablantes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Aprende</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tutoriales" className="text-muted-foreground hover:text-primary transition-colors">Tutoriales</Link></li>
              <li><Link to="/canva" className="text-muted-foreground hover:text-primary transition-colors">Diseño en Canva</Link></li>
              <li><Link to="/mini-hacks" className="text-muted-foreground hover:text-primary transition-colors">Mini-hacks</Link></li>
              <li><Link to="/trucos" className="text-muted-foreground hover:text-primary transition-colors">Trucos tecnológicos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre-nosotros" className="text-muted-foreground hover:text-primary transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/mision-vision" className="text-muted-foreground hover:text-primary transition-colors">Misión y Visión</Link></li>
              <li><Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:tutorialtechkids@gmail.com" className="hover:text-primary transition-colors">
                  tutorialtechkids@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 TutorialTechKids. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
              Términos de Uso
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
