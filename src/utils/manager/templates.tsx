import { AxiosResponse } from "axios";
import { ITicketType } from "../../types";
import { fetchApi, putApi } from "../api/fetch_api";
import ApiRoutes from "../../routes/backend_routes";

export const fetchTemplateTicketTypes = async () => {
  // /templates/ticket-releases/
  try {
    const response: AxiosResponse<{
      ticket_types: Array<ITicketType>;
    }> = await fetchApi(
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
    const response: AxiosResponse<{
      ticket_types: Array<ITicketType>;
    }> = await putApi(
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
