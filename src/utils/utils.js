function formatDateString(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDateTime = date.toLocaleDateString("en-GB", options);
  return formattedDateTime;
}

export { formatDateString };
