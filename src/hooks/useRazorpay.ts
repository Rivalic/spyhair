import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RazorpayOptions {
  amount: number;
  productId: string;
  productName: string;
  productDescription?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  onSuccess?: (response: RazorpaySuccessResponse & { order_id?: string }) => void;
  onError?: (error: Error) => void;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useRazorpay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const initiatePayment = useCallback(async ({
    amount,
    productId,
    productName,
    productDescription,
    customerName,
    customerPhone,
    customerAddress,
    onSuccess,
    onError,
  }: RazorpayOptions) => {
    setIsLoading(true);

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount,
          notes: {
            product: productName,
          },
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to create order');
      }

      const { orderId, keyId, currency } = data;

      // Open Razorpay checkout
      const options: RazorpayCheckoutOptions = {
        key: keyId,
        amount: Math.round(amount * 100),
        currency,
        name: 'Premium Hair Systems',
        description: productDescription || productName,
        order_id: orderId,
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: '#D4A84B', // Gold color matching the brand
        },
        handler: async (response) => {
          // Don't trust client-side success immediately - verify server-side
          setIsVerifying(true);
          
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              'verify-razorpay-payment',
              {
                body: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  product_id: productId,
                  product_name: productName,
                  product_price: amount,
                  customer_name: customerName,
                  customer_phone: customerPhone,
                  customer_address: customerAddress,
                },
              }
            );

            if (verifyError || !verifyData?.verified) {
              throw new Error(verifyData?.error || 'Payment verification failed');
            }

            toast({
              title: 'Payment Successful!',
              description: `Your order has been confirmed. Order ID: ${verifyData.order_id?.slice(0, 8)}...`,
            });
            
            onSuccess?.({
              ...response,
              order_id: verifyData.order_id,
            });
          } catch (verifyErr) {
            console.error('Payment verification error:', verifyErr);
            toast({
              title: 'Verification Failed',
              description: verifyErr instanceof Error ? verifyErr.message : 'Payment could not be verified. Please contact support.',
              variant: 'destructive',
            });
            onError?.(verifyErr instanceof Error ? verifyErr : new Error('Verification failed'));
          } finally {
            setIsVerifying(false);
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response) => {
        const error = new Error(response.error.description);
        toast({
          title: 'Payment Failed',
          description: response.error.description,
          variant: 'destructive',
        });
        onError?.(error);
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
      setIsLoading(false);
    }
  }, [toast]);

  return { initiatePayment, isLoading, isVerifying };
};
