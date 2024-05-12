import React, { useEffect, useState } from 'react';
import { getCustomerEventRequest } from '../../../redux/features/customerViewEvent';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IEvent } from '../../../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, DialogTitle, Modal, ModalClose, ModalDialog, Stack } from '@mui/joy';
import { useMediaQuery, useTheme } from '@mui/material';
import StyledText from '../../../components/text/styled_text';
import PALLETTE from '../../../theme/pallette';
import Title from '../../../components/text/title';
import StandardToastContainer from '../../../components/wrappers/toast_container';
import { ticketReleaseHasClosed } from '../../../utils/event_open_close';
import { useTranslation } from 'react-i18next';
import TicketRelease from '../../../components/events/ticket_release';
import LandingPageFooter from './landing_page_footer';


const EventLandingPage = () => {
    const { refID } = useParams();
    const [loadingEditor, setLoadingEditor] = useState(true);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();

    const { loading, error, event, errorStatusCode } = useSelector(
        (state: RootState) => state.customerViewEvent
    ) as {
        loading: boolean;
        error: string | null;
        event: IEvent | null;
        errorStatusCode: number | null;
    };
    const { timestamp } = useSelector((state: RootState) => state.timestamp);


    useEffect(() => {
        if (!refID) {
            window.location.reload();
            return;
        }


        dispatch(
            getCustomerEventRequest({
                refID,
                secretToken: "",
                countSiteVisit: true,
                promoCodes: [],
            })
        );
    }, []);

    useEffect(() => {
        const buyTicketsButton = document.querySelector('#buy-tickets');

        const handleClick = () => {
            setIsTicketModalOpen(true);
        };

        if (buyTicketsButton) {
            buyTicketsButton.addEventListener('click', handleClick);
        }

        return () => {
            if (buyTicketsButton) {
                buyTicketsButton.removeEventListener('click', handleClick);
            }
        };
    }, [event]);


    if (!event) {
        // TODO: 404 page
        return null;
    }

    const ticketReleases = event!.ticketReleases!.filter(
        (ticketRelease) => !ticketReleaseHasClosed(ticketRelease, timestamp)
    );


    if (loading) {
        return null
    }

    return (
        <div>
            <StandardToastContainer />
            <Modal open={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} >
                <ModalDialog variant='outlined' sx={{
                    width: isScreenSmall ? '100%' : '65%',
                    backgroundColor: PALLETTE.offWhite,
                }}>

                    <DialogTitle>
                        <Title color={PALLETTE.primary} style={{
                            margin: "0 auto"
                        }}>Tickets</Title>
                    </DialogTitle>
                    <Box mt={2}>
                        <Box>
                            {ticketReleases.length === 0 && (
                                <StyledText
                                    color={PALLETTE.charcoal}
                                    level="body-sm"
                                    fontSize={22}
                                    fontWeight={500}
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                >
                                    {t("event.no_ticket_releases")}
                                </StyledText>
                            )}
                            <Stack
                                spacing={2}
                                sx={{
                                    p: 0,
                                }}
                            >
                                {ticketReleases.map((ticketRelease, i) => {
                                    const key = `${event!.name}-${i}`;

                                    return (
                                        <TicketRelease ticketRelease={ticketRelease} key={key} />
                                    );
                                })}
                            </Stack>
                        </Box>
                    </Box>
                    <ModalClose />
                </ModalDialog>
            </Modal>
            <style dangerouslySetInnerHTML={{ __html: event?.landing_page!.css! }}></style>
            <div dangerouslySetInnerHTML={{ __html: event?.landing_page!.html! }}></div>
            <LandingPageFooter />
        </div>
    );
}

export default EventLandingPage;