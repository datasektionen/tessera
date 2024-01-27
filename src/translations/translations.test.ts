// translations.test.ts

import seFaq from "../assets/faq/se_faq.json";
import gbFaq from "../assets/faq/gb_faq.json";
import enTranslations from "./enTranslations";
import seTranslations from "./seTranslations";

// Utility function to get all keys from a JSON object
const getAllKeys = (obj: any, prefix = ""): string[] =>
  Object.keys(obj).reduce((res: string[], el: string) => {
    if (
      typeof obj[el] === "object" &&
      obj[el] !== null &&
      !Array.isArray(obj[el])
    ) {
      return [...res, ...getAllKeys(obj[el], `${prefix}${el}.`)];
    }
    return [...res, `${prefix}${el}`];
  }, []);

describe("Translation keys consistency", () => {
  it("should have consistent keys in all language files", () => {
    const enKeys = getAllKeys(enTranslations);
    const seKeys = getAllKeys(seTranslations);

    const allKeys = [...new Set([...enKeys, ...seKeys])]; // Combine and deduplicate keys

    allKeys.forEach((key) => {
      if (!enKeys.includes(key)) {
        throw new Error(`Missing key '${key}' in English (en) translations.`);
      }
      if (!seKeys.includes(key)) {
        throw new Error(`Missing key '${key}' in Swedish (se) translations.`);
      }
    });
  });
});
