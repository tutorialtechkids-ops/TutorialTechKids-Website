import React from 'react';
import { FileText } from 'lucide-react';

export default function Politica() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Política / Contenido Inspirador</h1>
            <p className="text-muted-foreground mt-2">Recursos y frases listas para usar en la web, blogs o Canvas.</p>
          </div>

          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Versículo bíblico</h2>
            <blockquote className="text-muted-foreground italic">“Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.” – Colosenses 3:23</blockquote>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Frases para blogs / Canvas</h2>
            <ul className="list-disc ml-5 space-y-2 text-muted-foreground">
              <li>“Aprendiendo tecnología paso a paso.”</li>
              <li>“Pequeños trucos, grandes resultados.”</li>
              <li>“Tutoriales que inspiran creatividad.”</li>
              <li>“Crea, diseña y comparte tu mundo digital.”</li>
              <li>“Tus ideas, nuestra guía.”</li>
              <li>“Explora y aprende con cada clic.”</li>
              <li>“La tecnología es la puerta, tu imaginación es la llave.”</li>
              <li>“Cada proyecto es un nuevo comienzo.”</li>
              <li>“Aprender nunca fue tan divertido.”</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
