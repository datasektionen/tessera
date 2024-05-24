import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetTicketTypes } from "../../../../redux/features/ticketTypeCreationSlice";

import TesseraWrapper from "../../../../components/wrappers/page_wrapper";
import { Box, Grid } from "@mui/joy";
import EditEventAddTicketRelease from "../../../../components/events/edit/edit_event_add_ticket_release";
import {
  ITicketReleaseForm,
  ITicketTypeForm,
  TicketReleaseFormInitialValues,
} from "../../../../types";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { getEventRequest } from "../../../../redux/features/eventSlice";
import LoadingOverlay from "../../../../components/Loading";
import { createTicketReleaseRequest } from "../../../../redux/features/createTicketReleaseSlice";
import { format } from "date-fns";
import DrawerComponent from "../../../../components/navigation/manage_drawer/event_detail";
import usePinnedDrawer from "../../../../hooks/drawer_pinned_hook";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import { ROUTES, generateRoute } from "../../../../routes/def";

const EditEventAddTicketReleasePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { eventID } = useParams();

  const [ticketReleaseForm, setTicketReleaseForm] =
    useState<ITicketReleaseForm | null>(null);

  const { event } = useSelector((state: RootState) => state.eventDetail);

  const { success, createdTicketReleaseId } = useSelector(
    (state: RootState) => state.createTicketRelease
  );

  const navigate = useNavigate();
  // Only run when the component mounts

  useEffect(() => {
    if (success && createdTicketReleaseId !== null) {
      setTimeout(() => {
        toast.success("Ticket release created successfully");
      }, 1000);
      dispatch(resetTicketTypes());

      navigate(
        generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES, {
          eventId: eventID!,
          ticketReleaseId: createdTicketReleaseId!,
        })
      );
    }
  }, [dispatch, navigate, success, eventID]);

  useEffect(() => {
    if (eventID)
      dispatch(
        getEventRequest({
          id: parseInt(eventID),
          secretToken: "",
        })
      );
  }, [dispatch, eventID]);

  const handleTicketReleaseSubmit = async (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length === 0) {
      dispatch(
        createTicketReleaseRequest({
          ticketRelease: values,
          eventId: parseInt(eventID!),
        })
      );
    } else {
      toast.error("Please fill in all the fields.");
    }
  };

  if (!event) return <LoadingOverlay />;

  const initialValues: ITicketReleaseForm = {
    ...TicketReleaseFormInitialValues,
    event_date: format(new Date(event.date!), "yyyy-MM-dd HH:mm"),
  };

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <EditEventAddTicketRelease
          eventId={parseInt(eventID!)}
          submit={handleTicketReleaseSubmit}
          initialValues={ticketReleaseForm || initialValues}
          createOnSubmit={true}
        />
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default EditEventAddTicketReleasePage;
