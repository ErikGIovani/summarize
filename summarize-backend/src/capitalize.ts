export function capitalize(text: string) {
  const cleanText = text.replace(/^Based on the text provided,\s*/i, "");
  return cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
}
