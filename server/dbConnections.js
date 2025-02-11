import mongoose from "mongoose";
import { userSchema } from "./models/User.js";
import { transactionSchema } from "./models/Transaction.js";
import { transactionTypeSchema } from "./models/TransactionType.js";

let transactionDB;
let userDB;

let db;

export const getDatabase = () => {
    if (db) return db;
    return createDatabase();
}

export const createDatabase = () => {
    console.log('Create database');
    const transactionDB = mongoose.createConnection(process.env.TRANSACTION_DB_URI);
    const userDB = mongoose.createConnection(process.env.USER_DB_URI);
    const User = userDB.model('User', userSchema);
    const Transaction = transactionDB.model('Transaction', transactionSchema);
    const TransactionType = transactionDB.model('TransactionType', transactionTypeSchema);
    db = {
        connections: {
            transactionDB,
            userDB
        },
        User,
        Transaction,
        TransactionType
    }
    return db;
}

const establishConnection = async () => {
    try {
        transactionDB = mongoose.connect(process.env.TRANSACTION_DB_URI);
        userDB = mongoose.createConnection(process.env.USER_DB_URI);
    } catch (e) {
        console.error("Failed to establish connection to databases:", e);
        process.exit(1);
    }
}

export default { establishConnection, transactionDB, userDB };

// // Function to connect to the transactions database
// export const connectTransactionDB = async (uri) => {
//     console.log(uri);
//     try {
//         const connection = await mongoose.connect(process.env.TRANSACTION_DB_URI, {});
//         console.log('Connected to Transaction DB');
//         return connection;
//     } catch (error) {
//         console.error('Error connecting to Transaction DB:', error);
//         throw error;
//     }
// };

// // Function to connect to the users database
// export const connectUserDB = async (uri) => {
//     try {
//         const connection = await mongoose.createConnection(process.env.USER_DB_URI, {});
//         console.log('Connected to User DB');
//         return connection;
//     } catch (error) {
//         console.error('Error connecting to User DB:', error);
//         throw error;
//     }
// };

// export const connectDatabases = async () => {
//     try {
//         await connectTransactionDB(process.env.TRANSACTION_DB_URI);
//         await connectUserDB(process.env.USER_DB_URI);
//     } catch (error) {
//         console.error('Error connecting to the databases:', error);
//         process.exit(1); // Exit the application if the connection fails
//     }
// };
