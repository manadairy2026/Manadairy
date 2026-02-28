import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
        : "bg-black/10 backdrop-blur-sm py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${isScrolled ? "border-primary/20" : "border-white/20 shadow-lg"
              } group-hover:scale-110 duration-300`}>
              <img src="/favicon.png" alt="Mana Dairy Logo" className="w-full h-full object-cover" />
            </div>
            <span className={`text-2xl font-display font-bold transition-colors ${isScrolled ? "text-primary" : "text-white"
              } group-hover:text-secondary drop-shadow-sm`}>
              Mana Dairy
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${isScrolled ? "text-foreground/80" : "text-white drop-shadow-md"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button
              asChild
              className="rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <a href="#subscribe">Order Now</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-foreground" : "text-white"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-border">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/80 hover:text-primary font-medium p-2 rounded-lg hover:bg-muted"
              >
                {link.name}
              </a>
            ))}
            <Button asChild className="w-full rounded-full mt-2">
              <a href="#subscribe" onClick={() => setIsMobileMenuOpen(false)}>
                Order Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
