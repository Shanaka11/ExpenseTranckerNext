import { tagRepository, transactionRepository } from '@/infrastructure/repository/prisma'
import { makeTransactionCrudUseCase } from './crudTransaction'

const transactionApi = {
    ...makeTransactionCrudUseCase({ 
        transactionRepository,
        tagRepository
    })
    // If there are other use cases use this to export them
}

export default transactionApi