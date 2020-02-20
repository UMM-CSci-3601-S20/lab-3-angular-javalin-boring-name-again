import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [

    {
      _id: ' bob_id',
      status: 'Complete',
      owner: 'Bob',
      body: 'Make a working thingy.',
      category: 'Finishing the thing',
      avatar: 'https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon'
    },

    {
      _id: 'pat_id',
      status: 'Incomplete',
      owner: 'Pat',
      body: 'Solve all the problems.',
      category: 'Fixing issues',
      avatar: 'https://gravatar.com/avatar/b42a11826c3bde672bce7e06ad729d44?d=identicon'
    },

    {
      _id: 'jamie_id',
      status: 'Complete',
      owner: 'Jamie',
      body: 'Update old code.',
      category: 'Updates'
      avatar: 'https://gravatar.com/avatar/d4a6c71dd9470ad4cf58f78c100258bf?d=identicon'
    }
  ];
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });



  it('getTodos() calls api/todos with filter parameter \'status\'', () => {

    todoService.getTodos({ status: Complete }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    expect(req.request.params.get('status')).toEqual('Complete');

    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with filter parameter \'category\'', () => {

    //Changes need to happen here
    todoService.getTodos({ body: 'Fake body.' }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('category')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    expect(req.request.params.get('category')).toEqual('Updates');

    req.flush(testTodos);
  });

  it('getTodos() calls api/todos with multiple filter parameters', () => {

    todoService.getTodos({ status: 'Incomplete', owner: 'Pat', category: 'Fixing issues' }).subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    // CHANGES HERE
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(todoService.todoUrl)
        && request.params.has('status') && request.params.has('owner') && request.params.has('category')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameters are correct
    // CHANGES HERE
    expect(req.request.params.get('status')).toEqual('Incomplete');
    expect(req.request.params.get('owner')).toEqual('Pat');
    expect(req.request.params.get('category')).toEqual('Fixing issues');

    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  //CHANGES HERE
  it('filterTodos() filters by name', () => {
    expect(testTodos.length).toBe(3);
    const todoName = 'a';
    expect(todoService.filterTodos(testTodos, { name: todoName }).length).toBe(2);
  });

  it('filterTodos() filters by company', () => {
    expect(testTodos.length).toBe(3);
    const todoCompany = 'UMM';
    expect(todoService.filterTodos(testTodos, { company: todoCompany }).length).toBe(1);
  });

  it('filterTodos() filters by name and company', () => {
    expect(testTodos.length).toBe(3);
    const todoCompany = 'UMM';
    const todoName = 'chris';
    expect(todoService.filterTodos(testTodos, { name: todoName, company: todoCompany }).length).toBe(1);
  });
});