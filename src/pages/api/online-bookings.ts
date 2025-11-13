import { API } from "@/common/infrastructure/datasource/api";
import { bookingDatasource } from "@/features/booking/infrastructure/datasource/booking.datasource";
import { onlineBookingSeatUsecase } from "@/features/studioSeats/application/onlineBookingSeat.usecase";
import type { APIRoute } from "astro";

const bookingRepo = bookingDatasource({ api: API });

export const POST: APIRoute = async ({ request, cookies }) => {
  // const token = authUtils.getToken({ request });
  const token = cookies.get("token")?.value;
  console.log({ token });

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
      return new Response(JSON.stringify({ error: error.data }), {
        status: 400,
      });
    });
};
