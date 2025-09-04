import { Youtube, Instagram, Facebook, Twitter, MessageCircle, ExternalLink, AtSign } from "lucide-react";

export function SocialMediaSection() {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@TutorialTechKids",
      description: "Tutoriales en video paso a paso",
      color: "bg-red-500 hover:bg-red-600",
      followers: "Suscríbete"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/tutorialtechkids?igsh=a2tyeW4zdXFobGJy&utm_source=qr",
      description: "Tips rápidos y contenido visual",
      color: "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      followers: "Síguenos"
    },
    {
      name: "WhatsApp Canal",
      icon: MessageCircle,
      url: "https://whatsapp.com/channel/0029Vb6jo6QDJ6Guhth6rS1v",
      description: "Únete a nuestro canal en WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      followers: "Unirse"
    },
    {
      name: "Threads",
      icon: AtSign,
      url: "https://www.threads.net/@tutorialtechkids?igshid=NTc4MTIwNjQ2YQ==",
      description: "Conversaciones y actualizaciones",
      color: "bg-black hover:bg-gray-800",
      followers: "Seguir"
    },
    {
      name: "TikTok",
      icon: MessageCircle,
      url: "https://tiktok.com/@tutorialtechkids",
      description: "Videos cortos y trucos rápidos",
      color: "bg-black hover:bg-gray-800",
      followers: "Síguenos"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/tutorialtechkids",
      description: "Comunidad y discusiones",
      color: "bg-blue-600 hover:bg-blue-700",
      followers: "Únete"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Nuestras</span> <span className="text-accent">Redes Sociales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Síguenos en todas nuestras plataformas para no perderte ningún tutorial, 
            tip o novedad del mundo tech para niños y jóvenes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="text-center space-y-4">
                  <div className={`${social.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {social.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {social.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 text-primary font-medium text-sm group-hover:text-accent transition-colors">
                      <span>{social.followers}</span>
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Featured YouTube Channel */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-white to-accent/10 border-2 border-primary/20 rounded-3xl p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-red-500 w-20 h-20 rounded-2xl flex items-center justify-center">
                  <Youtube className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  ¡Suscríbete a nuestro canal de YouTube!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contenido exclusivo, tutoriales completos y lives semanales. 
                  Únete a nuestra comunidad de jóvenes tech.
                </p>
              </div>

              <a
                href="https://www.youtube.com/@TutorialTechKids"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <Youtube className="h-6 w-6" />
                <span>Suscribirse Gratis</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">50+</div>
                  <div>Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">1K+</div>
                  <div>Suscriptores</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">10K+</div>
                  <div>Visualizaciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
