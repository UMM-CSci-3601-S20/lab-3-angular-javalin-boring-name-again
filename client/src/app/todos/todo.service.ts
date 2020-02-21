import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?: { status?: boolean, owner?: string, body?: string, category?: string}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.status == true) {
        httpParams = httpParams.set('status', 'complete');
      }
      if (filters.status == false) {
        httpParams = httpParams.set('status', 'incomplete');
      }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  //CHANGES NEED TO BE MADE

  filterTodos(todos: Todo[], filters: { status?: boolean, category?: string, company?: string, owner?: string}): Todo[] {

    let filteredTodos = todos;
    // Filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }

    // Filter by status
    if (filters.status) {
      filters.status = filters.status.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        if (filteredTodos == 'complete')
        return todo.status;
      });
    }

    // Filter by company
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }

    // Filter by owner
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }

    return filteredTodos;
  }
}
