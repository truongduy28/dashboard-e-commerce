export const titleFromPath = () => {
  const url = window.location.href;
  const path = new URL(url).pathname;
  let replaced = path.replace(/-/g, " ").replace(/\//g, "");
  let formatted = replaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formatted;
};
