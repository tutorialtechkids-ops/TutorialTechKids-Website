import { FileText } from "lucide-react";

export default function Terminos() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Términos de Uso</h1>
            <p className="text-muted-foreground mt-2">Condiciones y reglas para usar TutorialTechKids.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <p className="text-muted-foreground">Contenido educativo y de entretenimiento.</p>
            <p className="text-muted-foreground">No nos hacemos responsables por uso indebido de la información.</p>
            <p className="text-muted-foreground">Todos los materiales son propiedad de TutorialTechKids salvo que se indique lo contrario.</p>
            <p className="text-muted-foreground">Podemos actualizar estos términos cuando sea necesario.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
