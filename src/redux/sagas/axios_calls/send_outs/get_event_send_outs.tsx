import axios from "axios";
import { INotification, ISendOut } from "../../../../types";
import ApiRoutes from "../../../../routes/backend_routes";

export const getEventSendOuts = async (
  event_id: string
): Promise<ISendOut[]> => {
  const response = await axios.get(
    ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_SEND_OUT, {
      eventID: event_id,
    }),
    {
      withCredentials: true,
    }
  );

  const sendOuts: ISendOut[] = response.data.send_outs.map((sendOut: any) => {
    return {
      id: sendOut.ID!,
      event_id: sendOut.event_id!,
      notifications: sendOut.notifications!.map((notification: any) => {
        return {
          id: notification.ID!,
          event_id: notification.event_id!,
          send_out_id: sendOut.ID!,
          user: notification.user!,
          type: notification.type!,
          created_at: new Date(notification.CreatedAt!),
          updated_at: new Date(notification.UpdatedAt!),
          status: notification.status!,
        } as INotification;
      }),
      subject: sendOut.subject!,
      content: sendOut.content!,
      created_at: new Date(sendOut.CreatedAt!),
      updated_at: new Date(sendOut.UpdatedAt!),
    } as ISendOut;
  });

  return sendOuts;
};
