import { IFeatureUsage, IPlanEnrollment, PaymentPlanOption } from "../../types";

function getLatestFeatureUsage(
  feature_usages: IFeatureUsage[],
  feature_id: number,
  plan_enrollment_id: number,
  object_reference?: string
): IFeatureUsage | null {
  const filtered_usages = feature_usages.filter(
    (usage) =>
      usage.feature_id === feature_id &&
      usage.plan_enrollment_id === plan_enrollment_id &&
      (!object_reference || usage.object_reference === object_reference)
  );
  if (filtered_usages.length === 0) {
    return null;
  }
  return filtered_usages.sort(
    (a, b) => b.created_at.getTime() - a.created_at.getTime()
  )[0];
}

function getMonthlyFeatureUsages(
  feature_usages: IFeatureUsage[],
  feature_id: number,
  plan_enrollment_id: number,
  object_reference?: string
): IFeatureUsage[] {
  const one_month_ago = new Date();
  one_month_ago.setMonth(one_month_ago.getMonth() - 1);
  return feature_usages.filter(
    (usage) =>
      usage.feature_id === feature_id &&
      usage.plan_enrollment_id === plan_enrollment_id &&
      usage.created_at >= one_month_ago &&
      (!object_reference || usage.object_reference === object_reference)
  );
}

function getYearlyFeatureUsages(
  feature_usages: IFeatureUsage[],
  feature_id: number,
  plan_enrollment_id: number,
  object_reference?: string
): IFeatureUsage[] {
  const one_year_ago = new Date();
  one_year_ago.setFullYear(one_year_ago.getFullYear() - 1);
  return feature_usages.filter(
    (usage) =>
      usage.feature_id === feature_id &&
      usage.plan_enrollment_id === plan_enrollment_id &&
      usage.created_at >= one_year_ago &&
      (!object_reference || usage.object_reference === object_reference)
  );
}

function getTotalFeatureUsage(usage: IFeatureUsage[]): number {
  if (usage.length === 0) {
    return 0;
  }

  // If there's only one entry, return 0
  if (usage.length === 1) {
    return usage[0].usage;
  }

  // Assert that the usage list is ordered by time
  if (usage[0].created_at > usage[usage.length - 1].created_at) {
    return 0;
  }

  // Calculate total usage
  const totalUsage = usage[usage.length - 1].usage - usage[0].usage;

  // If usage has decreased, return 0
  if (totalUsage < 0) {
    return 0;
  }

  return totalUsage;
}

export function canUseLimitedFeature(
  feature_name: string,
  objectReference: string | undefined,
  plan_enrollment: IPlanEnrollment | undefined
) {
  if (!plan_enrollment) {
    return false;
  }

  const feature = plan_enrollment.features.find(
    (feature) => feature.name === feature_name
  );

  if (!feature) {
    console.error(`Feature ${feature_name} not found in plan enrollment.`);
    return false;
  }

  const featureLimit = feature.feature_limits.find(
    (featureLimit) =>
      featureLimit.feature_id === feature?.id &&
      featureLimit.package_tier_id === plan_enrollment.package_tier_id
  );

  if (!featureLimit) {
    console.error(`Feature limit not found for feature ${feature_name}.`);
    return false;
  }

  let featureUsages =
    plan_enrollment.features_usages.filter(
      (featureUsage) => featureUsage.feature_id === feature?.id
    ) || [];

  if (!Array.isArray(featureUsages)) {
    featureUsages = [];
  }

  if (objectReference) {
    featureUsages = featureUsages.filter(
      (featureUsage: IFeatureUsage) =>
        featureUsage.object_reference! === objectReference
    );
  }


  const latestUsage = getLatestFeatureUsage(
    featureUsages,
    feature?.id!,
    plan_enrollment.id
  );

  const monthlyUsages = getMonthlyFeatureUsages(
    featureUsages,
    feature?.id!,
    plan_enrollment.id
  );
  const yearlyUsages = getYearlyFeatureUsages(
    featureUsages,
    feature?.id!,
    plan_enrollment.id
  );

  const totalLatestUsage = getTotalFeatureUsage(
    latestUsage ? [latestUsage] : []
  );
  const totalMonthlyUsage = getTotalFeatureUsage(monthlyUsages);
  const totalYearlyUsage = getTotalFeatureUsage(yearlyUsages);

  if (featureLimit?.limit) {
    if (totalLatestUsage >= featureLimit.limit) {
      return false;
    }
  }

  if (
    featureLimit?.monthly_limit &&
    plan_enrollment.plan === PaymentPlanOption.Monthly
  ) {
    if (
      featureLimit.monthly_limit &&
      totalMonthlyUsage >= featureLimit.monthly_limit
    ) {
      return false;
    }
  }

  if (
    featureLimit?.yearly_limit &&
    plan_enrollment.plan === PaymentPlanOption.Yearly
  ) {
    if (
      featureLimit.yearly_limit &&
      totalYearlyUsage >= featureLimit.yearly_limit
    ) {
      return false;
    }
  }

  return true;
}
