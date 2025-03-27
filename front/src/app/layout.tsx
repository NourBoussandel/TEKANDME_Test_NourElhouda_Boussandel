import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ReactNode } from 'react';
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Mon application</title>
        {/* Ajout du lien Bootstrap Icons dans le head */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
        />
        
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
