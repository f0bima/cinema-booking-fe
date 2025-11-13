import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AxiosInstance } from "axios";
import { bookingDatasource } from "./booking.datasource";
import { ticketMapper } from "../mapper/ticket.mapper";
import type {
  TBookingModel,
  TTicketModel,
} from "@/features/booking/infrastructure/model/booking.model";
import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";
import type { TInputOfflineBooking } from "@/features/booking/domain/entity/inputOfflineBooking.entity";
import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";

const mockApi = {
  post: vi.fn(),
  get: vi.fn(),
} as unknown as AxiosInstance;

const datasource = bookingDatasource({ api: mockApi });

describe("bookingDatasource", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const now = new Date();

  const bookingModel: TBookingModel = {
    booking: {
      id: 5,
      user_email: "jono@mail.com",
      user_id: null,
      user_name: "jono",
      booking_code: "01ba37e9-04a6-4d78-bdef-84fa4c397e24",
      booking_type: "online",
      qr_code:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADaUlEQVR42uyZMW7zOhCER1DBcm9gXsSQruXCgAS40LVk+CL0DViyEDgPs3LiP696xbN+FmHlKF8Ambs7O7vB7/k9//cZST6eOfCebO6ZMdVoc/8kWZsBBiCsHcONyUgBpC18Zv/VQUDkssIKEI0rUHpR4zNzawt4kAUdM84nw7VLVs7d4cAz81ZB3WTY/HFjABAeT5bpnmxZOyoJjWv3Ix8+DLzSvlyHaMsfH/5dF38V0OkTMNW9QKCUm5h+iMiHgQG2sFq4VX0geat7EnIemgG65OUQZsDmcU+5fOnf3+IQgHyQyn8r55h5u6cMkbe1GQDR065MKzJwMoWbMyLR18MAYJI+cI2cR4WVtDJWKw0BI3EZq2FagWmLCnfEtEYqAY4CXLsUO0XzBL/FRcArmi0AiCyAlelOv0nJfr70FV9qfwDQpTxtsHIdYHNfoR6dwxozZzQDDPAEC9sQcUGXBWDy3jQcBkRMj4oyVdh8BsI8kguf3ynXBIB8OcOBPMljee9mgu72KCAiyGj195QnVlNHthkn/5NWAIBlrMD11cRdcsOuJEcBQ5Rb8ZJUa87lCmR/7WltBhhps5ucNWYvh/4u65XwdmKfB5Itj2qch5jDw0eb6DPOl4i1AAwa/aqpJN02c+6YwyNJzY4DSD5ZdtfHLNnP7pXnhgB5m5gpzfAk60nz3rQdBozJ51Bqci/9M7uH0eSOqTYDSEDcbVVwPp8QtjHhAhi//MPngS7lsJ0sbDLCTFb8CYWjGQDRitzy1fujbrIi4xzz21d/HPDxU5WoIkWX0d9f8b2tLQGKsn7MYT2ZZ9plZC79YUBH46bnejefQ+Wxzu+XbARQXcioa3QFt04TB4mXyTkAUKZtUWrgU2Hm1iVMGlHfJuevA11yx+4vj1HW9K5q7fKXfzgEkFGXIqgjJ5HSh4TwPeM0APjWUSbZTU4uPYkLIsPL5BwAjIT8p5qgrDvR1+hLDzYEuFt+0hdWXLvsJSmT8632nwfG3X+qErPUXnOEy35BO4Bv/uFbNS77ejay9LLN62FApLtirpHLPgymfc349R+QRgBfDenrbCqHO1kQ/xirjwF8xRFt2U4IMyI0maJf2wEU7pPJNnslqC2aVORHPnwW8LSv++aznDvf7NmMt9FqAfg9v+e/n38CAAD//ybdAGKWO7sjAAAAAElFTkSuQmCC",
      seat_ids: [93, 96],
      studio_id: 5,
      status: "active",
      created_at: now,
      updated_at: now,
    },
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADaUlEQVR42uyZMW7zOhCER1DBcm9gXsSQruXCgAS40LVk+CL0DViyEDgPs3LiP696xbN+FmHlKF8Ambs7O7vB7/k9//cZST6eOfCebO6ZMdVoc/8kWZsBBiCsHcONyUgBpC18Zv/VQUDkssIKEI0rUHpR4zNzawt4kAUdM84nw7VLVs7d4cAz81ZB3WTY/HFjABAeT5bpnmxZOyoJjWv3Ix8+DLzSvlyHaMsfH/5dF38V0OkTMNW9QKCUm5h+iMiHgQG2sFq4VX0geat7EnIemgG65OUQZsDmcU+5fOnf3+IQgHyQyn8r55h5u6cMkbe1GQDR065MKzJwMoWbMyLR18MAYJI+cI2cR4WVtDJWKw0BI3EZq2FagWmLCnfEtEYqAY4CXLsUO0XzBL/FRcArmi0AiCyAlelOv0nJfr70FV9qfwDQpTxtsHIdYHNfoR6dwxozZzQDDPAEC9sQcUGXBWDy3jQcBkRMj4oyVdh8BsI8kguf3ynXBIB8OcOBPMljee9mgu72KCAiyGj195QnVlNHthkn/5NWAIBlrMD11cRdcsOuJEcBQ5Rb8ZJUa87lCmR/7WltBhhps5ucNWYvh/4u65XwdmKfB5Itj2qch5jDw0eb6DPOl4i1AAwa/aqpJN02c+6YwyNJzY4DSD5ZdtfHLNnP7pXnhgB5m5gpzfAk60nz3rQdBozJ51Bqci/9M7uH0eSOqTYDSEDcbVVwPp8QtjHhAhi//MPngS7lsJ0sbDLCTFb8CYWjGQDRitzy1fujbrIi4xzz21d/HPDxU5WoIkWX0d9f8b2tLQGKsn7MYT2ZZ9plZC79YUBH46bnejefQ+Wxzu+XbARQXcioa3QFt04TB4mXyTkAUKZtUWrgU2Hm1iVMGlHfJuevA11yx+4vj1HW9K5q7fKXfzgEkFGXIqgjJ5HSh4TwPeM0APjWUSbZTU4uPYkLIsPL5BwAjIT8p5qgrDvR1+hLDzYEuFt+0hdWXLvsJSmT8632nwfG3X+qErPUXnOEy35BO4Bv/uFbNS77ejay9LLN62FApLtirpHLPgymfc349R+QRgBfDenrbCqHO1kQ/xirjwF8xRFt2U4IMyI0maJf2wEU7pPJNnslqC2aVORHPnwW8LSv++aznDvf7NmMt9FqAfg9v+e/n38CAAD//ybdAGKWO7sjAAAAAElFTkSuQmCC",
  };

  const booking: TTicket = {
    id: 5,
    user: {
      email: "jono@mail.com",
      id: null,
      name: "jono",
    },
    bookingCode: "01ba37e9-04a6-4d78-bdef-84fa4c397e24",
    bookingType: "online",
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADaUlEQVR42uyZMW7zOhCER1DBcm9gXsSQruXCgAS40LVk+CL0DViyEDgPs3LiP696xbN+FmHlKF8Ambs7O7vB7/k9//cZST6eOfCebO6ZMdVoc/8kWZsBBiCsHcONyUgBpC18Zv/VQUDkssIKEI0rUHpR4zNzawt4kAUdM84nw7VLVs7d4cAz81ZB3WTY/HFjABAeT5bpnmxZOyoJjWv3Ix8+DLzSvlyHaMsfH/5dF38V0OkTMNW9QKCUm5h+iMiHgQG2sFq4VX0geat7EnIemgG65OUQZsDmcU+5fOnf3+IQgHyQyn8r55h5u6cMkbe1GQDR065MKzJwMoWbMyLR18MAYJI+cI2cR4WVtDJWKw0BI3EZq2FagWmLCnfEtEYqAY4CXLsUO0XzBL/FRcArmi0AiCyAlelOv0nJfr70FV9qfwDQpTxtsHIdYHNfoR6dwxozZzQDDPAEC9sQcUGXBWDy3jQcBkRMj4oyVdh8BsI8kguf3ynXBIB8OcOBPMljee9mgu72KCAiyGj195QnVlNHthkn/5NWAIBlrMD11cRdcsOuJEcBQ5Rb8ZJUa87lCmR/7WltBhhps5ucNWYvh/4u65XwdmKfB5Itj2qch5jDw0eb6DPOl4i1AAwa/aqpJN02c+6YwyNJzY4DSD5ZdtfHLNnP7pXnhgB5m5gpzfAk60nz3rQdBozJ51Bqci/9M7uH0eSOqTYDSEDcbVVwPp8QtjHhAhi//MPngS7lsJ0sbDLCTFb8CYWjGQDRitzy1fujbrIi4xzz21d/HPDxU5WoIkWX0d9f8b2tLQGKsn7MYT2ZZ9plZC79YUBH46bnejefQ+Wxzu+XbARQXcioa3QFt04TB4mXyTkAUKZtUWrgU2Hm1iVMGlHfJuevA11yx+4vj1HW9K5q7fKXfzgEkFGXIqgjJ5HSh4TwPeM0APjWUSbZTU4uPYkLIsPL5BwAjIT8p5qgrDvR1+hLDzYEuFt+0hdWXLvsJSmT8632nwfG3X+qErPUXnOEy35BO4Bv/uFbNS77ejay9LLN62FApLtirpHLPgymfc349R+QRgBfDenrbCqHO1kQ/xirjwF8xRFt2U4IMyI0maJf2wEU7pPJNnslqC2aVORHPnwW8LSv++aznDvf7NmMt9FqAfg9v+e/n38CAAD//ybdAGKWO7sjAAAAAElFTkSuQmCC",
    seatIds: [93, 96],
    studioId: 5,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };

  describe("createOnlineBooking", () => {
    it("should post to /booking/online and return mapped ticket", async () => {
      const mockResponse = {
        data: bookingModel,
      };

      mockApi.post = vi.fn().mockResolvedValue(mockResponse);

      const result = await datasource.createOnlineBooking({
        token: "abc123",
        seatIds: [1, 2, 3],
        studioId: 1,
      });

      expect(mockApi.post).toHaveBeenCalledWith(
        "/booking/online",
        { seatIds: [1, 2, 3], studioId: 1 },
        { headers: { Authorization: "Bearer abc123" } },
      );
      expect(result).toEqual(booking);
    });
  });

  describe("createOfflineBooking", () => {
    const request: TInputOfflineBooking = {
      customerEmail: "john@doe.com",
      customerName: "john doe",
      seatIds: [1, 2, 3],
      studioId: 1,
    };
    it("should post to /booking/offline and return mapped ticket", async () => {
      const mockResponse = {
        data: {
          ...bookingModel,
          booking: { ...bookingModel.booking, booking_type: "offline" },
        } as TBookingModel,
      };

      mockApi.post = vi.fn().mockResolvedValue(mockResponse);

      const result = await datasource.createOfflineBooking(request);

      expect(mockApi.post).toHaveBeenCalledWith("/booking/offline", request);

      expect(result).toEqual({ ...booking, bookingType: "offline" } as TTicket);
    });
  });

  describe("validateBookingCode", () => {
    it("should validate booking code and return entity", async () => {
      const bookingValidationModel: TBookingValidation = {
        booking: {
          bookingCode: "01ba37e9-04a6-4d78-bdef-84fa4c397e24",
          bookingType: "online",
          customerName: "John doe",
          seatIds: [1, 2, 3],
          studioId: 1,
        },
        valid: true,
      };
      const mockResponse = {
        data: bookingValidationModel,
      };

      mockApi.post = vi.fn().mockResolvedValue(mockResponse);

      const result = await datasource.validateBookingCode({
        bookingCode: "01ba37e9-04a6-4d78-bdef-84fa4c397e24",
      });

      expect(mockApi.post).toHaveBeenCalledWith("/booking/validate", {
        bookingCode: "01ba37e9-04a6-4d78-bdef-84fa4c397e24",
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getTikets", () => {
    it("should get my bookings and return mapped entities", async () => {
      const ticketsModel: TTicketModel[] = [
        {
          id: 10,
          booking_code: "0f7b96f7-5388-49b0-a49d-4253f0864aea",
          user_id: 1,
          user_name: "John Doe",
          user_email: "user@example.com",
          studio_id: 4,
          seat_ids: [78, 79],
          qr_code:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADV0lEQVR42uyZO47DOBBEi1DAkDcYXkSQrqXAAAU48LVk+CLUDRgyEFSLas3Hs9EGa5nBMKI8L2j+qqt78Df+xv89RpILgibFPuYBrN1Kcm8GGAC/xELes0jUtMdArsX+dBIQeXushfPIQE22MReMmrQGEIkZ6LWljqy9ewdwQSTJ4hXkhMYAwD/2QN4ZbosrFUO0yfN9eDGgm/5YS73o96fJr3fxbkCjY/GzdtJWgYip/y0iLwaGz9/TnbyR9LznI8itHQCRVQu4kpgAcHMZgI77NMBlO03FVtIWWbs7g6RVitoKMOZQ+6idzAX9h5T2iL7iPIC8PXSICwo6UmGHG3f4n3fRAFAw7kGZCNOYUdMCTH3USzkLGGLgI0NCakH6eSTSJtkf2gGACR/HczDdSIvIlbwuZwFOSQbAxZFztwd9hNtjV9gNAZTIVt22YxV3LSfSf6/i5cCAcNtckRoE5WZvItYj+O/U/H7A5TD3gNxgqL1BuSSuyk1nAZaa7RBlZvZwSOsGO9ZWAD0H6HCZi7dHKusOx3o5DVCQJHXTDrM3u0Naa7e3A+Qwdzv8PGb4xRVPZkxdBq+nAaYGpHkY5WikO8PcreU7P7YBzF0OnktEWpyVhqxjxrfROgUgc9BEu2iSFuT6vk6zBWCIQWVXTYty946amMvU7eFMQLGtxc9DROLKY2+tIEUzwMjDOidm1u4QEPPPsl4nAQryU0iDvc/ZMdy2WJ538v0A0DtWjNnKZ1VkxS8fQLecBVhnYw/SdypHy0goPz5Z9/cDjqa2NJPcaTLogfDJBb0cGEBuHwEds/VidPdMH35MzvuBL0t4vecyffWIpqdC7ARAVdUjm9GijJal5rmP5NYOMKia2KFi+RDYizPy5+G8HnA6RBbOsqadpZ5YvHzyp39oAlDFurJiiFKSUi9jBsz2DGcBI+HlgeeRx22/LpF1lKvZmwEO3bCKvsjkaGImx2r8cwBr7FvDM5b0WInuTn62GZsBrE+78ihtFmctUKjQqDgPUHmlaw+UZHXEgqC083XtmwFWfUakLRakHeZ2/tV1fznAcqh9txbq2t+Wn4K0CcD+l0RemY8Wm/VArDUynAVY5Z6DROzIOJtcMT7Cr87/m4G/8Tf++/gnAAD//xVCSirgqHRrAAAAAElFTkSuQmCC",
          booking_type: "online",
          status: "active",
          created_at: now,
          updated_at: now,
        },
        {
          id: 8,
          booking_code: "97dbaf06-5fe9-426e-b629-8d1257dc9ee1",
          user_id: 1,
          user_name: "John Doe",
          user_email: "user@example.com",
          studio_id: 3,
          seat_ids: [50, 51],
          qr_code:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADZ0lEQVR42uyZMY4rLRCECxEQcoPhItbMtRxYAsmBr4U1F2Fu0CHBiPrVzNr7NvuD53kESzSr/YIGmu6qNn7X7/rbayGZg9T4LOLyBJcMWe1Gsg0DzIDLRmBZfLoA7t4gkZv0f50EBD4yvEv6weZxmwOwbMJ9MCCIS6YIbPGOTwIXczpghAmAI4mYIcBgAOBWCqJuRUnmgKgJgNMATft1k3qbg3/88fHjXfxroK/Jux2BzEbcDjAt5WcV+SwwQ+K6CZNGS0qNOZD75McC+itwbJDr0lDts7Bi8rDtLEAPkJpyLfjHDlTMoVezV8qNACxaLoL0Y0zLxmozPLMhbD4LMEXiWuDSUshVm00LPmFC/brNEYA5sNqCXmCjlv17Dqz6LmI7CzB6hMVzXyiRpMYmcW3ecRxA47UF+iTlahtcQvDVNjDNZwGmIObJa33A1W7iNORqNWwMA8wQLK0XV6ZLEN2Xf2SA93YW8AqSz4JO7nOAW5sWimGApRy72E3xj7V4d9cEVCC2s4A5iFu3/i6ZDpIK+FcRGwFYiq8Iop0Ibp+gu9Bu/sc2Pw6YQnKTalm62HN3LRLap+/jAAhMthykSlPVz/o2wXs+C1gKNdMQWfq16gF6DfsV5AgAgk9WrY3RtOstO+C6lHelPQEwh8bT/PfHhx7pyrcqHgGYwQpDVctyBTy1gCSrSXgaANV4gaoWDkOqr5VaMW7zMIAp1Ji5LwVXqMfP8I9s+NrFOUBvwrEFRG7UTPPJUtx9HEBtF4B6m8F0Maw3oLvC91F/HjBU2SKadir0vMamHgff7+LfAz3UCfVmiuAy+RpbOGYNaT4LWOiZ+5wq+Ic2Gz3J3ihv4wDm8F9MajRUP9xzv+5vI/Z54Mu51xuCqH2uvQflwG9bPQSg/VsvV66Xyau/wPVHPnwcUFW8UosYPVmOl9pHWLeBAO2EE/RPgaW8W9J3PnwcWIhDujyLGlJxaaHX1vyWrAMAumyfKhyjD7U24lhwItAH+31EFtini90wL5u8bfUAQJ/Ttt4Wj/FjmqEa9duInQAEPjTImNFbD/k87MOrkI4CrCTsk72auW4rrCrSfCaQ4Y+faWzrsw7WiyoKjAO8fkvSln358rAPbZTpNKAP9rvHKeJ2c1TULo9tGwb4Xb/r/6//AgAA///s2jU189IW3AAAAABJRU5ErkJggg==",
          booking_type: "online",
          status: "active",
          created_at: now,
          updated_at: now,
        },
      ];

      const mockResponse = {
        data: ticketsModel,
      };

      mockApi.get = vi.fn().mockResolvedValue(mockResponse);

      const result = await datasource.getTikets({ token: "Bearer abc123" });

      expect(mockApi.get).toHaveBeenCalledWith("/booking/my-bookings", {
        headers: { Authorization: "Bearer abc123" },
      });

      expect(result).toEqual(ticketMapper.toEntities(mockResponse.data));
    });
  });
});
