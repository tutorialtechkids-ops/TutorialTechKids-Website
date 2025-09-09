import { CheckCircle, Download, Youtube, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Gracias() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-primary">¡Gracias por tu</span> <span className="text-accent">compra!</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tu pedido está siendo procesado. Te notificaremos cuando esté listo.
            </p>
          </div>

          {/* Thank You Card */}
          <div className="bg-gradient-to-r from-primary/5 via-white to-accent/5 border-2 border-primary/20 rounded-3xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Mensaje del Creador
              </h2>
              
              <div className="text-left bg-white rounded-2xl p-6 shadow-sm">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">¡Hola!</strong>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Muchas gracias por confiar en TutorialTechKids y por adquirir tu Planner Digital Personalizado. 
                  Me emociona mucho poder crear algo especial que te ayude a organizarte y ser más productivo.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Estamos preparando tu contenido. Recibirás una notificación por correo cuando esté listo.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mientras tanto, puedes visitar nuestro canal de YouTube para más tutoriales y recursos.
                </p>
                <p className="text-foreground font-medium">
                  ¡Gracias por ser parte de la comunidad TutorialTechKids! 🚀
                </p>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  - Equipo TutorialTechKids
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Tu Planner</h3>
              <p className="text-muted-foreground text-sm">
                Recibirás tu planner personalizado en tu correo electrónico en las próximas horas
              </p>
            </div>

            <div className="bg-white border-2 border-red-200 rounded-2xl p-6 text-center space-y-4">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Youtube className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Mientras Esperas</h3>
              <p className="text-muted-foreground text-sm">
                Visita nuestro canal para tutoriales sobre productividad y tecnología
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="https://www.youtube.com/@TutorialTechKids"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Youtube className="h-5 w-5" />
              <span>Ver Canal de YouTube</span>
            </a>
            
            <Link
              to="/"
              className="bg-primary hover:bg-brand-blue-light text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Volver al Inicio</span>
            </Link>
          </div>

          {/* Support Info */}
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Tienes alguna pregunta? Nuestro bot de soporte está disponible las 24 horas.{" "}
              <Link to="/contacto" className="text-primary hover:underline font-medium">
                Contáctanos aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
