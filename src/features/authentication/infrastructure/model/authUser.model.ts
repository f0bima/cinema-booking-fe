export type TAuthUserModel = {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
};
