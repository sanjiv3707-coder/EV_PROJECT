import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'EV Optima | Premium Electric Mobility Dashboard',
  description: 'AI-Powered Ground EV Optimization and Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <Sidebar />
        <main className="ml-80 mr-12 py-12 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
