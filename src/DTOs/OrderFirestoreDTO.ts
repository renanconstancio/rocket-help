import { Timestamp } from "firebase/firestore/lite";

export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  solution?: string;
  status: "open" | "closed";
  created_at: Timestamp;
  closed_at?: Timestamp;
};
