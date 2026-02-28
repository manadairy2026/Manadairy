import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, Truck, CheckCircle2, AlertCircle, Calendar, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface OrderStatus {
    trackingId: string;
    status: string;
    fullName: string;
    product: string;
    quantity: number;
    startDate: string;
    address: string;
    deliveryTime: string;
}

export default function TrackOrder() {
    const [searchId, setSearchId] = useState("");
    const [trackingId, setTrackingId] = useState("");

    const { data: order, isLoading, isError, error } = useQuery<OrderStatus>({
        queryKey: ["/api/track", trackingId],
        enabled: !!trackingId,
        retry: false,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId.trim()) {
            setTrackingId(searchId.trim().toUpperCase());
        }
    };

    const steps = [
        { name: "Booked", icon: Package, description: "Your order has been received" },
        { name: "Processing", icon: Clock, description: "Fresh produce is being prepared" },
        { name: "Shipping", icon: Truck, description: "Your order is in transit" },
        { name: "Out for Delivery", icon: Truck, description: "Arriving at your doorstep soon" },
        { name: "Delivered", icon: CheckCircle2, description: "Enjoy your fresh Mana Dairy products!" },
    ];

    const currentStep = order ? steps.findIndex(s => s.name === order.status) : -1;

    return (
        <div className="min-h-screen bg-background flex flex-col pt-20">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 italic">Track Your Order</h1>
                        <p className="text-lg text-muted-foreground">Enter your tracking ID to see the real-time status of your fresh dairy delivery.</p>
                    </div>

                    <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-md">
                        <CardContent className="p-8">
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                    <Input
                                        placeholder="Enter Tracking ID (e.g. MANA-XXXXXX)"
                                        className="pl-12 py-6 text-lg rounded-full bg-white border-primary/20 focus:border-primary transition-all shadow-inner"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="rounded-full px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Searching..." : "Track Now"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <AnimatePresence mode="wait">
                        {isError && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card className="border-destructive/20 bg-destructive/5 overflow-hidden">
                                    <CardContent className="p-6 flex items-center gap-4 text-destructive">
                                        <AlertCircle size={24} />
                                        <p className="font-medium">{(error as any)?.response?.data?.message || "Something went wrong. Please try again."}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {order && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="space-y-6"
                            >
                                {/* Status Timeline */}
                                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                                    <div className="bg-primary/5 p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Order Tracking ID</span>
                                            <h2 className="text-2xl font-mono font-bold text-primary">{order.trackingId}</h2>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Current Status</span>
                                            <div className="flex items-center gap-2 justify-end">
                                                <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                                                <span className="text-2xl font-bold font-display italic text-secondary">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-8">
                                        <div className="relative pt-8 pb-12">
                                            {/* Vertical line on small screens, horizontal on large */}
                                            <div className="absolute top-0 bottom-0 left-[22px] md:top-[1.25rem] md:bottom-auto md:left-0 md:right-0 md:h-1 bg-gray-100 rounded-full" />

                                            <div className="relative flex flex-col md:flex-row justify-between gap-8">
                                                {steps.map((step, idx) => {
                                                    const Icon = step.icon;
                                                    const isCompleted = idx < currentStep;
                                                    const isCurrent = idx === currentStep;

                                                    return (
                                                        <div key={idx} className="flex md:flex-col items-center gap-4 md:text-center shrink-0 z-10 md:w-1/5">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isCompleted ? "bg-primary text-white scale-110" :
                                                                    isCurrent ? "bg-secondary text-white scale-125 ring-8 ring-secondary/20" :
                                                                        "bg-white text-gray-300 border-2 border-gray-100"
                                                                }`}>
                                                                <Icon size={24} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className={`font-bold transition-colors ${isCurrent ? "text-secondary" : isCompleted ? "text-primary" : "text-gray-400"}`}>
                                                                    {step.name}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground hidden md:block mt-1">
                                                                    {step.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-0 shadow-lg bg-white/90">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                                                <Package size={16} /> Subscription Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                                <span className="text-muted-foreground">Customer</span>
                                                <span className="font-bold">{order.fullName}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                                <span className="text-muted-foreground">Product</span>
                                                <span className="font-bold text-primary">{order.product}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                                <span className="text-muted-foreground">Quantity</span>
                                                <span className="font-bold">{order.quantity} Liters</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-0 shadow-lg bg-white/90">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                                                <Truck size={16} /> Delivery Info
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-start gap-2 text-sm">
                                                <MapPin size={16} className="text-secondary shrink-0 mt-1" />
                                                <span className="leading-relaxed">{order.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm border-t border-gray-50 pt-3">
                                                <Calendar size={16} className="text-secondary" />
                                                <span>Starting: <strong>{order.startDate}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm border-t border-gray-50 pt-2">
                                                <Clock size={16} className="text-secondary" />
                                                <span>Time Slot: <strong>{order.deliveryTime}</strong></span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
