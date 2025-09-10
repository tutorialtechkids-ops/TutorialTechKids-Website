import { Youtube, ExternalLink, Instagram, AtSign, MessageCircle } from "lucide-react";
import { motion } from 'framer-motion';

export default function RedesSociales() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          
          {/* Header */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Nuestras</span> <span className="text-accent">Redes Sociales</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Síguenos en YouTube para tutoriales completos, tips tecnológicos y contenido educativo 
              diseñado especialmente para niños y jóvenes.
            </p>
          </div>

          {/* YouTube Section */}
          <div className="bg-white border-2 border-red-100 rounded-3xl p-12 hover:border-red-200 transition-all duration-300 hover:shadow-2xl">
            <div className="text-center space-y-8">
              
              {/* YouTube Icon */}
              <div className="flex justify-center">
                <div className="bg-red-500 w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl">
                  <Youtube className="h-12 w-12 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Canal de YouTube TutorialTechKids
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Nuestro canal principal donde publicamos tutoriales paso a paso, explicaciones tecnológicas
                  fáciles de entender y contenido educativo que ayuda a niños y jóvenes a aprender tecnología
                  de forma divertida y práctica.
                </p>
              </motion.div>

              {/* Social icons row */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center space-x-6 my-6">
                <a href="https://www.instagram.com/tutorialtechkids" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col text-center text-foreground hover:text-primary transition-colors">
                  <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-4 rounded-2xl shadow-md flex items-center justify-center w-16 h-16">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-sm">Instagram</span>
                </a>

                <a href="https://www.threads.net/@tutorialtechkids" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col text-center text-foreground hover:text-primary transition-colors">
                  <div className="bg-gray-900 p-4 rounded-2xl shadow-md flex items-center justify-center w-16 h-16">
                    <AtSign className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-sm">Threads</span>
                </a>

                <a href="https://whatsapp.com/channel/0029VaTutorialTechKids" target="_blank" rel="noopener noreferrer" className="flex items-center flex-col text-center text-foreground hover:text-primary transition-colors">
                  <div className="bg-green-500 p-4 rounded-2xl shadow-md flex items-center justify-center w-16 h-16">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-sm">WhatsApp</span>
                </a>
              </motion.div>

              {/* What you'll find */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <div className="text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎥</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Tutoriales Completos</h3>
                  <p className="text-sm text-muted-foreground">Videos paso a paso fáciles de seguir</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Tips y Trucos</h3>
                  <p className="text-sm text-muted-foreground">Consejos rápidos para el día a día</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-foreground">Contenido Nuevo</h3>
                  <p className="text-sm text-muted-foreground">Videos nuevos regularmente</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <a
                  href="https://www.youtube.com/@TutorialTechKids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-200 hover:shadow-xl hover:scale-105"
                >
                  <Youtube className="h-7 w-7" />
                  <span>Ir al Canal de YouTube</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
                
                <p className="text-sm text-muted-foreground">
                  ¡Es gratis! Solo necesitas hacer clic para empezar a aprender
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                ¿Tienes alguna sugerencia para nuestros videos?
              </h3>
              <p className="text-muted-foreground">
                Nos encantaría saber qué temas te gustaría que cubramos en nuestros próximos tutoriales.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-brand-blue-light text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
              >
                <span>Contáctanos</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
