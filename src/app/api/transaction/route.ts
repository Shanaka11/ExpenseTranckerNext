import checkPermissions from "@/app/util/checkPermissions";
import { transactionApi } from "@/server/useCases";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const userId = await checkPermissions();
    const input = await request.json();
    input.user = userId;
    const transaction = await transactionApi.create(input);

    return new Response(JSON.stringify(transaction), {
      status: 200,
    });
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    });
  }
};
export const GET = async () => {
  try {
    const userId = await checkPermissions();

    const transactions = await transactionApi.retrieve();

    return new Response(JSON.stringify(transactions), {
      status: 200,
    });
  } catch (e: any) {
    return new Response(e, {
      status: 500,
    });
  }
};
