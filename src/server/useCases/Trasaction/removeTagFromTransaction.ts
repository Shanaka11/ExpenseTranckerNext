import { IRepository } from "@/infrastructure/repository/prisma";
import { Tag } from "@/server/models/Tag";
import { Transaction } from "@/server/models/Transaction";

export const makeRemoveTagFromTransaction = ({
  transactionRepository,
  tagRepository,
}: {
  transactionRepository: IRepository<Transaction>;
  tagRepository: IRepository<Tag>;
}) => {
  const removeTagFromTransaction = async (
    transactionId: string,
    tagIds: string[]
  ) => {
    try {
      // Fetch the transaction from the database
      const transaction = await transactionRepository.findById(transactionId);
      if (transaction) {
        // Validate if tags exist
        const tags = await Promise.all(
          tagIds.map(async (tagId) => {
            const tag = await tagRepository.findById(tagId);
            if (tag) return tag;
            throw new Error("Tag does not exist");
          })
        );
        // Add the new tags to the transaction object
        if (transaction.tags) {
          transaction.tags = transaction.tags.filter((baseTag) => {
            const temp = tags.filter((tag) => {
              return tag.id === baseTag.id;
            });

            return temp.length === 0;
          });
        }
        // Update the transaction
        const updatedTransaction = await transactionRepository.update(
          transactionId,
          transaction
        );
        return updatedTransaction;
      } else {
        throw "Transaction does not exist";
      }
    } catch (e: any) {
      throw e;
    }
  };

  return removeTagFromTransaction;
};
