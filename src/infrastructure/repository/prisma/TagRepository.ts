import { Tag } from "@/server/models/Tag"
import { createBaseRepository } from "./BaseCrudRepository"

export const makeTagRepository = () => {
    const {
        create,
        remove,
        findAll,
        findById,
        update
    } = createBaseRepository<Tag>('Tag')

    // If any changes are needed then override the above methods with a separate method and return it

    return {
        create,
        remove,
        findAll,
        findById,
        update
    }
}