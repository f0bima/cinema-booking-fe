import { describe, it, expect, vi, beforeEach } from "vitest";
import { authenticationDatasource } from "./authentication.datasource";
import type { AxiosInstance } from "axios";
import type { TAuthUserModel } from "../model/authUser.model";

describe("authenticationDatasource", () => {
  let api: AxiosInstance;
  let datasource: ReturnType<typeof authenticationDatasource>;

  beforeEach(() => {
    api = {
      post: vi.fn(),
    } as unknown as AxiosInstance;

    datasource = authenticationDatasource({ api });
  });

  const authUserModel: TAuthUserModel = {
    user: {
      id: 1,
      email: "john@doe.com",
      name: "John doe",
      role: "customer",
    },
    token: "my-token",
  };

  it("should login and return auth user", async () => {
    const input = { email: "john@doe.com", password: "secret" };
    const mockResponse = {
      data: authUserModel,
    };

    (api.post as any).mockResolvedValue(mockResponse);

    const result = await datasource.login(input);

    expect(api.post).toHaveBeenCalledWith("/auth/login", input);
    expect(result).toEqual(mockResponse.data);
  });

  it("should register and return auth user", async () => {
    const input = { name: "User", email: "john@doe.com", password: "secret" };
    const mockResponse = {
      data: authUserModel,
    };

    (api.post as any).mockResolvedValue(mockResponse);

    const result = await datasource.register(input);

    expect(api.post).toHaveBeenCalledWith("/auth/register", input);
    expect(result).toEqual(mockResponse.data);
  });
});
