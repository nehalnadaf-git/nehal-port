/**
 * Cloudinary URL helpers for nehalnadaf.me
 *
 * All transformations are applied via Cloudinary's URL-based transformation API.
 * Each unique transformation URL is generated on-demand by Cloudinary and cached
 * at their CDN edge — subsequent requests serve the cached version, not a new
 * transformation. Free plan: 1,000 unique transformations/month (this site uses ~30).
 *
 * Transformation params used:
 *   f_auto      — serve WebM/MP4/AVIF automatically based on browser support
 *   q_auto:good — quality balanced for visual fidelity vs file size (~60–80% smaller)
 *   w_1280      — cap width at 1280px (HD) — sufficient for carousel previews
 *   so_0        — seek-offset: thumbnail captured at 0 seconds (first frame)
 */

const VIDEO_TRANSFORM = 'f_auto,q_auto:good,w_1280';
const POSTER_TRANSFORM = 'f_auto,q_auto:good,w_640,so_0';

/**
 * Injects Cloudinary transformation params into a Cloudinary video URL.
 * Handles URLs with and without an existing version segment (v12345...).
 *
 * Input:  https://res.cloudinary.com/cloud/video/upload/v123/file.mp4
 * Output: https://res.cloudinary.com/cloud/video/upload/f_auto,q_auto:good,w_1280/v123/file.mp4
 */
export function cldVideo(src: string): string {
  return src.replace('/upload/', `/upload/${VIDEO_TRANSFORM}/`);
}

/**
 * Generates a Cloudinary poster/thumbnail URL from a video URL.
 * Cloudinary auto-generates a JPEG frame at the specified seek-offset.
 *
 * Input:  https://res.cloudinary.com/cloud/video/upload/v123/file.mp4
 * Output: https://res.cloudinary.com/cloud/video/upload/f_auto,q_auto:good,w_640,so_0/v123/file.jpg
 */
export function cldPoster(src: string): string {
  return src
    .replace('/upload/', `/upload/${POSTER_TRANSFORM}/`)
    .replace(/\.mp4$/, '.jpg');
}
