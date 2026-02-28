import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Privacy() {
    const sections = [
        {
            title: "A. Information We Collect",
            items: [
                { label: "Personal Data", content: "Name, delivery address, phone number, and email address provided during registration." },
                { label: "Location Data", content: "We collect GPS location to ensure accurate delivery and help our drivers find your doorstep effortlessly." },
                { label: "Payment Info", content: "Processing is handled by secure third-party gateways (Stripe/Razorpay). We do not store your full card details." }
            ]
        },
        {
            title: "B. How We Use Your Information",
            items: [
                { label: "Subscriptsions", content: "To manage your daily milk delivery and manage your wallet balance." },
                { label: "Notifications", content: "To send automated updates regarding delivery status, billing reminders, and bottle collection alerts." },
                { label: "Optimization", content: "To analyze delivery routes and improve the efficiency of our fresh farm-to-table supply chain." }
            ]
        },
        {
            title: "C. Data Sharing",
            items: [
                { label: "Delivery Partners", content: "Your name, address, and phone number are shared with our drivers solely for the purpose of fulfilling your order." },
                { label: "Legal", content: "We may disclose information if required by law or to protect the safety of our staff and community." }
            ]
        },
        {
            title: "D. Data Security",
            items: [
                { label: "Protection", content: "We implement industry-standard AES-256 encryption to protect your data. However, as no digital system is 100% secure, using our platform acknowledges this minor risk." }
            ]
        },
        {
            title: "E. Your Rights",
            items: [
                { label: "Management", content: "You can update your profile, pause subscriptions, or delete your account at any time through the app settings." },
                { label: "Data Requests", content: "For comprehensive data deletion requests, please contact our support email at manadairy2026@gmail.com." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary underline decoration-secondary/30">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-12 italic">Version 1.0 — Last Updated: February 28, 2026</p>

                    <div className="space-y-12">
                        <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                            At <strong className="text-primary">Mana Dairy</strong>, we value the trust you place in us when you share your personal data. This policy explains how we gather, protect, and use that information.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sections.map((section, idx) => (
                                <section key={idx} className="bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                                    <h2 className="text-xl font-display font-bold text-primary mb-6">
                                        {section.title}
                                    </h2>
                                    <div className="space-y-4">
                                        {section.items.map((item, i) => (
                                            <div key={i}>
                                                <h3 className="font-bold text-sm uppercase tracking-wider text-secondary mb-1">{item.label}</h3>
                                                <p className="text-muted-foreground leading-relaxed text-sm">{item.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <section className="mt-16 bg-primary text-primary-foreground p-10 rounded-3xl shadow-xl">
                            <h2 className="text-2xl font-display font-bold mb-4">Commitment to Health & Privacy</h2>
                            <p className="text-primary-foreground/80 leading-relaxed mb-6">
                                Our farm-to-table system is designed for transparency. Your data is only used to ensure that the freshest milk reaches your table every morning without compromise.
                            </p>
                            <div className="flex items-center gap-4 text-sm font-bold">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                                <span>GDPR & CCPA Compliant Practices</span>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
