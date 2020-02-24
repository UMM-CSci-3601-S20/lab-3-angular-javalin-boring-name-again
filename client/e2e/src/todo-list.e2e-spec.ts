import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
    page.changeView('list');
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  // Testing Owner Filter
  it('Should type something in the owner filter and check that it returned Fry', () => {
    page.typeInput('todo-owner-input', 'Fry');

    // All of the todos in the list should have the owner we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Fry');
    });
  });

  // Testing for Category Filter
  it('Should type something in the category filter and check that it returned video games', () => {
    page.typeInput('todo-category-input', 'video games');

    // All of the todo list should have the category we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-category')).getText()).toEqual('video games');
    });
  });

 // Testing for Status Filter
  it('Should type something in the status filter and check that it returned true status', () => {
    page.changeView('list');
    page.selectMatSelectValue('todo-status-select', 'complete');
// All of the todo list should have the status we are filtering by
    page.getTodoListItems().each(e => {
    expect(e.element(by.className('todo-list-status')).getText()).toEqual('true');
      });
    });


 // Testing for Status Filter
  it('Should type something in the status filter and check that it returned false status', () => {
    page.changeView('list');
    page.selectMatSelectValue('todo-status-select', 'incomplete');

// All of the todo list should have the status we are filtering by
    page.getTodoListItems().each(e => {
    expect(e.element(by.className('todo-list-status')).getText()).toEqual('false');
      });
    });




  // Testing for Body filter
  it('Should type something in the body filter and check that it returned tempor cillum ', () => {
    page.changeView('list');
    page.typeInput('todo-body-input', 'tempor cillum');
    let body = page.getTodoListItems().map(e => e.element(by.className('todo-list-body')).getText());

    expect(body).toContain('tempor cillum');
// All of the todo list should have the status we are filtering by
    let owner = page.getTodoListItems().map(e => e.element(by.className('todo-list-owner')).getText());

    expect(owner).toContain('Fry');
    expect(owner).toContain(' Blanche');

      });



  /*
  it('Should type something in the body filter and check that it returned correct elements', () => {
    page.typeInput('todo-body-input', 'non');

    // All of the todos in the list should have the owner we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-body')).getText()).toEqual('non');
    });
  });

  it('Should change the view', () => {
    page.changeView('list');
    expect(page.getTodoListItems().count()).toBeGreaterThan(0); // There should be list items
  });

  */


  /*
    Wait to test this until we have a radio button that we can click on or something similar



  it('Should click view profile on a todo and go to the right URL', () => {
    page.clickViewProfile(page.getTodoListItems().first());

    // When the view profile button on the first todo card is clicked, we should be sent to the right URL
    page.getUrl().then(url => {
      expect(url.endsWith('/todos/588935f57546a2daea44de7c')).toBe(true);
    });

    // On this profile page we were sent to, the name should be correct
    expect(element(by.className('todo-category-name')).getText()).toEqual('software design');
  });
  */

});
