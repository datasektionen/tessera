import { Divider, Grid, Link, Option, Select, Sheet, Stack } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../text/styled_text";
import {
  IEvent,
  IOrganization,
  IOrganizationUser,
  IUser,
  OrganizationUserRole,
} from "../../types";
import { getUserFullName } from "../../utils/user_utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import React, { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "../Loading";
import { toast } from "react-toastify";
import axios from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { makeStyles } from "@mui/material";
import { removeUserRequest } from "../../redux/sagas/organizationSaga";
import StyledButton from "../buttons/styled_button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface OrganizationEventViewProps {
  organization: IOrganization;
  event: IEvent;
}

const OrganizationEventView: React.FC<OrganizationEventViewProps> = ({
  event,
  organization,
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  return (
    <Sheet
      style={{
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      {loading && <LoadingOverlay />}
      <Grid container spacing={2} columns={16}>
        <Grid xs={4}>
          <Link href={`/events/${event.id}`}>
            <StyledText
              level="body-sm"
              fontSize={18}
              color={PALLETTE.charcoal}
              fontWeight={700}
              style={{
                textDecoration: "underline",
              }}
            >
              {event.name}
            </StyledText>
          </Link>
        </Grid>
        <Grid xs={6} justifyContent="flex-end" flexDirection="row">
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={500}
            color={PALLETTE.charcoal}
          >
            {event.location}
          </StyledText>
          <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
            {format(new Date(event.date), "dd/MM/yyyy HH:mm:ss")}
          </StyledText>
        </Grid>
        <Grid
          container
          xs={6}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <StyledButton
            size="md"
            color={PALLETTE.cerise}
            onClick={() => {
              navigate(`/events/${event.id}/edit`);
            }}
            style={{ width: "100px" }}
          >
            Edit
          </StyledButton>
        </Grid>
      </Grid>
      <Divider />
    </Sheet>
  );
};

export default OrganizationEventView;
