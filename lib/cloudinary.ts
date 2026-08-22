/**
 * Cloudinary URL helpers for nehalnadaf.me
 *
 * All transformations are applied via Cloudinary's URL-based transformation API.
 * Each unique transformation URL is generated on-demand by Cloudinary and cached
 * at their CDN edge — subsequent requests serve the cached version, not a new
 * transformation. Free plan: 1,000 unique transformations/month (this site uses ~30).
 *
 * Transformation params used:
 *   f_mp4       — explicitly deliver MP4 container (avoids f_auto/vc_h264 conflict
 *                 where Cloudinary could serve WebM/AVIF behind a .mp4 URL).
 *                 MP4/H.264 is universally supported across all browsers and devices.
 *   q_auto:good — quality balanced for visual fidelity vs file size (~60–80% smaller)
 *   vc_h264     — force H.264 codec; prevents black-box on Chrome/Firefox when the
 *                 source is HEVC/H.265 (hvc1), which only Safari/iOS decodes natively.
 *   w_1280      — cap width at 1280px (HD) — used for lightbox / full-view only
 *   w_480       — 480px width for carousel card previews — ~60–70% smaller than w_1280
 *   so_0        — seek-offset: thumbnail captured at 0 seconds (first frame)
 */

const VIDEO_TRANSFORM = 'f_mp4,q_auto:good,vc_h264,w_1280';
const VIDEO_PREVIEW_TRANSFORM = 'f_mp4,q_auto:good,vc_h264,w_480';
const POSTER_TRANSFORM = 'f_auto,q_auto:good,w_640,so_0';

/**
 * Injects Cloudinary transformation params into a Cloudinary video URL.
 * Produces a 1280px-wide HD stream — use for lightbox / full-screen playback only.
 *
 * Input:  https://res.cloudinary.com/cloud/video/upload/v123/file.mp4
 * Output: https://res.cloudinary.com/cloud/video/upload/f_auto,q_auto:good,vc_h264,w_1280/v123/file.mp4
 */
export function cldVideo(src: string): string {
  return src.replace('/upload/', `/upload/${VIDEO_TRANSFORM}/`);
}

/**
 * Low-bandwidth preview variant (480px wide) for carousel cards and grid tiles.
 * ~60–70% smaller than cldVideo — saves significant Cloudinary CDN bandwidth.
 * Use cldVideo() for the lightbox src so full quality plays when expanded.
 *
 * Input:  https://res.cloudinary.com/cloud/video/upload/v123/file.mp4
 * Output: https://res.cloudinary.com/cloud/video/upload/f_auto,q_auto:good,vc_h264,w_480/v123/file.mp4
 */
export function cldVideoPreview(src: string): string {
  return src.replace('/upload/', `/upload/${VIDEO_PREVIEW_TRANSFORM}/`);
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
