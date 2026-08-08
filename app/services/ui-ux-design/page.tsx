import { getService } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

/**
 * /services/ui-ux-design — server component.
 * Reads service data from lib/services.ts and passes it to the
 * ServicePage client template. No UI logic here.
 */
export default function UIUXDesignPage() {
  const service = getService('ui-ux-design');
  return <ServicePage service={service} />;
}
