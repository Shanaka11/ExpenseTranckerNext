import { v4 as uuidv4 } from 'uuid'
import tagApi from "./Tag"
import transactionApi from "./Trasaction"

export function generateId() {
    return uuidv4()
}

export {
    tagApi,
    transactionApi
}