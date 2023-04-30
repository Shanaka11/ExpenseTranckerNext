import { tagApi } from "@/server/useCases"

export async function POST(request:Request){
    try{
        const data = await request.json()
        const tag = await tagApi.create({
            name: data.name,
        })

        return new Response(JSON.stringify(tag))
    } catch (e:any) {
        return new Response(e)
    }
  }