export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  created_at: string;
  closed_at?: string;
};
