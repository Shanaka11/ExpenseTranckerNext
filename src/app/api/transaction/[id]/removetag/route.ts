
import { transactionApi } from "@/server/useCases"
import { NextRequest } from "next/server"

export const PUT = async (request: NextRequest,
    { params } : {
        params: { id: string}
    }) => {
    try{
        const input = await request.json()
        const response = await transactionApi.removeTagFromTransaction(params.id, input.tags)
        return new Response(JSON.stringify(response), {
            status: 201
        })

    } catch (e:any) {
        return new Response(e, {
            status: 500
        })
    }
}