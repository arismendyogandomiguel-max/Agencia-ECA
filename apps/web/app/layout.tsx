import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estudio Creativo Agéntico — Alihas Sovereign Hub',
  description: 'Estudio Creativo Agéntico impulsado por Alihas: generación, edición y monetización de contenido omnicanal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased min-h-screen bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
