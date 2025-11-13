import { API_GATEWAY } from "@/common/infrastructure/datasource/apiGateway";
import { authUtils } from "@/common/libs/utils/auth.utils";
import { errorUtils } from "@/common/libs/utils/error.utils";
import { bookingDatasource } from "@/features/booking/infrastructure/datasource/booking.datasource";
import { onlineBookingSeatUsecase } from "@/features/studioSeats/application/onlineBookingSeat.usecase";
import type { APIRoute } from "astro";

const bookingRepo = bookingDatasource({ api: API_GATEWAY });

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = authUtils.getToken({ cookies });

  const { seatIds, studioId } = await request.json();

  return await onlineBookingSeatUsecase({ repo: bookingRepo })
    .execute({
      token,
      seatIds,
      studioId,
    })
    .then((response) => {
      return new Response(JSON.stringify(response));
    })
    .catch((error) => {
      const message = errorUtils.getErrorAPIMessage(error);
      const statusCode = errorUtils.getErrorAPIStatusCode(error);
      return new Response(JSON.stringify({ error: message }), {
        status: statusCode,
      });
    });
};
