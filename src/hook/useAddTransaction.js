import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../utils/firebase.config";
import { useGetUserInfo } from "./useGetUserInfo"; 

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");

  // Fetch userID using auth.currentUser or from useGetUserInfo
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found");
  }

  const userID = user.uid; 

  // Add Transaction Function
  const addTransaction = async ({
    title,
    description,
    transactionAmount,
    transactionType,
  }) => {
    try {
      await addDoc(transactionCollectionRef, {
        userID,
        title,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp(), 
      });
      console.log("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return { addTransaction };
};
