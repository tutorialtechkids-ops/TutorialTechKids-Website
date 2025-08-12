import { Target, Eye, Heart, Shield, Users, Lightbulb, FileText, Lock, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export default function SobreNosotros() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-primary">Sobre</span> <span className="text-accent">Nosotros</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Conoce más sobre TutorialTechKids, nuestros valores, objetivos y el compromiso 
              que tenemos contigo y con la educación tecnológica.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Nuestra Misión</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Brindar contenido educativo tecnológico accesible, claro y actualizado para niños y jóvenes, 
              fomentando la curiosidad, el pensamiento crítico y la creatividad a través de tutoriales 
              prácticos y recursos digitales.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Nuestra Visión</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Ser una plataforma líder en educación tecnológica para niños y jóvenes hispanohablantes, 
              impulsando el aprendizaje autónomo y el desarrollo de habilidades digitales que apoyen 
              su crecimiento personal y profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Valores</h2>
            <p className="text-lg text-muted-foreground">Los principios que guían nuestro trabajo educativo</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Educación accesible</h3>
              <p className="text-muted-foreground">Tecnología para todos, sin complicaciones ni barreras.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Innovación</h3>
              <p className="text-muted-foreground">Siempre a la vanguardia en tecnología y métodos de enseñanza.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Transparencia</h3>
              <p className="text-muted-foreground">Comunicación clara y honesta con nuestra comunidad.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Creatividad</h3>
              <p className="text-muted-foreground">Estimular el pensamiento innovador y la solución de problemas.</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Seguridad</h3>
              <p className="text-muted-foreground">Protección de la privacidad y confianza de nuestros usuarios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Políticas y Transparencia
              </h2>
              <p className="text-lg text-muted-foreground">
                Tu confianza es importante para nosotros. Conoce nuestras políticas y compromisos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/privacidad"
                className="bg-white border-2 border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Política de Privacidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Cómo protegemos y manejamos tu información personal de manera segura.
                  </p>
                </div>
              </Link>

              <Link 
                to="/terminos"
                className="bg-white border-2 border-accent/20 rounded-2xl p-6 hover:border-accent/40 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="text-center space-y-4">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Términos de Uso</h3>
                  <p className="text-sm text-muted-foreground">
                    Las reglas y condiciones para usar nuestros servicios de manera responsable.
                  </p>
                </div>
              </Link>

              <Link 
                to="/cookies"
                className="bg-white border-2 border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-200 hover:shadow-lg group"
              >
                <div className="text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Cookie className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Política de Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Información sobre las cookies que utilizamos y cómo mejoran tu experiencia.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              ¿Tienes alguna pregunta sobre nosotros?
            </h3>
            <p className="text-lg text-muted-foreground">
              Estamos aquí para ayudarte. No dudes en contactarnos si necesitas más información.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-brand-blue-light text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <span>Contáctanos</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
