import { AxiosResponse } from "axios";
import { ITicketType } from "../../types";
import { ApiResponse, fetchApi, putApi } from "../api/api";
import ApiRoutes from "../../routes/backend_routes";

export const fetchTemplateTicketTypes = async () => {
  // /templates/ticket-releases/
  try {
    const response = await fetchApi<{
      ticket_types: Array<ITicketType>;
    }>(
      ApiRoutes.generateRoute(ApiRoutes.TEMPLATE_TICKET_TYPES, {}),
      true,
      true
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const unsaveTemplateTicketTypes = async (id: number) => {
  // /templates/ticket-releases/:ticketReleaseID/unsave
  try {
    const response = await putApi<{
      ticket_types: Array<ITicketType>;
    }>(
      ApiRoutes.generateRoute(ApiRoutes.TEMPLATE_TICKET_TYPES_UNSAVE, {
        ticketReleaseID: id,
      }),
      {},
      true
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
