import { IRepository } from '@/infrastructure/repository/prisma'
import { Transaction, makeCreateTransaction } from "@/server/models/Transaction";

const generateId = () => {
    return "1"
}

const validateModel = (data:Transaction) => {
    return
}

export const makeTransactionCrudUseCase = ({
    transactionRepository
}:{ 
    transactionRepository: IRepository<Transaction>
}) => {
    const createTransaction = makeCreateTransaction({
        generateId,
        validateModel
    })
    
    const create = async (data:Transaction) => {
    
        try{
            const transaction = createTransaction(data)
            const response = await transactionRepository.create(transaction)
            return response
        } catch (e) {
            throw e
        }
    }
    
    const retrieve = async (id?: string) => {
        // For now all records are retrieved, adjust this so we can include filtering
        // Retrieve the Transaction using the repository method
        try{

            if(id){
                const response = await transactionRepository.findById(id)
                return response
            }
            const response = await transactionRepository.findAll()
            return response

        } catch (e) {
            throw e
        }
    }
    
    const update = async (data:Transaction) => {
        // Update the Transaction using the repository method
        try{
            const transaction = createTransaction(data)
            const response = await transactionRepository.update(transaction.id, transaction)
            return response
        } catch (e) {
            throw e
        }
    }
    
    const remove = async (id:string) => {
        // Remove the tag using the repository method
        try{
            const response = await transactionRepository.remove(id)
            return response
        } catch (e) {
            throw e
        }
    }

    return {
        create,
        remove,
        retrieve,
        update
    }
}