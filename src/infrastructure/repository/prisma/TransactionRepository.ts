import { Transaction } from "@/server/models/Transaction"
import { createBaseRepository } from "./BaseCrudRepository"

export const makeTransactionRepository = () => {
    const {
        create,
        remove,
        findAll,
        findById,
        update
    } = createBaseRepository<Transaction>('Transaction')

    // If any changes are needed then override the above methods with a separate method and return it

    return {
        create,
        remove,
        findAll,
        findById,
        update
    }
}