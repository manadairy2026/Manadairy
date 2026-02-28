import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriptionSchema, type InsertSubscription } from "@shared/schema";
import { useCreateSubscription } from "@/hooks/use-subscriptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, ArrowRight, ClipboardCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function SubscriptionForm() {
  const { mutate: createSubscription, isPending } = useCreateSubscription();
  const [successOrder, setSuccessOrder] = useState<{ trackingId: string } | null>(null);

  const form = useForm<InsertSubscription>({
    resolver: zodResolver(insertSubscriptionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      product: "Full Cream Milk",
      quantity: 1,
      frequency: "Daily",
      deliveryTime: "Morning",
      startDate: new Date().toISOString().split("T")[0],
      specialInstructions: "",
    },
  });

  function onSubmit(data: InsertSubscription) {
    createSubscription(data, {
      onSuccess: (response: any) => {
        setSuccessOrder(response);
        form.reset();
      }
    });
  }

  return (
    <>
      <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden" id="subscribe">
        <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary" />
        <CardContent className="p-6 sm:p-8 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 87121 31151" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Complete address with landmark"
                        className="resize-none bg-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Product</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full Cream Milk">Full Cream Milk (₹60/L)</SelectItem>
                          <SelectItem value="Toned Milk">Toned Milk (₹50/L)</SelectItem>
                          <SelectItem value="Double Toned Milk">Double Toned Milk (₹45/L)</SelectItem>
                          <SelectItem value="Flavoured Milk">Flavoured Milk (₹35/200ml)</SelectItem>
                          <SelectItem value="Paneer Fresh">Paneer Fresh (₹80/200g)</SelectItem>
                          <SelectItem value="Desi Ghee">Desi Ghee (₹600/500ml)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (Liters/Packs)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          className="bg-white"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Alternate Days">Alternate Days</SelectItem>
                          <SelectItem value="Weekends Only">Weekends Only</SelectItem>
                          <SelectItem value="One Time Trial">One Time Trial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Morning">Morning (5:30 AM - 7:30 AM)</SelectItem>
                          <SelectItem value="Evening">Evening (5:00 PM - 7:00 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., Ring the bell, leave in the bag outside..."
                        className="resize-none bg-white font-sans"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Confirm Subscription"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={!!successOrder} onOpenChange={() => setSuccessOrder(null)}>
        <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden bg-white">
          <div className="bg-primary py-8 flex flex-col items-center justify-center text-white relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <CheckCircle2 size={80} className="mb-4 text-white" />
            </motion.div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-display font-bold italic text-center text-white">Order Confirmed!</DialogTitle>
            </DialogHeader>
          </div>

          <CardContent className="p-8 text-center space-y-6">
            <DialogDescription className="text-lg text-gray-600">
              Thank you for subscribing! Your order has been registered successfully.
            </DialogDescription>

            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-primary/20 relative group">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1 block">Your Tracking ID</span>
              <div className="text-3xl font-mono font-bold text-primary flex items-center justify-center gap-2">
                {successOrder?.trackingId}
                <ClipboardCheck size={20} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Please save this ID to track your delivery status in real-time.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <Link href="/track">
                <Button className="w-full rounded-full py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all group">
                  Track My Order <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full rounded-full py-6 text-gray-500"
                onClick={() => setSuccessOrder(null)}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
