export interface Todo {
  _id: string;
  status: string;
  owner: string;
  body: string;
  category: string;
  avatar: string;
}
export type TodoStatus = 'complete' | 'incomplete'
