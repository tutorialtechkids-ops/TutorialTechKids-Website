import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import Cookies from "./pages/Cookies";
import Tienda from "./pages/Tienda";
import PlannerPersonalizado from "./pages/PlannerPersonalizado";
import RedesSociales from "./pages/RedesSociales";
import Gracias from "./pages/Gracias";
import Contacto from "./pages/Contacto";
import SobreNosotros from "./pages/SobreNosotros";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { BookOpen, Phone, Users, Palette } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/planner-personalizado" element={<PlannerPersonalizado />} />
            <Route path="/redes-sociales" element={<RedesSociales />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Placeholder routes */}
            <Route 
              path="/tutoriales" 
              element={
                <PlaceholderPage 
                  title="Tutoriales"
                  description="Aprende paso a paso con nuestros tutoriales diseñados especialmente para niños y jóvenes."
                  icon={<BookOpen className="h-12 w-12 text-primary" />}
                />
              } 
            />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route 
              path="/contacto" 
              element={
                <PlaceholderPage 
                  title="Contacto"
                  description="¿Tienes preguntas o sugerencias? ¡Nos encantaría escucharte!"
                  icon={<Phone className="h-12 w-12 text-primary" />}
                />
              } 
            />
            <Route 
              path="/canva" 
              element={
                <PlaceholderPage 
                  title="Diseño en Canva"
                  description="Aprende a crear diseños increíbles con tutoriales paso a paso de Canva."
                  icon={<Palette className="h-12 w-12 text-brand-purple" />}
                />
              } 
            />
            <Route 
              path="/mini-hacks" 
              element={
                <PlaceholderPage 
                  title="Mini-hacks"
                  description="Descubre trucos geniales para aprovechar mejor tus apps y dispositivos favoritos."
                  icon={<BookOpen className="h-12 w-12 text-accent" />}
                />
              } 
            />
            <Route 
              path="/trucos" 
              element={
                <PlaceholderPage 
                  title="Trucos Tecnológicos"
                  description="Tips y consejos tecnológicos fáciles para hacer tu vida digital más eficiente."
                  icon={<BookOpen className="h-12 w-12 text-primary" />}
                />
              } 
            />
            <Route 
              path="/mision-vision" 
              element={
                <PlaceholderPage 
                  title="Misión y Visión"
                  description="Conoce más sobre nuestros objetivos y hacia dónde vamos como plataforma educativa."
                  icon={<Users className="h-12 w-12 text-brand-purple" />}
                />
              } 
            />
            <Route 
              path="/blog" 
              element={
                <PlaceholderPage 
                  title="Blog"
                  description="Artículos, noticias y contenido educativo sobre tecnología para jóvenes."
                  icon={<BookOpen className="h-12 w-12 text-accent" />}
                />
              } 
            />
            
            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
