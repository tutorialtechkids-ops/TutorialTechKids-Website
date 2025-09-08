import { Cookie } from "lucide-react";

export default function Cookies() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Política de Cookies</h1>
            <p className="text-muted-foreground mt-2">Información sobre qué cookies utilizamos y cómo mejoran tu experiencia.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <p className="text-muted-foreground">Usamos cookies para mejorar tu experiencia y analizar tráfico.</p>
            <ul className="list-disc ml-5 text-muted-foreground space-y-1">
              <li><strong>Necesarias:</strong> navegación básica y seguridad.</li>
              <li><strong>Analíticas:</strong> entender interacción con el contenido.</li>
              <li><strong>Preferencias:</strong> idioma, tema o personalización.</li>
            </ul>
            <p className="text-muted-foreground">Puedes configurar o desactivar cookies, pero algunas funciones pueden verse afectadas.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
