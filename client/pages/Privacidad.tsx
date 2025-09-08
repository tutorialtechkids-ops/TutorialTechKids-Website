import { Shield } from "lucide-react";

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Política de Privacidad</h1>
            <p className="text-muted-foreground mt-2">Tu privacidad y seguridad son nuestra prioridad.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <p className="text-muted-foreground">Recopilamos solo los datos necesarios (correo, nombre si te suscribes).</p>
            <p className="text-muted-foreground">Usamos los datos para enviar actualizaciones, mejorar servicios y contenido.</p>
            <p className="text-muted-foreground">No compartimos información con terceros sin tu consentimiento.</p>
            <p className="text-muted-foreground">Tomamos medidas de seguridad para proteger tus datos.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
