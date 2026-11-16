export interface ParsedVideoInfo {
  embedType: 'youtube' | 'behance' | 'photos';
  embedUrl: string;
  thumbnailUrl: string;
  isVertical: boolean;
  isValid: boolean;
}

/**
 * Extracts YouTube video ID from various URL patterns:
 * - https://www.youtube.com/watch?v=XXXX
 * - https://youtu.be/XXXX
 * - https://www.youtube.com/shorts/XXXX
 * - https://www.youtube.com/embed/XXXX
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Handle YouTube Shorts
  const shortsMatch = trimmed.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Handle youtu.be shortlinks
  const youtuBeMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) return youtuBeMatch[1];

  // Handle standard watch?v=
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle embed
  const embedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

/**
 * Parses any video / media link and returns normalized embed URL, thumbnail, and type.
 */
export function parseMediaUrl(url: string, forceVertical?: boolean): ParsedVideoInfo {
  if (!url) {
    return {
      embedType: 'youtube',
      embedUrl: '',
      thumbnailUrl: '',
      isVertical: false,
      isValid: false
    };
  }

  const trimmed = url.trim();

  // 1. YouTube
  const ytId = extractYouTubeId(trimmed);
  if (ytId) {
    const isShorts = trimmed.includes('/shorts/') || Boolean(forceVertical);
    return {
      embedType: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
      isVertical: isShorts,
      isValid: true
    };
  }

  // 2. Vimeo
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[1];
    return {
      embedType: 'youtube', // The existing VideoModal renders iframe embed URLs
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      thumbnailUrl: '', // Will require user to specify thumbnail or fallback
      isVertical: Boolean(forceVertical),
      isValid: true
    };
  }

  // 3. Behance
  if (trimmed.includes('behance.net')) {
    return {
      embedType: 'behance',
      embedUrl: trimmed,
      thumbnailUrl: '',
      isVertical: false,
      isValid: true
    };
  }

  // 4. Direct MP4 or custom embed
  return {
    embedType: 'youtube',
    embedUrl: trimmed,
    thumbnailUrl: '',
    isVertical: Boolean(forceVertical),
    isValid: trimmed.length > 5
  };
}

export function getCategoryNameAr(category: string): string {
  switch (category) {
    case 'commercials': return 'إعلانات وبرومو';
    case 'reels': return 'ريلز وسوشيال';
    case 'motion': return 'موشن جرافيك';
    case 'photography': return 'تصوير فوتوغرافي';
    case 'ai': return 'شغل AI';
    default: return 'أعمال متنوعة';
  }
}
