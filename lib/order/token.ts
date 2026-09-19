import { resolveCart, type CartLine, type ResolvedOrder } from '@/lib/order/catalog';

export interface OrderPayload {
  v: 1;
  n: string;
  t?: string;
  l: Array<[string, number]>;
  f?: 'store' | 'delivery';
  a?: string;
}

function toBase64Url(utf8: string): string {
  const bytes = new TextEncoder().encode(utf8);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const b64 =
    typeof btoa === 'function'
      ? btoa(binary)
      : Buffer.from(utf8, 'utf8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(token: string): string {
  const padded = token.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const b64 = padded + pad;
  if (typeof atob === 'function') {
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(b64, 'base64').toString('utf8');
}

export function encodeOrderToken(
  lines: CartLine[],
  customerName: string,
  note = '',
  fulfillment: 'store' | 'delivery' = 'store',
  address = '',
): string {
  const payload: OrderPayload = {
    v: 1,
    n: customerName.trim(),
    l: lines
      .filter((line) => line.qty > 0)
      .map((line) => [line.sku, Math.min(99, Math.floor(line.qty))]),
    f: fulfillment,
  };
  const trimmedAddress = address.trim();
  if (trimmedAddress && fulfillment === 'delivery') {
    payload.a = trimmedAddress;
  }
  const trimmedNote = note.trim();
  if (trimmedNote) payload.t = trimmedNote;
  return toBase64Url(JSON.stringify(payload));
}

export function decodeOrderToken(token: string): ResolvedOrder | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token)) as Partial<OrderPayload>;
    if (parsed.v !== 1 || !Array.isArray(parsed.l)) return null;
    const lines: CartLine[] = parsed.l
      .filter((row) => Array.isArray(row) && typeof row[0] === 'string')
      .map((row) => ({ sku: row[0], qty: Number(row[1]) }));
    const fulfillment = parsed.f === 'delivery' ? 'delivery' : 'store';
    const address = typeof parsed.a === 'string' ? parsed.a : '';
    const note = typeof parsed.t === 'string' ? parsed.t : '';
    const customerName = typeof parsed.n === 'string' ? parsed.n : '';
    return resolveCart(lines, customerName, note, fulfillment, address);
  } catch {
    return null;
  }
}
