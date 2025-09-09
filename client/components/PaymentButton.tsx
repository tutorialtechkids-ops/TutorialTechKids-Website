import { useState } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";

interface PaymentButtonProps {
  onSuccess: () => void;
  amount: number;
  productName: string;
}

export function PaymentButton({ onSuccess, amount, productName }: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      alert("¡Pago procesado exitosamente! Ahora puedes acceder a tu producto.");
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!showCardForm) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowCardForm(true)}
          className="w-full bg-primary hover:bg-brand-blue-light text-primary-foreground py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
        >
          <CreditCard className="h-5 w-5" />
          <span>Pagar ${amount} USD</span>
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Check className="h-4 w-4 text-green-600" />
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="h-4 w-4 text-green-600" />
              <span>SSL encriptado</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="h-4 w-4 text-green-600" />
              <span>Garantía 100%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="bg-muted/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground">{productName}</span>
          <span className="font-bold text-primary">${amount} USD</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Acceso inmediato al formulario de personalización
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Número de tarjeta
          </label>
          <input
            type="text"
            value={cardData.cardNumber}
            onChange={(e) => setCardData(prev => ({ 
              ...prev, 
              cardNumber: formatCardNumber(e.target.value) 
            }))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Fecha de vencimiento
            </label>
            <input
              type="text"
              value={cardData.expiryDate}
              onChange={(e) => setCardData(prev => ({ 
                ...prev, 
                expiryDate: formatExpiryDate(e.target.value) 
              }))}
              placeholder="MM/AA"
              maxLength={5}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cardData.cvv}
              onChange={(e) => setCardData(prev => ({ 
                ...prev, 
                cvv: e.target.value.replace(/[^0-9]/g, '').substring(0, 4) 
              }))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nombre en la tarjeta
          </label>
          <input
            type="text"
            value={cardData.cardName}
            onChange={(e) => setCardData(prev => ({ ...prev, cardName: e.target.value }))}
            placeholder="Juan Pérez"
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-800 font-medium">Simulación de pago</p>
            <p className="text-amber-700">
              Este es un demo. No se procesará ningún pago real. 
              Usa cualquier información para probar el formulario.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setShowCardForm(false)}
          className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-3 px-4 rounded-xl font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-primary hover:bg-brand-blue-light disabled:bg-muted disabled:text-muted-foreground text-primary-foreground py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              <span>Pagar ${amount} USD</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
