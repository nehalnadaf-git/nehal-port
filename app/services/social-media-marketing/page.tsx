import { getService } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

/**
 * /services/social-media-marketing — server component.
 * Reads service data from lib/services.ts and passes it to the
 * ServicePage client template. No UI logic here.
 */
export default function SocialMediaMarketingPage() {
  const service = getService('social-media-marketing');
  return <ServicePage service={service} />;
}
