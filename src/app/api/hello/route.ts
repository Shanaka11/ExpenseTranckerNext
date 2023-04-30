export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

export async function POST(request:Request){
  const data = await request.json()
  return new Response(JSON.stringify(data))
}