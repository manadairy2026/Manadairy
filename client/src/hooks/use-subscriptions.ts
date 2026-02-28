import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertSubscription } from "@shared/schema";

export function useCreateSubscription() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscription) => {
      const res = await fetch(api.subscriptions.create.path, {
        method: api.subscriptions.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create subscription");
      }

      return api.subscriptions.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscription Confirmed! 🥛",
        description: "Thank you for choosing Mana Dairy. We will contact you shortly.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
