import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  where,
  query,
  orderBy,
  doc,
} from "firebase/firestore/lite";

import { dateFormat } from "../utils/firestoreDateFormat";
import { db } from "../providers/firebase";

export async function getOrders(status: string) {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      where("status", "==", status),
    );

    const orderData = (await getDocs(ordersQuery)).docs.map(doc => {
      const { patrimony, description, status, created_at } = doc.data();

      return {
        id: doc.id,
        patrimony,
        description,
        status,
        when: dateFormat(created_at),
      };
    });

    // console.log("orderData", orderData);

    return orderData;
  } catch (e) {
    console.log(e, "e");
  }
}

export async function getOrder(id: string) {
  try {
    const orderData = await getDoc(doc(db, "orders", id));
    if (!orderData.exists()) throw new Error("Erro");

    const { created_at, description, patrimony, status, closed_at, solution } =
      orderData.data();

    return {
      id,
      patrimony,
      description,
      status,
      solution,
      created_at,
      closed_at,
    };
  } catch (e) {
    console.log(e, "e");
  }
}

export async function deleteOrder(id: string) {
  try {
    await deleteDoc(doc(db, "orders", id));
  } catch (e) {
    console.log(e, "e");
  }
}

export async function addOrder(order) {
  try {
    return await addDoc(collection(db, "orders"), { ...order });
  } catch (e) {
    throw new Error(e);
  }
}

export async function editOrder(order) {
  try {
    await setDoc(doc(db, "orders", order.id), { ...order });
  } catch (e) {
    console.log(e, "e");
  }
}
