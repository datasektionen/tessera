import { IEvent } from "../types";

export function formatDateToDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

interface RegexPatterns {
  days: RegExp;
  hours: RegExp;
  minutes: RegExp;
  seconds: RegExp;
}

export const parseDurationInput = (input: string): number => {
  // Define regex patterns for days, hours, minutes, and seconds
  const regexPatterns: RegexPatterns = {
    days: /(\d+)\s*(d|day|days)/,
    hours: /(\d+)\s*(h|hour|hours)/,
    minutes: /(\d+)\s*(m|min|minute|minutes)/,
    seconds: /(\d+)\s*(s|sec|second|seconds)/,
  };

  // Initialize total duration in seconds
  let totalSeconds = 0;

  // Function to parse the duration based on the unit
  const parseUnit = (unit: keyof RegexPatterns, multiplier: number): void => {
    const match = input.match(regexPatterns[unit]);
    if (match) {
      totalSeconds += parseInt(match[1], 10) * multiplier;
    }
  };

  // Parse each time unit
  parseUnit("days", 86400); // 24*60*60
  parseUnit("hours", 3600); // 60*60
  parseUnit("minutes", 60);
  parseUnit("seconds", 1);

  // Parse each time unit
  // Check if any of the regex patterns match the input
  const anyMatch = Object.values(regexPatterns).some((pattern: unknown) =>
    (pattern as RegExp).test(input)
  );

  // If no regex pattern matches the input, throw an error
  if (!anyMatch) {
    throw new Error("Invalid duration input");
  }

  return totalSeconds;
};

export function toGoDuration(
  days: number,
  hours: number,
  minutes: number,
  seconds: number
): string {
  let result = "";
  let totalHours = 0;
  if (days > 0) {
    totalHours = days * 24;
  }
  if (hours) {
    totalHours += hours;
  }
  if (totalHours) result += `${totalHours}h`;

  if (minutes) {
    result += `${minutes}m`;
  }
  if (seconds) {
    result += `${seconds}s`;
  }
  return result;
}

export const getDurationUnits = (
  input: string
): { days: number; hours: number; minutes: number; seconds: number } => {
  // Define regex patterns for days, hours, minutes, and seconds
  const regexPatterns: RegexPatterns = {
    days: /(\d+)\s*(d|day|days)/,
    hours: /(\d+)\s*(h|hour|hours)/,
    minutes: /(\d+)\s*(m|min|minute|minutes)/,
    seconds: /(\d+)\s*(s|sec|second|seconds)/,
  };

  // Initialize duration object
  let duration = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  // Function to parse the duration based on the unit
  const parseUnit = (unit: keyof RegexPatterns): void => {
    const match = input.match(regexPatterns[unit]);
    if (match) {
      duration[unit] = parseInt(match[1], 10);
    }
  };

  // Parse each time unit
  parseUnit("days");
  parseUnit("hours");
  parseUnit("minutes");
  parseUnit("seconds");

  return duration;
};

export const paymentDurationToString = (nanoseconds: number): string => {
  // Convert nanoseconds to seconds
  let totalSeconds = Math.floor(nanoseconds / 1e9);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  totalSeconds %= 24 * 60 * 60;
  const hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds %= 60 * 60;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the duration string
  let durationStr = "";
  if (days > 0) durationStr += `${days} days `;
  if (hours > 0) durationStr += `${hours} hours `;
  if (minutes > 0) durationStr += `${minutes} minutes `;
  if (seconds > 0) durationStr += `${seconds} seconds `;

  // Remove trailing space and return the duration string
  return durationStr.trim();
};

export const formatEventDate = (date: Date, end_date: Date | null) => {
  if (end_date) {
    if (date.toDateString() === end_date.toDateString()) {
      // Same date, only include the time part of the end date
      return `${date.toLocaleString()} - ${end_date.toLocaleTimeString()}`;
    } else {
      // Different dates, include both date and time for both
      return `${date.toLocaleString()} - ${end_date.toLocaleString()}`;
    }
  } else {
    return date.toLocaleString();
  }
};

export const eventIsInThePast = (event: IEvent) => {
  // If the event is more than 1 day in the past
  const eventDate = new Date(event.date);
  const endDate = event.end_date ? new Date(event.end_date) : null;
  const now = new Date();

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  if (endDate) {
    return endDate.getTime() + oneDay < now.getTime();
  }

  return eventDate.getTime() + oneDay < now.getTime();
};
