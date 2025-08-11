import { FileText } from "lucide-react";
import { PlaceholderPage } from "../components/PlaceholderPage";

export default function Terminos() {
  return (
    <PlaceholderPage 
      title="Términos de Uso"
      description="Las condiciones y reglas para usar TutorialTechKids de forma segura y responsable."
      icon={<FileText className="h-12 w-12 text-accent" />}
    />
  );
}
