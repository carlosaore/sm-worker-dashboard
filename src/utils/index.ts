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
