import type { Order, OrderItem } from "@tachyon-webstore/db";

/**
 * ═════════════════════════════════════════════════════════════════════════════
 * MOCK EMAIL RECEIPT — Order Processing Algorithm (Level 2 DFD), step 3.4.7
 * ═════════════════════════════════════════════════════════════════════════════
 * "Send Receipt" — this is a deliberately MOCK implementation.
 *
 * It stands in for a real email provider (Resend, Postmark, SES, …) so the
 * webhook can call it synchronously after the ORDER is committed. Swap the
 * body of `sendOrderReceipt` for a provider call without touching callers.
 * ═════════════════════════════════════════════════════════════════════════════
 */
export type ReceiptOrder = Order & { items: OrderItem[] };

export async function sendOrderReceipt(order: ReceiptOrder): Promise<void> {
	// Mock transport: write a human-readable receipt to stdout. In production
	// replace this with e.g.:
	//
	//   await resend.emails.send({
	//     from: "Tachyon <orders@tachyon.example>",
	//     to: order.email,
	//     subject: `Your Tachyon receipt — order ${order.id}`,
	//     html: receiptHtml(order),
	//   });
	//
	console.log(
		"\n── Receipt (mock email) ───────────────────────────────────────",
	);
	console.log(`To:      ${order.email}`);
	console.log(`Order:   ${order.id}`);
	console.log(`Status:  ${order.status}`);
	console.log(`Total:   $${(order.totalAmount / 100).toFixed(2)}`);
	console.log("Items:");
	for (const item of order.items) {
		console.log(`  - ${item.productId} × ${item.quantity}`);
	}
	console.log(
		"────────────────────────────────────────────────────────────────\n",
	);

	// Failing receipt delivery must never roll back a paid ORDER, so this mock
	// resolves unconditionally. A real implementation should swallow/log its
	// own send errors rather than throwing into the webhook handler.
}
