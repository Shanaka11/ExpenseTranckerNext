import { transactionApi } from "@/server/useCases"
import { NextRequest } from "next/server"

export const PUT = async (request: NextRequest,
    { params } : {
        params: { id: string}
    }) => {
    try{
        const input = await request.json()
        const transaction = await transactionApi.retrieve(params.id)

        if(transaction && !Array.isArray(transaction)){

            //@ts-ignore
            transaction.tags.push({connect: [...input.tags.map( (item:string) => {return {id: item}})]})
            const updatedTransaction = await transactionApi.update(params.id, transaction)
            return new Response(JSON.stringify(updatedTransaction), {
                status: 200
            })
        }else{
            throw "Transaction does not exist"
        }


    } catch (e:any) {
        return new Response(e, {
            status: 500
        })
    }
}