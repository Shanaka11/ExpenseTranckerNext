import { tagRepository } from "@/infrastructure/repository/prisma";
import { makeTagCrudUseCase } from "./crudTag";

const tagApi = {
  ...makeTagCrudUseCase({ tagRepository }),
  // If there are other use cases use this to export them
};

export default tagApi;
