const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp, 10)); // timestamp'i integer'a çevirip Date oluşturuyoruz
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
export default formatDate;
