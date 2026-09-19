import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PayView from '@/components/order/PayView';
import { decodeOrderToken } from '@/lib/order/token';
import { formatInr } from '@/lib/order/catalog';
import { SEO, buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const order = decodeOrderToken(token);
  if (!order) {
    return buildMetadata({
      title: 'Payment',
      description: 'UPI payment',
      noIndex: true,
      canonicalPath: `/order/pay/${token}`,
    });
  }

  const title = `Pay ${formatInr(order.totalInr)} — ${SEO.name}`;
  const description = `UPI payment of ${formatInr(order.totalInr)} to ${SEO.name}. Scan the QR to pay.`;
  const ogImage = `/order/pay/${token}/opengraph-image`;

  return buildMetadata({
    title,
    description,
    noIndex: true,
    canonicalPath: `/order/pay/${token}`,
    ogImage,
  });
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const order = decodeOrderToken(token);
  if (!order) notFound();
  return <PayView order={order} token={token} />;
}
