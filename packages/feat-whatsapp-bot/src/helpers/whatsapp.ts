import { createHmac, timingSafeEqual } from "crypto";
import type { CheckoutMessageInput, StatusNotificationInput, WebhookVerifyInput } from "../types";

export function buildCheckoutMessageURL(input: CheckoutMessageInput): string {
  const { waNumber, cart, total, address, isPreorder = false } = input;
  const prefix = isPreorder ? "\uD83D\uDD16 *PRE-ORDER*\n\n" : "";
  const lines = cart.map(
    (i) => `\u2022 ${i.name} \xD7${i.qty} \u2014 \u20B9${(i.salePrice * i.qty).toLocaleString("en-IN")}`,
  );
  const body = [
    `${prefix}Hi Hobson! I'd like to place an order:`,
    "",
    ...lines,
    "",
    `*Total: \u20B9${total.toLocaleString("en-IN")}*`,
    "",
    `Deliver to: ${address.name}, ${address.line1}${address.line2 ? ", " + address.line2 : ""}, ${address.city} - ${address.pincode}`,
    `Phone: ${address.phone}`,
    "",
    "Please share payment details.",
  ].join("\n");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(body)}`;
}

export function buildStatusNotificationURL(input: StatusNotificationInput): string {
  const { userPhone, template, vars } = input;
  const body = template.replace(
    /\{(\w+)\}/g,
    (_, key: string) => vars[key] ?? `{${key}}`,
  );
  return `https://wa.me/${userPhone}?text=${encodeURIComponent(body)}`;
}

export function verifyWebhookSignature(input: WebhookVerifyInput): boolean {
  const { payload, signature, secret } = input;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const sigBuf = Buffer.from(signature, "hex");
  if (expectedBuf.length !== sigBuf.length) return false;
  return timingSafeEqual(expectedBuf, sigBuf);
}

export function isAdminNumber(incomingNumber: string, adminBotNumber: string): boolean {
  const clean = (n: string) => n.replace(/\D/g, "");
  return clean(incomingNumber).endsWith(clean(adminBotNumber));
}
