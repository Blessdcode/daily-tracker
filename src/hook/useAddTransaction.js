import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../utils/firebase.config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transaction");
  const { userID } = useGetUserInfo();

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
