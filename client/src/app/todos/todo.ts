export interface Todo {
  _id: string;
  status: boolean;
  owner: string;
  body: string;
  category: string;
  avatar: string;
}

//export type TodoRole = "admin" | "editor" | "viewer";
