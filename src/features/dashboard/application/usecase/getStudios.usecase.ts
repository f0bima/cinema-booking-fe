import type { ICinema } from "../../../cinema/domain/repository/cinema.repository";

export const getStudiosUsecase = (props: { repo: ICinema }) => ({
  execute: async () => {
    return props.repo.getStudios();
  },
});
