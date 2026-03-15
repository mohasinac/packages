export interface CheckoutMessageInput {
  waNumber: string;
  cart: Array<{ name: string; qty: number; salePrice: number }>;
  total: number;
  address: {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    pincode: string;
  };
  isPreorder?: boolean;
}

export interface StatusNotificationInput {
  userPhone: string;
  template: string;
  vars: Record<string, string>;
}

export interface WebhookVerifyInput {
  payload: string;
  signature: string;
  secret: string;
}
