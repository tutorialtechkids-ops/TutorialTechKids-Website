import { Cookie } from "lucide-react";
import { PlaceholderPage } from "../components/PlaceholderPage";

export default function Cookies() {
  return (
    <PlaceholderPage 
      title="Política de Cookies"
      description="Información sobre qué cookies utilizamos y cómo mejoran tu experiencia en TutorialTechKids."
      icon={<Cookie className="h-12 w-12 text-brand-purple" />}
    />
  );
}
