import { getService } from '@/lib/services';
import ServicePage from '@/components/ServicePage';

/**
 * /services/video-editing — server component.
 * Reads service data from lib/services.ts and passes it to the
 * ServicePage client template. No UI logic here.
 */
export default function VideoEditingPage() {
  const service = getService('video-editing');
  return <ServicePage service={service} />;
}
