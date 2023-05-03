import { IRepository } from "@/infrastructure/repository/prisma"
import { Tag } from "@/server/models/Tag"
import { Transaction } from "@/server/models/Transaction"

export const makeAddTagToTransaction = ({
    transactionRepository,
    tagRepository
}:{
    transactionRepository: IRepository<Transaction>,
    tagRepository: IRepository<Tag>
}) => {
    
    const addTagToTransaction = async (transactionId: string, tagIds: string[]) => {
        try {
            // Fetch the transaction from the database
            const transaction = await transactionRepository.findById(transactionId)
            if(transaction){
                // Validate if tags exist
                const tags = await Promise.all( tagIds.map(async (tagId) => {
                    const tag = await tagRepository.findById(tagId) 
                    if (tag) return tag
                    throw new Error('Tag does not exist')
                }))
                // Add the new tags to the transaction object
                transaction.tags?.push(...tags)
                // Update the transaction
                const updatedTransaction = await transactionRepository.update(transactionId, transaction)
                return updatedTransaction
            }else{
                throw "Transaction does not exist"
            }
        } catch (e:any)  {
            throw e
        }
    }

    return addTagToTransaction
}