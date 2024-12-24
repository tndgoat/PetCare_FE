// utils/exampleUtil.ts

/**
 * A utility function to capitalize the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * A utility function to debounce a function.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * A utility function to check if an object is empty.
 * @param obj - The object to check.
 * @returns True if the object is empty, otherwise false.
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

// Example usage:
// import { capitalizeFirstLetter, debounce, isEmptyObject } from './exampleUtil';
// console.log(capitalizeFirstLetter('hello')); // Outputs: 'Hello'
// const debouncedFn = debounce(() => console.log('Debounced!'), 300);
// console.log(isEmptyObject({})); // Outputs: true
