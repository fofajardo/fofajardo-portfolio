const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC"
});

export function getMonthName(monthStr: string): string {
  const monthNum = Number(monthStr);
  if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
    return monthStr;
  }
  return monthFormatter.format(new Date(Date.UTC(2000, monthNum - 1, 1)));
}

const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC"
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC"
});

export function getCalendarDate(dateStr: string): {
  day: string;
  month: string;
  weekday: string;
} {
  if (!dateStr) {
    return { day: "", month: "", weekday: "" };
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { day: "", month: "", weekday: "" };
  }
  return {
    day: String(date.getUTCDate()).padStart(2, "0"),
    month: shortMonthFormatter.format(date).toUpperCase(),
    weekday: weekdayFormatter.format(date).toUpperCase()
  };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export function escapeXml(unsafe: string): string {
  // Uses the fast approach of replacing characters from SO.
  // https://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
