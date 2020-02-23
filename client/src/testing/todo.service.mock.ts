import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
  {
    _id: ' bob_id',
    status: 'complete',
    owner: 'Bob',
    body: 'Make a working thingy.',
    category: 'Finishing the thing',
    avatar: 'https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon'
  },

  {
    _id: 'pat_id',
    status: 'incomplete',
    owner: 'Pat',
    body: 'Solve all the problems.',
    category: 'Fixing issues',
    avatar: 'https://gravatar.com/avatar/b42a11826c3bde672bce7e06ad729d44?d=identicon'
  },

  {
    _id: 'jamie_id',
    status: 'complete',
    owner: 'Jamie',
    body: 'Update old code.',
    category: 'Updates',
    avatar: 'https://gravatar.com/avatar/d4a6c71dd9470ad4cf58f78c100258bf?d=identicon'
  }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: string, owner?: string, body?: string, category?: string }): Observable<Todo[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
