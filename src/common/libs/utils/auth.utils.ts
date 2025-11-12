export const authUtils = {
  getToken: ({ request }: { request: Request }) => {
    const cookie = request.headers.get("cookie");
    const token = cookie?.match(/token=([^;]+)/)?.[1];
    return token;
  },
};
