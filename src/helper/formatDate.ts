import {
  differenceInMonths,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";

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

export const calculateMonthsPassed = (date: string | Date): number => {
  try {
    // Chuyển đổi date thành đối tượng Date nếu nó là một chuỗi
    const inputDate = typeof date === "string" ? parseISO(date) : date;
    const currentDate = new Date();
    return differenceInMonths(currentDate, inputDate);
  } catch (error) {
    console.error("Invalid date format:", error);
    return 0; // Trả về 0 nếu có lỗi
  }
};

// Sử dụng hàm formatDate
// const exampleDate: string = "2024-12-24T10:30:00Z";
// const formattedDate: string = formatDate(exampleDate, "dd/MM/yyyy HH:mm");
// console.log(formattedDate);
