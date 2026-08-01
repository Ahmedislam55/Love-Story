export function calculateTimeElapsed(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();

  let totalMs = Math.max(0, now.getTime() - start.getTime());
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours,
    minutes,
    seconds,
    totalDays: Math.max(0, totalDays),
  };
}

export function calculateTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr);
  const now = new Date();

  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export function formatArabicDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  } catch (e) {
    return dateStr;
  }
}

// Given an original date (birthday / anniversary / engagement date), returns the
// next upcoming occurrence of that same month & day (and time, if provided).
// If today IS the day of the event, it stays on today's date (so the "celebration"
// state shows for the whole day) instead of jumping straight to next year.
export function getNextOccurrence(dateStr) {
  const original = new Date(dateStr);
  const now = new Date();

  const hours = original.getHours() || 0;
  const minutes = original.getMinutes() || 0;

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let candidate = new Date(now.getFullYear(), original.getMonth(), original.getDate(), hours, minutes, 0);
  const candidateDayStart = new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate());

  if (candidateDayStart.getTime() < todayStart.getTime()) {
    candidate = new Date(now.getFullYear() + 1, original.getMonth(), original.getDate(), hours, minutes, 0);
  }

  return candidate;
}

// Returns which occurrence this upcoming date is (age turning, or anniversary number)
export function getOccurrenceNumber(dateStr) {
  const original = new Date(dateStr);
  const next = getNextOccurrence(dateStr);
  return next.getFullYear() - original.getFullYear();
}

export function isTodayAnniversary(startDateStr) {
  if (!startDateStr) return false;
  const start = new Date(startDateStr);
  const now = new Date();
  return start.getMonth() === now.getMonth() && start.getDate() === now.getDate();
}
