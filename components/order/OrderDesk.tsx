'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ORDER_CATEGORIES,
  ORDER_PRODUCTS,
  formatInr,
  resolveCart,
  type CartLine,
} from '@/lib/order/catalog';
import { PAYMENT } from '@/lib/order/payment';
import { encodeOrderToken } from '@/lib/order/token';
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/order/message';

const STORAGE_KEY = 'nn-order-cart';

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((line) => typeof line.sku === 'string' && Number(line.qty) > 0);
  } catch {
    return [];
  }
}

const fieldStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1.5px solid rgba(0,0,0,0.25)',
  outline: 'none',
  padding: '10px 0',
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  color: '#000',
  width: '100%',
};

export default function OrderDesk() {
  const [cart, setCart] = useState<CartLine[] | null>(null);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setCart(loadCart());
  }, []);

  useEffect(() => {
    if (cart === null) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const lines = cart ?? [];
  const order = useMemo(() => resolveCart(lines, name, note), [lines, name, note]);
  const token = useMemo(
    () => (order ? encodeOrderToken(lines, name, note) : ''),
    [order, lines, name, note],
  );
  const whatsappUrl = useMemo(
    () => (order && token ? buildWhatsAppUrl(buildOrderMessage(order, token)) : ''),
    [order, token],
  );

  const changeQty = useCallback((sku: string, delta: number) => {
    setCart((prev) => {
      const base = prev ?? loadCart();
      const current = base.find((line) => line.sku === sku)?.qty ?? 0;
      const qty = Math.min(99, Math.max(0, current + delta));
      const next = base.filter((line) => line.sku !== sku);
      if (qty > 0) next.push({ sku, qty });
      return next;
    });
    setError('');
  }, []);

  const qtyOf = (sku: string) => lines.find((line) => line.sku === sku)?.qty ?? 0;

  const handleListOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!order || lines.length === 0) {
      e.preventDefault();
      setError('Select at least one item.');
      return;
    }
    setError('');
    const latestOrder = resolveCart(lines, name, note);
    if (!latestOrder) {
      e.preventDefault();
      return;
    }
    const latestToken = encodeOrderToken(lines, name, note);
    const msg = buildOrderMessage(latestOrder, latestToken);
    e.currentTarget.href = buildWhatsAppUrl(msg);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(242,241,230,0.92)',
          borderBottom: '1.5px solid #000',
          padding: '16px clamp(20px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
        }}
      >
        <div>
          <p className="type-mono opacity-50" style={{ marginBottom: 4 }}>
            NN-ORD / 001
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.04em' }}>
            Nehal Nadaf
          </p>
        </div>
        <p className="type-mono">
          Cart {order ? `${order.itemCount} · ${formatInr(order.totalInr)}` : 'empty'}
        </p>
      </header>

      <main className="container-padding" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.4fr_0.9fr] gap-10">
          <section>
            <p className="type-mono opacity-50 mb-3 tracking-widest">// Catalog</p>
            <h1 className="type-h2 text-foreground mb-3">
              Service{' '}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                products
              </span>
            </h1>
            <p className="type-body text-foreground/65 mb-8 max-w-xl">
              Full list of services. Select quantity, then List Order to send the list, total, and QR pay link on WhatsApp.
            </p>

            <div className="flex flex-col gap-10">
              {ORDER_CATEGORIES.map((category) => (
                <div key={category}>
                  <p className="type-mono opacity-50 mb-3 tracking-widest">// {category}</p>
                  <div className="flex flex-col gap-4">
                    {ORDER_PRODUCTS.filter((product) => product.category === category).map((product) => {
                      const qty = qtyOf(product.sku);
                      const selected = qty > 0;
                      return (
                        <article
                          key={product.sku}
                          className="bg-[#F2F1E6] border-2 border-black p-5 shadow-[4px_4px_0px_#000000]"
                          style={{ outline: selected ? '2px solid #A855F7' : undefined }}
                        >
                          <div className="flex flex-wrap justify-between gap-3 mb-3">
                            <p className="type-mono opacity-50">{product.sku}</p>
                            <p className="type-mono">{product.category}</p>
                          </div>
                          <h2 className="type-h3 mb-2">{product.name}</h2>
                          <p className="type-body text-foreground/65 mb-4">{product.spec}</p>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <p className="type-body font-semibold">
                              {formatInr(product.priceInr)}
                              <span className="type-mono opacity-50 ml-2">/ {product.unit}</span>
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="btn-brutal btn-brutal-ghost"
                                style={{ minHeight: 44, padding: '8px 16px' }}
                                onClick={() => changeQty(product.sku, -1)}
                                disabled={qty === 0}
                                aria-label={`Remove one ${product.name}`}
                              >
                                -
                              </button>
                              <span className="type-mono w-8 text-center">{qty}</span>
                              <button
                                type="button"
                                className="btn-brutal btn-brutal-primary"
                                style={{ minHeight: 44, padding: '8px 16px' }}
                                onClick={() => changeQty(product.sku, 1)}
                                aria-label={`Add one ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside>
            <div
              className="lg:sticky border-2 border-black bg-[#E8E6D8] p-6 shadow-[6px_6px_0px_#000000]"
              style={{ top: 88 }}
            >
              <p className="type-mono opacity-50 mb-4 tracking-widest">// Order list</p>

              <label className="type-mono text-foreground/50" htmlFor="order-name">
                Name (optional)
              </label>
              <input
                id="order-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                style={fieldStyle}
              />

              <label className="type-mono text-foreground/50 mt-5 block" htmlFor="order-note">
                Note (optional)
              </label>
              <textarea
                id="order-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Deadline, references, platform"
                rows={3}
                style={{ ...fieldStyle, resize: 'vertical', minHeight: 80 }}
              />

              <div className="mt-6 space-y-3">
                {order ? (
                  order.lines.map((line) => (
                    <div key={line.product.sku} className="flex justify-between gap-3 type-body">
                      <span>
                        {line.product.sku}
                        <span className="opacity-50"> x{line.qty}</span>
                      </span>
                      <span>{formatInr(line.lineTotal)}</span>
                    </div>
                  ))
                ) : (
                  <p className="type-body text-foreground/50">No items selected.</p>
                )}
              </div>

              <div
                className="flex justify-between mt-5 pt-4 type-h3"
                style={{ borderTop: '1.5px solid #000' }}
              >
                <span>Total</span>
                <span>{formatInr(order?.totalInr ?? 0)}</span>
              </div>

              <p className="type-mono opacity-50 mt-4">
                UPI {PAYMENT.upiId}
              </p>

              {error ? (
                <p role="alert" className="type-mono mt-3" style={{ color: '#e53e3e' }}>
                  {error}
                </p>
              ) : null}

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  onClick={handleListOrder}
                  className="btn-brutal btn-brutal-primary w-full mt-6"
                  style={{ textDecoration: 'none' }}
                >
                  List Order
                </a>
              ) : (
                <button
                  type="button"
                  className="btn-brutal btn-brutal-primary w-full mt-6"
                  onClick={() => setError('Select at least one item.')}
                >
                  List Order
                </button>
              )}
              <p className="type-mono text-foreground/40 mt-4">
                List Order opens WhatsApp with the list, total, UPI ID, and QR pay link.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
