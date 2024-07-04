import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {db} from "./config";

export async function save(data){
    console.log('Saving...', data);
    try {
        const docRef = await addDoc(collection(db, "posts"), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    }catch(e){
        console.error("Error adding document", e);        
    }
}

export async function update(id, data) {
    try{
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, data);
        return true;
    }catch {
        console.log(data);
        return false;
    }
}

export async function remove(id){
    try {
        await deleteDoc(doc(db, "posts", id));
        return true;
    }catch{
        return false;
    }
}