import { NextResponse } from "next/server";
import { OrderSchema } from "../../../lib/schemas";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const order = { ...parsed.data, receivedAt: new Date().toISOString() };

  // Optional Google Sheets webhook
  const webhook = process.env.GAS_ORDER_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error("[ORDER webhook failed]", err);
    }
  }

  // Email notification via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM ?? "Torenza Studio <orders@resend.dev>";

  if (resendKey && to) {
    const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
    const itemsHtml = order.items
      .map(
        (i) =>
          `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${i.name} <span style="color:#888">· ${i.size} · ×${i.qty}</span></td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${i.price * i.qty} DT</td></tr>`,
      )
      .join("");
    const c = order.customer;
    const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0b0b0b">
      <h2 style="margin:0 0 16px;font-weight:600">New Torenza order</h2>
      <p style="margin:0 0 4px"><strong>${c.fullName}</strong></p>
      <p style="margin:0 0 4px">${c.phone}</p>
      <p style="margin:0 0 4px">${c.address}, ${c.city}</p>
      ${c.notes ? `<p style="margin:8px 0;color:#555"><em>${c.notes}</em></p>` : ""}
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px">${itemsHtml}
        <tr><td style="padding:12px 0;font-weight:600">Total</td><td style="padding:12px 0;text-align:right;font-weight:600">${subtotal} DT</td></tr>
      </table>
      <p style="margin-top:16px;color:#888;font-size:12px">Cash on delivery · received ${order.receivedAt}</p>
    </div>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: `New order — ${c.fullName} (${subtotal} DT)`,
          html,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        console.error("[ORDER email failed]", res.status, t);
      }
    } catch (err) {
      console.error("[ORDER email error]", err);
    }
  } else {
    console.log("[ORDER]", JSON.stringify(order, null, 2));
  }

  return NextResponse.json({ ok: true });
}
