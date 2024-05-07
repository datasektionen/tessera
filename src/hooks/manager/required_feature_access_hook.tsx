import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { hasFeatureAccess } from "../../utils/manager/require_feature";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRequiredFeatureAccess = (
  feature: string,
  redirectBackOnFail: boolean = true
) => {
  const { network, loading } = useSelector((state: RootState) => state.network);
  const navigate = useNavigate();

  const [hasFeatAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      setHasAccess(hasFeatureAccess(feature, network?.plan_enrollment));
    }
  }, [network, loading, feature]);

  useEffect(() => {
    if (hasFeatAccess === false && redirectBackOnFail && !loading) {
      // Redirect back to the dashboard
      // This is a temporary solution until we have a proper error handling mechanism

      navigate(-1);
    }
  }, [hasFeatAccess, loading]);

  return { hasFeatAccess };
};

export const useFeatureLimitAccess = (
  featureName: string,
  redirectBackOnFail: boolean = true
) => {
  const { network, loading } = useSelector((state: RootState) => state.network);

  const [canUseFeature, setcanUseFeature] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      const feature = network?.plan_enrollment?.features.find(
        (feature) => feature.name === featureName
      );

      if (!feature) {
        throw new Error(
          `Feature ${featureName} not found in required_plan_features.`
        );
      }
      setcanUseFeature(feature?.has_limit_access ?? false);
    }
  }, [network, loading, featureName]);

  return { canUseFeature };
};
