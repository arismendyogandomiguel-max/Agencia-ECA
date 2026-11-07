import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECA Studio — Estudio Creativo Agéntico',
  description: 'Plataforma multi-marca para generación, edición y publicación de contenido omnicanal con IA.',
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
