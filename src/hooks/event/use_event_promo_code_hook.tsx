import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { PromoCodeAccessForm } from '../../types';
import { getCustomerEventRequest } from '../../redux/features/customerViewEvent';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';

const usePromoCodes = (refID: string, secretToken: string) => {
    const [promoCodes, setPromoCodes] = useState<string[]>(JSON.parse(localStorage.getItem("promo_codes") || "[]"));
    const dispatch: AppDispatch = useDispatch();

    const submitPromoCode = useCallback((values: PromoCodeAccessForm) => {
        // A list of promo codes exists in the localstorage for the user, which are to be submitted when requesting details
        // To the event
        let existingPromoCodes: string[] = [];
        if (existingPromoCodes) {
            existingPromoCodes = JSON.parse(
                localStorage.getItem("promo_codes") || "[]"
            );
        } else {
            existingPromoCodes = [];
        }

        existingPromoCodes.push(values.promo_code);

        localStorage.setItem("promo_codes", JSON.stringify(existingPromoCodes));

        setTimeout(() => {
            toast.info("Promo code applied!");
        }, 200);

        if (!refID) {
            window.location.reload();
            return;
        }

        dispatch(
            getCustomerEventRequest({
                refID,
                secretToken: secretToken || "",
                countSiteVisit: true,
                promoCodes: existingPromoCodes,
            })
        );
    }, [refID, secretToken]);

    return { promoCodes, submitPromoCode };
};

export default usePromoCodes;