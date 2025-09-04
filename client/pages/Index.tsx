import { Brain, Target, Eye, Heart, Shield, Lightbulb, Users, Sparkles, Palette, Smartphone, Cpu, ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F75429be7c5c14d53944e7223414b1226%2Fc5904ce66f4149d4807a7346fef65976?format=webp&width=400"
                alt="TutorialTechKids Logo"
                className="h-32 w-auto hover:scale-105 transition-transform"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-primary">TutorialTech</span>
              <span className="text-accent">Kids</span>
              <br />
              <span className="text-2xl md:text-4xl text-muted-foreground font-medium">
                Tecnología para niños y jóvenes
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Aprende tecnología de forma divertida y sencilla. Tutoriales prácticos,
              mini-hacks creativos y consejos tecnológicos diseñados especialmente para ti.
            </p>

            <div className="flex justify-center">
              <a
                href="https://www.youtube.com/@TutorialTechKids"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-brand-purple-light text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center space-x-2 shadow-xl"
              >
                <ArrowRight className="h-5 w-5" />
                <span>Ver tutoriales</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Qué aprenderás aquí?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En TutorialTechKids, aprenderás tecnología de forma divertida y sencilla. 
              Nos enfocamos en proyectos pequeños y prácticos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Diseño en Canva</h3>
              <p className="text-muted-foreground">
                Crear diseños creativos y profesionales usando las herramientas más populares.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Mini-hacks</h3>
              <p className="text-muted-foreground">
                Trucos para aprovechar mejor tus aplicaciones y dispositivos favoritos.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Trucos tecnológicos</h3>
              <p className="text-muted-foreground">
                Consejos fáciles para el día a día que harán tu vida digital más eficiente.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Herramientas digitales</h3>
              <p className="text-muted-foreground">
                Aprende a usar herramientas digitales de forma más eficiente y productiva.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground bg-muted/50 rounded-xl p-6 max-w-2xl mx-auto">
              Con el tiempo, iremos explorando programación y proyectos más avanzados, pero siempre empezando
              con pasos pequeños y fáciles de seguir.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
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

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
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

      {/* Values Section */}
      <section className="py-20 bg-white">
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
                <Sparkles className="h-8 w-8 text-accent" />
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

            <div className="text-center space-y-4 md:col-span-2 lg:col-span-1">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Seguridad</h3>
              <p className="text-muted-foreground">Protección de la privacidad y confianza de nuestros usuarios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              ¿Listo para comenzar tu aventura tecnológica?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Únete a miles de niños y jóvenes que ya están aprendiendo tecnología de forma divertida
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 hover:shadow-lg hover:scale-105">
                Explorar tutoriales
              </button>
              <button className="bg-accent hover:bg-brand-purple-light text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 hover:shadow-lg hover:scale-105">
                Suscribirse gratis
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
