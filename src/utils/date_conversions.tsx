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

  console.log(anyMatch);

  // If no regex pattern matches the input, throw an error
  if (!anyMatch) {
    throw new Error("Invalid duration input");
  }

  return totalSeconds;
};

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
