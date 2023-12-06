import { IFoodPreference } from "../types";

export function mapUserFoodPreferences(
  FoodPreferences: IFoodPreference[],
  data: any
): IFoodPreference[] {
  return FoodPreferences.map((foodPreference) => {
    return {
      ...foodPreference,
      checked: data[foodPreference.id],
    };
  });
}
