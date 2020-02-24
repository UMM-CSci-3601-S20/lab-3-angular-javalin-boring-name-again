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
  },

  {
    _id: 'pat_id',
    status: 'complete',
    owner: 'Fry',
    body: 'Solve all the problems.',
    category: 'homework',
  },

  {
    _id: 'jamie_id',
    status: 'complete',
    owner: 'Jamie',
    body: 'Update old code.',
    category: 'Updates',
  }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: string, owner?: string, body?: string, category?: string }): Observable<Todo[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockTodoService.testTodos);
  }
}
