import LZString from 'lz-string';

/**
 * Encodes the entire AppData object into a compressed URL hash string.
 * This allows sharing a fully customized state in a link that anyone can view!
 */
export function encodeAppDataToUrl(data, isReadOnlyMode = true) {
  try {
    const jsonStr = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    const baseUrl = window.location.origin + window.location.pathname;
    
    const params = new URLSearchParams();
    if (isReadOnlyMode) {
      params.set('mode', 'view');
    }
    params.set('data', compressed);

    return `${baseUrl}?${params.toString()}`;
  } catch (e) {
    console.error('Failed to encode app data to URL:', e);
    return window.location.href;
  }
}

/**
 * Checks URL query parameters or hash for encoded data and decodes it.
 */
export function decodeAppDataFromUrl() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    let compressedData = searchParams.get('data');

    // Also fallback to hash check if present
    if (!compressedData && window.location.hash.includes('data=')) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
      compressedData = hashParams.get('data');
    }

    if (!compressedData) return null;

    const decompressedJson = LZString.decompressFromEncodedURIComponent(compressedData);
    if (!decompressedJson) return null;

    const parsedData = JSON.parse(decompressedJson);

    // Basic structure validation
    if (parsedData && parsedData.profile && Array.isArray(parsedData.memories)) {
      return parsedData;
    }
  } catch (e) {
    console.error('Failed to decode app data from URL:', e);
  }
  return null;
}

/**
 * Checks if the current URL specifies Read-Only / View-Only mode.
 */
export function isReadOnlyFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get('mode');
  const hasData = searchParams.has('data');
  return mode === 'view' || hasData;
}
