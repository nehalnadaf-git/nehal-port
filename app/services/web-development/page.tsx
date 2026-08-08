import { getService } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

/**
 * /services/web-development — server component.
 * Reads service data from lib/services.ts and passes it to the
 * ServicePage client template. No UI logic here.
 */
export default function WebDevelopmentPage() {
  const service = getService('web-development');
  return <ServicePage service={service} />;
}
