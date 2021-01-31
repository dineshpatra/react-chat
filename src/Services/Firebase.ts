import config from '../Config';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const app = firebase.initializeApp(config.firebase);
export const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const database = app.database();

function addUserToAuth(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then((userDetail) => {
            let user = userDetail.user;
            (userDetail.user) ? resolve(user) : reject("No user detail found");
        }).catch((error) => {
            reject(error);
        });
    });
}
export const signin = (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then((userDetail) => {
            let user = userDetail.user;
            (userDetail.user) ? resolve({id: user?.uid, email:user?.email}) : reject("No user detail found");
        }).catch((error) => {
            reject(error);
        });
    });
}

export const registerUser = async (email: string, password:string): Promise<any> => {
    try {
        let user    = await addUserToAuth(email, password);
        let data    = {id: user.uid, email: user.email};
        let dbStore = await database.ref("/users/" + user.uid).set(data);
        console.log("@dbStqore", dbStore);
        return Promise.resolve(data);
    } catch(err) {
        return Promise.reject(err);
    }
}