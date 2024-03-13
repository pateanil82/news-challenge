import { formatDistanceToNow, parseISO } from "date-fns";

export const formatPublishedAt = (publishedAt) => {
  const date = parseISO(publishedAt);
  return formatDistanceToNow(date);
};

export const truncateDescription = (description) => {
  if (description?.length > 125) {
    return description?.substring(0, 120) + "...";
  }
  return description;
};

export const truncateTitle = (title) => {
  if (title?.length > 80) {
    return title?.substring(0, 80) + "...";
  }
  return title;
};
