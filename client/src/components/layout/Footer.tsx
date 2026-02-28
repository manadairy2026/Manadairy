import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              🥛 Mana Dairy
            </h3>
            <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
              Pure, fresh, and organic cow milk delivered directly from our farm to your doorstep. We believe in providing the healthiest dairy products for your family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Support</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-secondary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-secondary mt-0.5" />
                <span>123 Farm View Road, Green Valley District, Dairy State, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-secondary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-secondary" />
                <span>hello@manadairy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mana Dairy. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with ❤️ for pure health.</p>
        </div>
      </div>
    </footer>
  );
}
