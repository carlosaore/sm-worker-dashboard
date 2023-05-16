/**
 * Get the language string from the language code
 * (e.g. "es" => "Español")
 * @param language
 */
export const getLanguageString = (language: string) => {
  switch (language) {
    case "es":
      return "Español";
    case "en":
      return "English";
    case "fr":
      return "Français";
    case "pt":
      return "Português";
    case "it":
      return "Italiano";
    default:
      return "Español";
  }
};

/**
 * Get the amount of days between two dates
 * Start date and end date are counted as days
 * @param date_ini - Start date in format "YYYY-MM-DD"
 * @param date_end - End date in format "YYYY-MM-DD"
 * @param string - Return the result as a formatted string (e.g. "3 days")
 */
export const getDaysBetweenDates = (date_ini: string, date_end: string, string = false) => {
  const dateIni = new Date(date_ini);
  const dateEnd = new Date(date_end);
  dateIni.setHours(0, 0, 0, 0);
  dateEnd.setHours(23, 59, 59, 999);
  const diffInMs = Math.abs(dateEnd.getTime() - dateIni.getTime());
  const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  console.log({
    date_ini,
    date_end,
    dateIni,
    dateEnd,
    diffInMs,
    days,
  });
  if (string) {
    return `${days} ${days === 1 ? "día" : "días"}`;
  }
  return days;
}
