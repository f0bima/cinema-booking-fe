import { describe, it, expect, vi, afterEach } from "vitest";
import { cinemaDatasource } from "./cinema.datasource";
import type { AxiosInstance } from "axios";
import type { TStudioModel } from "@/features/cinema/infrastructure/model/studio.model";
import type { TStudio } from "@/features/cinema/domain/entity/studio.entity";
import type { TSeatModel } from "@/features/cinema/infrastructure/model/seat.model";
import type { TSeat } from "@/features/cinema/domain/entity/seat.entity";

describe("cinemaDatasource", () => {
  const mockApi = {
    get: vi.fn(),
  } as unknown as AxiosInstance;

  const datasource = cinemaDatasource({ api: mockApi });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const now = new Date();

  it("should call /cinema/studios and map studios correctly", async () => {
    const studiosModel: TStudioModel[] = [
      {
        id: 1,
        name: "Studio 1",
        total_seats: 20,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: "Studio 2",
        total_seats: 20,
        created_at: now,
        updated_at: now,
      },
    ];

    const studios: TStudio[] = [
      {
        id: 1,
        name: "Studio 1",
        totalSeats: 20,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: "Studio 2",
        totalSeats: 20,
        createdAt: now,
        updatedAt: now,
      },
    ];
    const mockResponse = { data: studiosModel };
    const mappedStudios = studios;

    mockApi.get = vi.fn().mockResolvedValueOnce(mockResponse);

    const result = await datasource.getStudios();

    expect(mockApi.get).toHaveBeenCalledWith("/cinema/studios");

    expect(result).toEqual(mappedStudios);
  });

  it("should call /cinema/studios/:id/seats and map seats correctly", async () => {
    const seatsModel: TSeatModel[] = [
      {
        id: 1,
        studio_id: 5,
        seat_number: "A1",
        is_available: false,
        studio: {
          id: 5,
          name: "Studio 5",
          total_seats: 20,
          created_at: now,
          updated_at: now,
        },
        studio_name: "Studio 5",
        created_at: now,
        updated_at: now,
      },
      {
        id: 10,
        studio_id: 5,
        seat_number: "A10",
        is_available: false,
        studio: {
          id: 5,
          name: "Studio 5",
          total_seats: 20,
          created_at: now,
          updated_at: now,
        },
        studio_name: "Studio 5",
        created_at: now,
        updated_at: now,
      },
    ];

    const seats: TSeat[] = [
      {
        id: 1,
        studioId: 5,
        seatNumber: "A1",
        isAvailable: false,
        studio: {
          id: 5,
          name: "Studio 5",
          totalSeats: 20,
          createdAt: now,
          updatedAt: now,
        },
        studioName: "Studio 5",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 10,
        studioId: 5,
        seatNumber: "A10",
        isAvailable: false,
        studio: {
          id: 5,
          name: "Studio 5",
          totalSeats: 20,
          createdAt: now,
          updatedAt: now,
        },
        studioName: "Studio 5",
        createdAt: now,
        updatedAt: now,
      },
    ];
    const mockResponse = { data: seatsModel };
    const mappedSeats = seats;

    mockApi.get = vi.fn().mockResolvedValueOnce(mockResponse);

    const result = await datasource.getStudioSeats({ studioId: 5 });
    console.log({ result });

    expect(mockApi.get).toHaveBeenCalledWith("/cinema/studios/5/seats");

    expect(result).toEqual(mappedSeats);
  });
});
