import { format, formatDistanceToNow } from "date-fns";

/**
 * Format a date string or Date object to a specified format
 * @param date - The date to format
 * @param dateFormat - The desired date format
 * @returns The formatted date string
 */
export const formatDate = (
  date: string | Date,
  dateFormat: string = "dd/MM/yyyy"
): string => {
  try {
    return format(new Date(date), dateFormat);
  } catch (error) {
    console.error("Invalid date format:", error);
    return "";
  }
};

// Sử dụng hàm formatDate
// const exampleDate: string = "2024-12-24T10:30:00Z";
// const formattedDate: string = formatDate(exampleDate, "dd/MM/yyyy HH:mm");
// console.log(formattedDate);
