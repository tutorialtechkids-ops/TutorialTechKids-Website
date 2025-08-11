import { Shield } from "lucide-react";
import { PlaceholderPage } from "../components/PlaceholderPage";

export default function Privacidad() {
  return (
    <PlaceholderPage 
      title="Política de Privacidad"
      description="Tu privacidad y seguridad son nuestra prioridad. Aquí encontrarás toda la información sobre cómo protegemos tus datos."
      icon={<Shield className="h-12 w-12 text-primary" />}
    />
  );
}
