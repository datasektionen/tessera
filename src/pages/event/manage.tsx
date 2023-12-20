import { Box } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEventRequest } from "../../redux/features/eventSlice";
import LoadingOverlay from "../../components/Loading";

const ManageEventPage: React.FC = () => {
  const { eventID } = useParams();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );

  const dispatch: AppDispatch = useDispatch();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (eventID) {
      dispatch(getEventRequest(parseInt(eventID)));
    }
  }, []);

  if (!event || loading) {
    return <LoadingOverlay />;
  }
  return (
    <TesseraWrapper>
      <Box
        sx={{
          marginLeft: "32px",
          marginTop: "16px",
        }}
      >
        <Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "90%",
          }}
        >
          Manage Event - {event.name}
        </Title>
        <Grid xs={8}>
          <Item>
            <Typography
              level="h1"
              fontFamily={"Josefin sans"}
              fontSize={48}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.name}
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={7}>
                <Typography
                  level="body-md"
                  style={{
                    color: PALLETTE.charcoal,
                    height: "150px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </Typography>
              </Grid>
              <Grid xs={5}>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<LocationOnIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {event.location}
                </Typography>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<CalendarTodayIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {/* Convert from timestamp to string */}
                  {new Date(event.date).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </TesseraWrapper>
  );
};

export default ManageEventPage;
