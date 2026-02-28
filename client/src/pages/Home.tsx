import { motion } from "framer-motion";
import { Droplet, ShieldCheck, Sun, ThermometerSnowflake, CheckCircle2, Truck, Calendar, MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SubscriptionForm } from "@/components/sections/SubscriptionForm";
import { Button } from "@/components/ui/button";

// Product Data
const products = [
  { id: 1, name: "Full Cream Milk", price: "₹60/L", description: "Rich, creamy, and packed with essential nutrients.", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Toned Milk", price: "₹50/L", description: "Perfect balance of nutrition and lightness for daily use.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Double Toned", price: "₹45/L", description: "Low fat milk ideal for fitness enthusiasts.", image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Flavoured Milk", price: "₹35/200ml", description: "Delicious organic flavors loved by kids.", image: "https://images.unsplash.com/photo-1572913017567-02f0649aebeb?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Paneer Fresh", price: "₹80/200g", description: "Soft, malai paneer made from 100% cow milk.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Desi Ghee", price: "₹600/500ml", description: "Traditional bilona ghee with rich aroma.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800" },
];

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      {/* landing page hero scenic mountain landscape cows */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596731056586-b48fb50b92db?auto=format&fit=crop&q=80&w=2000" 
            alt="Farm landscape at sunrise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg leading-tight"
          >
            Pure. Fresh. <br className="hidden md:block"/>
            <span className="text-secondary">Delivered Daily.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/90 mb-10 drop-shadow-md max-w-2xl mx-auto text-balance"
          >
            Farm-fresh cow milk from Mana Dairy, delivered directly to your doorstep every morning before you wake up.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0" asChild>
              <a href="#subscribe">Order Now</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 shadow-lg bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 transition-all" asChild>
              <a href="#products">See Our Products</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="relative z-20 -mt-16 mb-24 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 divide-x-0 md:divide-x divide-border">
            {[
              { icon: Droplet, text: "100% Pure Cow Milk", color: "text-blue-500" },
              { icon: ShieldCheck, text: "No Preservatives", color: "text-green-500" },
              { icon: Sun, text: "Daily Morning Delivery", color: "text-secondary" },
              { icon: ThermometerSnowflake, text: "Always Fresh & Cold", color: "text-cyan-500" },
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 group">
                <div className={`p-4 rounded-full bg-slate-50 mb-4 group-hover:scale-110 transition-transform ${badge.color}`}>
                  <badge.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground">{badge.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">From Our Farm</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">Our Premium Products</h3>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-border/40">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-primary shadow-sm">
                    {product.price}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-display font-bold mb-2">{product.name}</h4>
                  <p className="text-muted-foreground mb-6 h-12">{product.description}</p>
                  <Button className="w-full rounded-xl py-6 font-semibold" variant="default" asChild>
                    <a href="#subscribe">Add to Order</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Simple Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">How It Works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Calendar, title: "1. Choose Your Plan", desc: "Select products, quantity, and delivery frequency that suits your family." },
              { icon: MapPin, title: "2. Set Your Address", desc: "Provide your delivery location. We deliver across the city." },
              { icon: Truck, title: "3. Receive Fresh Milk", desc: "Wake up to fresh, chilled milk at your doorstep every morning." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-secondary text-primary flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                  <step.icon size={40} />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">{step.title}</h4>
                <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION FORM */}
      <section id="subscribe" className="py-24 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Start Your Journey</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Subscribe to Freshness</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Fill out the form below to start your daily milk delivery. No commitments, pause or cancel anytime.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SubscriptionForm />
          </motion.div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary/20 rounded-3xl transform -rotate-3"></div>
              {/* farmer cow farm portrait */}
              <img 
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1000" 
                alt="Farmer with cows" 
                className="relative rounded-3xl shadow-2xl object-cover h-[600px] w-full"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <h4 className="font-display text-4xl font-bold text-secondary mb-1">100%</h4>
                <p className="font-medium text-lg text-white">Organic Promise</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Story</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">From Our Family to Yours</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Mana Dairy started with a simple vision: to bring back the authentic taste and nutrition of real, unadulterated cow milk. What began as a small farm has now grown into a trusted community source for pure dairy.
              </p>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Our cows roam freely, graze on organic pastures, and are treated with love and care. This directly reflects in the quality, taste, and richness of the milk we deliver to your home.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "50+", text: "Healthy Cows" },
                  { num: "500+", text: "Happy Families" },
                  { num: "5 Yrs", text: "Fresh Delivery" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-background rounded-2xl border border-border/50">
                    <h4 className="text-3xl font-display font-bold text-primary mb-2">{stat.num}</h4>
                    <p className="text-sm font-medium text-muted-foreground">{stat.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Community Love</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">What Our Customers Say</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The quality of Mana Dairy milk is unmatched. It reminds me of the pure milk we used to get in my childhood. My kids absolutely love it!", author: "Priya Sharma", role: "Mother of two" },
              { text: "Switched to Mana Dairy 6 months ago and I can see the difference in my health. The doorstep delivery is so reliable, even on rainy days.", author: "Rahul Verma", role: "Fitness Enthusiast" },
              { text: "Their paneer is the softest I've ever had. It makes my cooking so much better. Highly recommend their entire product range!", author: "Anjali Desai", role: "Home Chef" }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-md border border-border/40 relative"
              >
                <div className="text-secondary mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-foreground/80 text-lg mb-8 italic">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-4 bg-white border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">We're Here to Help</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-background rounded-3xl overflow-hidden shadow-lg border border-border/50">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h4 className="text-2xl font-display font-bold mb-8">Contact Information</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Farm Address</h5>
                    <p className="text-muted-foreground leading-relaxed">123 Farm View Road, Green Valley District, Dairy State, 12345</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Phone Number</h5>
                    <p className="text-muted-foreground leading-relaxed">+91 98765 43210<br/>Mon-Sat: 8AM - 8PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Email Address</h5>
                    <p className="text-muted-foreground leading-relaxed">hello@manadairy.com<br/>support@manadairy.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] lg:h-auto w-full bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
