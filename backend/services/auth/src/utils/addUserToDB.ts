// import {UserInterface} from "../types/user";
import {createUser} from "../models/addUser"
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const addUserToDB = async () => {

    const name:string = await askQuestion("Enter name: ");
    const email:string = await askQuestion("Enter email: ");
    const role:"USER" | "ADMIN" = await askQuestion("Enter role (USER/ADMIN): ") as "USER" | "ADMIN";

    try {
        const res = await createUser(name , email , role);

        console.log("User created successfully: ", res);
        
    } 
    catch (error) { 
        console.error("Error creating user: ", error);
    }
    finally {
        rl.close();
    }

}

addUserToDB()