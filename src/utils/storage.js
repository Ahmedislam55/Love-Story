import { initialAppData } from '../data/initialData.js';
import { decodeAppDataFromUrl } from './urlSharing.js';

const STORAGE_KEY = 'love_story_gift_app_data_v1';

export function loadAppData() {
  try {
    // 1. Check if URL contains encoded shared data
    const urlData = decodeAppDataFromUrl();
    if (urlData) {
      // Save it locally so it persists
      saveAppData(urlData);
      return urlData;
    }

    // 2. Fallback to Local Storage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with initial data to ensure all keys exist
      return {
        ...initialAppData,
        ...parsed,
        profile: { ...initialAppData.profile, ...(parsed.profile || {}) },
        memories: Array.isArray(parsed.memories) ? parsed.memories : initialAppData.memories,
        upcomingEvents: Array.isArray(parsed.upcomingEvents) ? parsed.upcomingEvents : initialAppData.upcomingEvents,
        secretNotes: Array.isArray(parsed.secretNotes) ? parsed.secretNotes : initialAppData.secretNotes,
        dailyMessages: Array.isArray(parsed.dailyMessages) ? parsed.dailyMessages : initialAppData.dailyMessages,
        playlist: Array.isArray(parsed.playlist) ? parsed.playlist : initialAppData.playlist,
      };
    }
  } catch (e) {
    console.error('Failed to parse saved app data, falling back to defaults:', e);
  }
  return initialAppData;
}

export function saveAppData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save app data:', e);
  }
}

export function resetAppData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset app data:', e);
  }
  return initialAppData;
}

export function exportDataAsJSON(data) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `ذكريات_حبنا_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
