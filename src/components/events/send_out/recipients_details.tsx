import { Box, Chip, Grid, Link, Stack } from "@mui/joy";
import { INotification, ISendOut, NotificationStatus } from "../../../types";
import BorderBox from "../../wrappers/border_box";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { format } from "date-fns";
import { t } from "i18next";
import { mt } from "date-fns/locale";

interface RecipientsDetailsProps {
  sendOut: ISendOut;
}

const StatusIndicator = ({ status }: { status: string }) => {
  let bgColor = PALLETTE.dark_green;
  let textColor = PALLETTE.white;
  switch (status) {
    case NotificationStatus.SENT:
      bgColor = PALLETTE.dark_green;
      break;
    case NotificationStatus.FAILED:
      bgColor = PALLETTE.dark_red;
      break;
    case NotificationStatus.PENDING:
      bgColor = PALLETTE.beige;
      textColor = PALLETTE.charcoal;
      break;
    default:
      bgColor = PALLETTE.dark_green;
      break;
  }

  return (
    <Chip sx={{ backgroundColor: bgColor }}>
      <StyledText
        level="body1"
        color={textColor}
        fontSize={12}
        fontWeight={600}
        sx={{
          textTransform: "uppercase",
        }}
      >
        {status}
      </StyledText>
    </Chip>
  );
};

const RecipientsDetails: React.FC<RecipientsDetailsProps> = ({ sendOut }) => {
  const notifications = sendOut.notifications;

  return (
    <Grid container spacing={1} direction={"column"}>
      {notifications.map((notification: INotification) => {
        return (
          <Grid>
            <BorderBox key={notification.id}>
              <Stack
                direction="row"
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <StyledText level="body1" color={PALLETTE.charcoal}>
                  {notification.user?.first_name} {notification.user?.last_name}
                  {" - "}
                  <Link href={`mailto:${notification.user?.email}`}>
                    {notification.user?.email}
                  </Link>
                </StyledText>

                <StatusIndicator status={notification.status} />
              </Stack>
              <StyledText
                level="body1"
                color={PALLETTE.charcoal_see_through}
                fontSize={12}
                sx={{
                  mt: 1,
                }}
              >
                {t("common.created")}{" "}
                {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm")}
              </StyledText>
              {notification.status === NotificationStatus.FAILED && (
                <Box>
                  <StyledText
                    level="body1"
                    color={PALLETTE.charcoal_see_through}
                    fontSize={12}
                    sx={{
                      mt: 1,
                    }}
                  >
                    {t("manage_event.send_out.status_message")}
                  </StyledText>
                  <StyledText
                    level="body1"
                    color={PALLETTE.charcoal_see_through}
                    fontSize={12}
                    sx={{
                      mt: 1,
                    }}
                  >
                    {notification.status_message}
                  </StyledText>
                  <StyledText
                    level="body1"
                    color={PALLETTE.charcoal_see_through}
                    fontSize={12}
                    sx={{
                      mt: 1,
                    }}
                  >
                    {format(
                      new Date(notification.updated_at),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </StyledText>
                </Box>
              )}
            </BorderBox>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RecipientsDetails;
