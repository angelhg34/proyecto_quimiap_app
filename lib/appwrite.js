import { Account, ID, Client, Avatars,Databases, Query} from 'react-native-appwrite';
import SignIn from './../app/(auth)/sign-in';
export const config={
    endpoint: 'https://clound.appwrite.io/v1',
    platform: 'com.jsm-aora',
    projectId: '66cf1f7c0029f358c766',
    databaseId: '66cf2134001e5d220a61',
    userCollectionId:'66cf2159000b522aca04',
    videoCollectionId:'66cf218f00146776dd06',
    storageId:'66cf241b0025af02a4ee'
}

const client  = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createUser = async( email,password,
username) =>{
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar:  avatarUrl
            }
        )
        return newUser;
    }catch(error){
        console.log(error);
        throw new Error(error);

    }
}

export const signIn = async(email,password)=>{
    try{
        const session = await account.craeteEmailSession(email, password)
        return session;
    }catch (error){
        throw new Error(error);
    }
}


export async function getCurrentUser(email, password){
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accoundId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    }catch (error) {
        console.log(error);
    }
}

