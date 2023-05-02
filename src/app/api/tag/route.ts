import { tagApi } from "@/server/useCases"
import { NextRequest } from "next/server"

// Create Tag
export const POST = async (request:NextRequest) => {
    try{
        const { name } = await request.json()
        
        const tag = await tagApi.create({
            name: name,
        })

        return new Response(JSON.stringify(tag), {
            status: 201
        })
    } catch (e:any) {
        return new Response(e, {
            status: 500
        })
    }
}

// Get Tags / Implement filters later
export const GET = async (request: NextRequest) => {
    try{
        const tags = await tagApi.retrieve()

        return new Response(JSON.stringify(tags), {
            status: 200
        })

    } catch (e:any) {
        return new Response(e, {
            status: 500
        })
    }
}