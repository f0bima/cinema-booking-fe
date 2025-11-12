import type { TTicket } from "../../domain/entity/ticket.entity";
import type { TTicketModel } from "../model/booking.model";

const toTicketEntity = (model: TTicketModel): TTicket => {
  return {
    id: model.id,
    user: {
      email: model.user_email,
      id: model.user_id,
      name: model.user_name,
    },
    bookingCode: model.booking_code,
    bookingType: model.booking_type,
    qrCode: model.qr_code,
    seatIds: model.seat_ids,
    studioId: model.studio_id,
    status: model.status,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
  };
};

export const ticketMapper = {
  toEntity: toTicketEntity,
  toEntities: (models: TTicketModel[]): TTicket[] => models.map(toTicketEntity),
};
