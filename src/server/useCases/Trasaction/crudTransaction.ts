import { IRepository } from '@/infrastructure/repository/prisma'
import { Transaction, makeCreateTransaction } from "@/server/models/Transaction";
import { Tag } from "@/server/models/Tag"
import { generateId } from '..';


type createTransactionInput = {
    date: Date,
    description: string,
    amount: number,
    tags: string[],
    user: string
}

const validateModel = (data:Transaction) => {
    return
}

export const makeTransactionCrudUseCase = ({
    transactionRepository,
    tagRepository
}:{ 
    transactionRepository: IRepository<Transaction>,
    tagRepository: IRepository<Tag>
}) => {
    const createTransaction = makeCreateTransaction({
        generateId,
        validateModel
    })
    
    const create = async (data:createTransactionInput) => {
    
        try{
            const rawTransaction= {
                date: data.date,
                description: data.description,
                amount: data.amount,
                user: data.user,
            }
            // First get the tag ids and then get the associated tags from the database
            const tags = await Promise.all( data.tags.map(async (tagId) => {
                const tag = await tagRepository.findById(tagId) 
                if (tag) return tag
                throw new Error('Tag does not exist')
            }))
            // Then create it
            if(tags === null ) return

            const transaction = createTransaction({
                ...rawTransaction,
                tags: tags
            })
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
    
    const update = async (id:string, data:Transaction) => {
        // Update the Transaction using the repository method
        try{
            const transaction = createTransaction({...data, id})
            const response = await transactionRepository.update(id, transaction)
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