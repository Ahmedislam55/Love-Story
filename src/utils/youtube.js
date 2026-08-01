export function getYouTubeVideoId(url) {
  if (!url) return null;
  const cleanUrl = url.trim();

  // Match YouTube Shorts: youtube.com/shorts/ID
  const shortsMatch = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // Match standard YouTube watch, embed, or music
  const watchMatch = cleanUrl.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/|music\.youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]+)/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  return null;
}

export function isYouTubeUrl(url) {
  return getYouTubeVideoId(url) !== null;
}
