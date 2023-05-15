import { currentUser } from "@clerk/nextjs/app-beta";

const checkPermissions = async () => {
    const user = await currentUser()
    
    if(!user){
        throw 'You must be logged in'
    }   

    return user.id
}

export default checkPermissions