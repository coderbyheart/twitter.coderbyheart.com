import React from "react";
import Lightbox from "./Lightbox";
import "./global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <header className="site-header">
        <a href="/" className="site-title">
          @coderbyheart on Twitter
        </a>
        <p className="site-tagline">A static archive of Markus Tacker's tweets.</p>
      </header>
      <main className="site-main">{children}</main>
      <Lightbox />
    </div>
  );
}
