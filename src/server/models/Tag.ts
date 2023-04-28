import { IMakeCreateModel } from "./IMakeCreateModel"


export type Tag = {
    id?: string,
    name: string
}

export const makeCreateTag = ({
    validateModel,
    generateId
}:IMakeCreateModel<Tag>) => {

    return (data:Tag) => {
        if(!data.id)    data.id = generateId()
        validateModel(data)
        return {
            ...data,
            id: data.id
        }
    }
}