import { ShoppingBag, Star, Check, Palette, Smartphone, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function Tienda() {
  const handlePurchase = () => {
    // This will redirect to the customization form after payment
    window.location.href = "/planner-personalizado";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Header Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mi Tienda
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Productos digitales personalizados para organizar tu vida de manera creativa y eficiente
            </p>
          </div>

          {/* Featured Product */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Product Image/Preview */}
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
                        <div className="space-y-2">
                          <div className="h-2 bg-accent/30 rounded w-20 mx-auto"></div>
                          <div className="h-2 bg-primary/30 rounded w-16 mx-auto"></div>
                          <div className="h-2 bg-accent/30 rounded w-12 mx-auto"></div>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                        ¡Nuevo!
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vista previa del planner personalizado
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(127 reseñas)</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                        Planner Digital Personalizado
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Crea tu planner digital completamente personalizado. Elige colores, estilos, 
                        organización y más. Compatible con iPad, Android, GoodNotes y otras apps.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Completamente personalizable</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Compatible con todas las apps principales</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Múltiples opciones de color y estilo</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Entrega inmediata tras personalización</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Incluye guía de instalación</span>
                      </div>
                    </div>

                    {/* Price and Purchase */}
                    <div className="border-t border-border pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-3xl font-bold text-primary">$10</span>
                          <span className="text-sm text-muted-foreground ml-2">USD</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Descarga inmediata</div>
                          <div className="text-sm text-green-600 font-medium">✓ Pago seguro</div>
                        </div>
                      </div>

                      <button
                        onClick={handlePurchase}
                        className="w-full bg-primary hover:bg-brand-blue-light text-primary-foreground py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Personalizar y Comprar</span>
                      </button>

                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Tras el pago, accederás al formulario de personalización
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
              ¿Cómo funciona?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">Compra</h4>
                <p className="text-muted-foreground">
                  Realiza tu pago seguro de $10 y accede inmediatamente al proceso de personalización.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">Personaliza</h4>
                <p className="text-muted-foreground">
                  Completa el formulario detallado con tus preferencias de colores, estilo y organización.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Recibe</h4>
                <p className="text-muted-foreground">
                  Obtén tu planner personalizado listo para usar en tu dispositivo favorito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
