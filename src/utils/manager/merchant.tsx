import { INetwork, SurfApplicationStatus } from "../../types";

export function networkHasCreatedMerchant(network: INetwork): boolean {
    if (network.merchant?.id === 0) {
        return false;
    }

    if (
        (network.merchant.applicationStatus.toLowerCase() as SurfApplicationStatus) ===
        SurfApplicationStatus.MerchantCreated
    ) {
        return true;
    }

    return false;
}
    