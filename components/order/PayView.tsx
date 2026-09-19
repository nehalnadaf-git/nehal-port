'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import QrCode from '@/components/order/QrCode';
import { formatInr, type ResolvedOrder } from '@/lib/order/catalog';
import { PAYMENT, buildUpiUri } from '@/lib/order/payment';
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/order/message';

export default function PayView({
  order,
  token,
}: {
  order: ResolvedOrder;
  token: string;
}) {
  const upiNote = `${PAYMENT.payeeName} Order`.slice(0, 50);
  const upiUri = useMemo(() => buildUpiUri(order.totalInr, upiNote), [order.totalInr, upiNote]);
  const message = useMemo(() => buildOrderMessage(order, token), [order, token]);
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(message), [message]);

  return (
    <>
      <header
        style={{
          borderBottom: '1.5px solid #000',
          padding: '16px clamp(20px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.04em' }}>
          Nehal Nadaf
        </p>
        <p className="type-mono">NN-ORD / PAY</p>
      </header>
    <main className="container-padding" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="max-w-3xl mx-auto">
        <p className="type-mono opacity-50 mb-3 tracking-widest">// Payment</p>
        <h1 className="type-h2 mb-2">Pay {formatInr(order.totalInr)}</h1>
        <p className="type-body text-foreground/65 mb-8">
          Scan the QR with any UPI app. The amount is already filled. After paying, send a screenshot on WhatsApp.
        </p>

        <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000] w-fit">
            <QrCode value={upiUri} label={`UPI QR for ${formatInr(order.totalInr)}`} size={240} />
          </div>
          <div>
            <p className="type-mono opacity-50 mb-2">Payee</p>
            <p className="type-h3 mb-4">{PAYMENT.payeeName}</p>
            <p className="type-mono mb-1">UPI</p>
            <p className="type-body font-semibold mb-4">{PAYMENT.upiId}</p>
            <p className="type-mono mb-1">Amount</p>
            <p className="type-h3">{formatInr(order.totalInr)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <a href={upiUri} className="btn-brutal btn-brutal-primary" style={{ textDecoration: 'none' }}>
            Open UPI
          </a>
        </div>

        <section className="mt-12 border-2 border-black bg-[#E8E6D8] p-6 shadow-[4px_4px_0px_#000000]">
          <p className="type-mono opacity-50 mb-4 tracking-widest">// Order</p>
          <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: '1.5px solid rgba(0,0,0,0.2)' }}>
            {order.customerName ? (
              <p className="type-body">
                <span className="opacity-50">Customer: </span>
                <span className="font-semibold">{order.customerName}</span>
              </p>
            ) : null}
            <p className="type-body">
              <span className="opacity-50">Option: </span>
              <span className="font-semibold">
                {order.fulfillment === 'delivery' ? 'Delivery' : 'Store (We will pick that up)'}
              </span>
            </p>
            {order.fulfillment === 'delivery' && order.address ? (
              <p className="type-body">
                <span className="opacity-50">Address: </span>
                <span>{order.address}</span>
              </p>
            ) : null}
            {order.note ? (
              <p className="type-body">
                <span className="opacity-50">Note: </span>
                <span>{order.note}</span>
              </p>
            ) : null}
          </div>
          <div className="space-y-4">
            {order.lines.map((line) => (
              <div key={line.product.sku} className="flex items-center justify-between gap-4 type-body">
                <div className="flex items-center gap-3">
                  {line.product.image ? (
                    <div className="w-12 h-12 flex-shrink-0 border border-black bg-white p-0.5 overflow-hidden">
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}
                  <span>
                    {line.product.name}
                    <span className="opacity-50 ml-2">x{line.qty}</span>
                  </span>
                </div>
                <span className="font-semibold">{formatInr(line.lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between type-h3 mt-5 pt-4" style={{ borderTop: '1.5px solid #000' }}>
            <span>Total</span>
            <span>{formatInr(order.totalInr)}</span>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mt-8">
          <a href={whatsappUrl} className="btn-brutal btn-brutal-primary" style={{ textDecoration: 'none' }}>
            Send Order on WhatsApp
          </a>
          <Link href="/order" className="btn-brutal btn-brutal-ghost" style={{ textDecoration: 'none' }}>
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
