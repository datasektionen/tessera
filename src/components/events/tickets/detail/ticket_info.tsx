import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { IEvent, ITicket, ITicketType } from "../../../../types";
import { LabelValue, TicketBatchLabelValue } from "./ticket_utils";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Label } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions, useMediaQuery, useTheme } from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import { hasLottery } from "../../../../utils/manage_event/can_edit_payment_deadline";
import {
  ticketIsEnteredIntoFCFSLottery,
  ticketsEnteredIntoFCFSLottery,
} from "../../../../utils/event_open_close";
import { ScrollConfig } from "../../../constant/scroll_config";
import { useEffect, useState } from "react";
import StyledButton from "../../../buttons/styled_button";
import TicketEditForm from "./edit_ticket_info";
import { sendTicketUpdateRequest } from "../../../../redux/sagas/axios_calls/manage/tickets/edit_ticket";
import axios from "axios";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch } from "react-redux";
import { fetchTicketTypesRequest } from "../../../../redux/features/ticketTypeSlice";
import { useSelector } from "react-redux";
import useChangeTicketBatch from "../../../../hooks/use_change_ticket_batch_hook";
interface TicketInfoProps {
  ticket: ITicket;
}

const TicketInfo: React.FC<TicketInfoProps> = ({ ticket }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const ticket_type = ticket.ticket_request?.ticket_type;
  const ticket_request = ticket.ticket_request;
  const ticket_release = ticket_request?.ticket_release;
  const ticket_add_ons = ticket_request?.ticket_add_ons || [];

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const {
    onSave: onTicketChangeSave,
    ticketTypes,
    loading: ticketBatchLoading,
  } = useChangeTicketBatch(
    ticket_release?.eventId!,
    ticket_release?.id!,
    ticket.id
  );

  const onSave = (values: any) => {
    setOpenEditModal(false);
    sendTicketUpdateRequest(ticket_release?.eventId!, ticket.id, {
      payment_deadline: values.payment_deadline?.toISOString(),
      checked_in: values.checked_in,
    });
  };

  const isDeleted = ticket_request?.deleted_at || ticket.deleted_at;

  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalDialog
          color="primary"
          size="sm"
          variant="outlined"
          sx={{
            width: "500px",
          }}
        >
          <ModalClose onClick={() => setOpenEditModal(false)} />
          <DialogTitle>
            <StyledText level="h4" color={PALLETTE.cerise_dark} fontSize={22}>
              {t("manage_event.tickets.ticket_info.edit.title")}
            </StyledText>
          </DialogTitle>
          <DialogContent>
            <TicketEditForm
              ticket={ticket}
              onClose={() => setOpenEditModal(false)}
              onSave={onSave}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton
              size="md"
              color="primary"
              onClick={() => setOpenEditModal(false)}
            >
              {t("form.button_cancel")}
            </StyledButton>
          </DialogActions>
        </ModalDialog>
      </Modal>
      <Stack
        direction={isScreenSmall ? "column" : "row"}
        spacing={5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ width: "550px" }}>
          <StyledText
            level="body-sm"
            color={PALLETTE.cerise}
            fontWeight={600}
            fontSize={20}
          >
            {t("manage_event.tickets.ticket_info.title")}
          </StyledText>
          {ticket_request?.deleted_at ? (
            <LabelValue
              label={t("manage_event.tickets.ticket_info.deleted_at")}
              value={format(
                new Date(ticket_request?.deleted_at!),
                "dd MMMM, yyyy, HH:mm"
              )}
            />
          ) : null}
          {ticket.deleted_at ? (
            <LabelValue
              label={t("manage_event.tickets.ticket_info.deleted_at")}
              value={format(
                new Date(ticket.deleted_at!),
                "dd MMMM, yyyy, HH:mm"
              )}
            />
          ) : null}
          <LabelValue
            label={t("manage_event.tickets.ticket_info.ticket_type")}
            value={
              ticket.ticket_request?.is_handled
                ? t("manage_event.tickets.ticket_info.ticket_types.ticket")
                : t(
                    "manage_event.tickets.ticket_info.ticket_types.ticket_request"
                  )
            }
          />
          {ticket_request?.is_handled ? (
            <LabelValue
              label={t("manage_event.tickets.ticket_info.id")}
              value={ticket_type?.id}
            />
          ) : (
            <LabelValue
              label={
                t("manage_event.tickets.ticket_info.id") + " (Ticket request)"
              }
              value={ticket.ticket_request!.id}
            />
          )}

          {!ticketBatchLoading &&
            (ticket.is_paid ? (
              <LabelValue
                label={t("manage_event.tickets.ticket_info.ticket_batch")}
                value={ticket_type?.name}
              />
            ) : (
              <TicketBatchLabelValue
                label={t("manage_event.tickets.ticket_info.ticket_batch")}
                value={ticketTypes.find(
                  (ticketType: ITicketType) =>
                    ticketType.id === ticket.ticket_request?.ticket_type_id!
                )}
                options={ticketTypes}
                onSave={onTicketChangeSave}
              />
            ))}

          <LabelValue
            label={t("manage_event.tickets.ticket_info.ticket_release")}
            value={
              <Link
                href={`/events/${ticket_release?.eventId}/manage/ticket-releases?ticket_release_id=${ticket_release?.id}`}
              >
                {ticket_release?.name}
              </Link>
            }
          />

          <LabelValue
            label={t("manage_event.tickets.ticket_info.requested_at")}
            value={format(
              new Date(ticket_request?.created_at!),
              "dd MMMM, yyyy, HH:mm"
            )}
          />

          {hasLottery(
            ticket_release?.ticketReleaseMethodDetail.ticketReleaseMethod!
          ) && (
            <LabelValue
              label={t("manage_event.tickets.ticket_info.entered_into_lottery")}
              value={
                ticketIsEnteredIntoFCFSLottery(ticket, ticket_release!) ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )
              }
            />
          )}

          <LabelValue
            label={t("manage_event.tickets.ticket_info.allocated")}
            value={
              ticket_request?.is_handled ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )
            }
          />

          {ticket_request?.is_handled && [
            <LabelValue
              key="is_reserve"
              label={t("manage_event.tickets.ticket_info.is_reserve")}
              value={
                ticket.is_reserve ? (
                  <CheckIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )
              }
            />,
          ]}
          {ticket_request?.is_handled &&
            !ticket.is_reserve && [
              <LabelValue
                key="allocated_at"
                label={t("manage_event.tickets.ticket_info.purchasable_at")}
                value={format(
                  new Date(ticket.purchasable_at!),
                  "dd MMMM, yyyy, HH:mm"
                )}
              />,
              <LabelValue
                key="payment_deadline"
                label={t("manage_event.tickets.ticket_info.payment_deadline")}
                value={format(
                  new Date(ticket.payment_deadline!),
                  "dd MMMM, yyyy, HH:mm"
                )}
                editButton={
                  isDeleted ? undefined : () => setOpenEditModal(true)
                }
              />,
              <LabelValue
                key="is_paid"
                label={t("manage_event.tickets.ticket_info.is_paid")}
                value={
                  ticket.is_paid ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )
                }
              />,
              <LabelValue
                key="checked_in"
                label={t("manage_event.tickets.ticket_info.checked_in")}
                value={
                  ticket.checked_in ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )
                }
                editButton={
                  isDeleted ? undefined : () => setOpenEditModal(true)
                }
              />,
            ]}
        </Box>
        {ticket_add_ons.length > 0 && (
          <Box sx={{ width: "400px", maxHeight: "600px", ...ScrollConfig }}>
            <StyledText
              level="body-sm"
              color={PALLETTE.cerise}
              fontWeight={600}
              fontSize={20}
            >
              {t("manage_event.tickets.ticket_info.add_ons.title")}
            </StyledText>
            {ticket_add_ons.map((add_on) => (
              <Box>
                <LabelValue
                  key={add_on.id}
                  label={t("manage_event.tickets.ticket_info.add_ons.name")}
                  value={add_on.add_on?.name}
                  tooltip={add_on.add_on?.description}
                />
                <LabelValue
                  key={add_on.id}
                  label={t("manage_event.tickets.ticket_info.add_ons.quantity")}
                  value={add_on.quantity}
                />
                <LabelValue
                  key={add_on.id}
                  label={t("manage_event.tickets.ticket_info.add_ons.price")}
                  value={`${add_on.quantity} á ${add_on.add_on?.price} SEK = ${
                    add_on.add_on?.price! * add_on.quantity
                  } SEK`}
                />
                <LabelValue
                  key={add_on.id}
                  label={t(
                    "manage_event.tickets.ticket_info.add_ons.contains_alcohol"
                  )}
                  value={
                    add_on.add_on?.contains_alcohol ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )
                  }
                />
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default TicketInfo;
