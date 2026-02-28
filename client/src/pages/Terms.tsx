import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Terms() {
    const categories = [
        {
            title: "A. Packaging & Glass Bottle Policy",
            items: [
                { label: "Ownership", content: "All glass bottles used for delivery remain the sole property of Mana Dairy." },
                { label: "Security Deposit", content: "A one-time refundable security deposit of ₹200 for 4 bottles will be charged at the first subscription checkout." },
                { label: "Bottle Exchange", content: "We operate on a 'Full for Empty' exchange basis. Customers must place the rinsed, empty bottle from the previous delivery at the designated delivery spot before the next delivery." },
                { label: "Breakage & Loss Fee", content: "If a bottle is broken, cracked, or lost while in the customer's possession, a replacement fee of ₹50 per bottle will be charged to the customer's account." },
                { label: "Hygiene", content: "Customers are requested to rinse the bottles with plain water before returning them to maintain basic hygiene." }
            ]
        },
        {
            title: "B. Subscription & Deliveries",
            items: [
                { label: "Delivery Timing", content: "We aim to deliver by 7:30 AM. However, timings may vary due to weather, traffic, or supply chain issues." },
                { label: "Modifications", content: "Any changes to the next day's delivery (pausing or adding extra milk) must be made through the app/website before 9:00 PM the previous evening." },
                { label: "Missed Delivery", content: "In the event a delivery is missed due to the customer's fault (e.g., locked gates), the charge for the delivery will still apply." }
            ]
        },
        {
            title: "C. Payments, Refunds & Cancellations",
            items: [
                { label: "No Refund Policy", content: "Once milk is delivered, it cannot be returned or refunded due to the perishable nature of the product." },
                { label: "Prepaid Balance", content: "Balances are non-refundable but can be used for future purchases and subscriptions." }
            ]
        },
        {
            title: "D. Quality & Liability",
            items: [
                { label: "Storage", content: "Since our milk contains no preservatives, it must be refrigerated immediately upon delivery. Mana Dairy is not responsible for spoilage due to improper storage." },
                { label: "Natural Variation", content: "As we provide pure cow milk, slight variations in fat content may occur depending on the season and fodder." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">Terms & Conditions</h1>
                    <p className="text-muted-foreground mb-12 italic">Last Updated: February 28, 2026</p>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg mb-10 leading-relaxed font-medium">
                            Welcome to Mana Dairy. By using our services, you agree to the following terms and conditions. We hope to provide you with a fresh and seamless experience.
                        </p>

                        <div className="space-y-12">
                            {categories.map((category, idx) => (
                                <section key={idx}>
                                    <h2 className="text-2xl font-display font-bold text-primary mb-6 border-b border-primary/10 pb-2">
                                        {category.title}
                                    </h2>
                                    <div className="space-y-6">
                                        {category.items.map((item, i) => (
                                            <div key={i} className="pl-4 border-l-2 border-secondary/30">
                                                <h3 className="font-bold text-lg mb-1 text-foreground">{item.label}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <section className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
                            <h2 className="text-xl font-bold mb-4">Questions?</h2>
                            <p className="text-muted-foreground">
                                If you have any questions regarding these terms, please contact our support team at <a href="mailto:manadairy2026@gmail.com" className="text-primary font-bold underline decoration-secondary">manadairy2026@gmail.com</a>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
