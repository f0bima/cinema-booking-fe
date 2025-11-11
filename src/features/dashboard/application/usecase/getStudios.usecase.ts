import type { IStudio } from "../../../cinema/domain/repository/cinema.interface";

export const getStudiosUsecase = (props: { repo: IStudio }) => ({
  execute: async () => {
    return props.repo.getStudios();
  },
});
