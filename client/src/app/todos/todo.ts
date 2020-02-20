export interface Todo {
  _id: string;
  status: string;
  owner: string;
  body: string;
  category: string;
  avatar: string;
  role: TodoRole;
}

export type TodoRole = "admin" | "editor" | "viewer";
