import { useState } from "react";
import { User, Mail, Lock, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ isOpen, onClose, onSuccess }: LoginFormProps) {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.name);
      if (success) {
        onSuccess?.();
        onClose();
        setFormData({ email: "", name: "" });
      } else {
        alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error al conectar. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-muted-foreground text-sm">
            Identifícate para acceder a funciones especiales
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Tu Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nombre completo"
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* User Info */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Cuenta de Usuario</p>
                <p className="text-muted-foreground">
                  Inicia sesión para una experiencia personalizada y acceso a funciones especiales.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.email.trim() || !formData.name.trim()}
            className="w-full bg-primary hover:bg-brand-blue-light disabled:bg-muted disabled:text-muted-foreground text-primary-foreground py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {/* Guest Access */}
          <button
            type="button"
            onClick={onClose}
            className="w-full text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Continuar como invitado
          </button>
        </form>
      </div>
    </div>
  );
}
