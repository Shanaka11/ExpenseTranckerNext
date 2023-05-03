import { tagRepository, transactionRepository } from '@/infrastructure/repository/prisma'
import { makeTransactionCrudUseCase } from './crudTransaction'
import { makeAddTagToTransaction } from './addTagToTransaction'
import { makeRemoveTagFromTransaction } from './removeTagFromTransaction'

const addTagToTransaction = makeAddTagToTransaction({
    tagRepository,
    transactionRepository
})

const removeTagFromTransaction = makeRemoveTagFromTransaction({
    tagRepository,
    transactionRepository
})

const transactionApi = {
    ...makeTransactionCrudUseCase({ 
        transactionRepository,
        tagRepository
    }),
    // If there are other use cases use this to export them
    addTagToTransaction,
    removeTagFromTransaction
}

export default transactionApi