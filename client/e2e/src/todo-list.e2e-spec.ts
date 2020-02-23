import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    page.typeInput('todo-owner-input', 'Fry');

    // All of the todo cards should have the owner we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-owner')).getText()).toEqual('Fry');
    });
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-category-input', 'video games');

    // All of the todo list should have the category we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-category')).getText()).toEqual('video games');
    });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-category-input', 'ti');

    // Go through each of the cards that are being shown and get the companies
    const categories = page.getTodoListItems().map(e => e.element(by.className('todo-list-category')).getText());

    // We should see these categories
    expect(categories).toContain('homework');
    expect(categories).toContain('video games');

    // We shouldn't see these companies
    expect(categories).not.toContain('DATAGENE');
    expect(categories).not.toContain('OHMNET');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    page.typeInput('todo-owner-input', 'Fry');

    // Go through each of the cards that are being shown and get the names
    const owner = page.getTodoListItems().map(e => e.element(by.className('todo-card-name')).getText());

    // We should see these todos whose age is 27
    expect(owner).toContain(' Fry');
    expect(owner).toContain(' Blanche');
    expect(owner).toContain(' Barry ');

    // We shouldn't see these todos
    expect(owner).not.toContain(' Stewart');
    expect(owner).not.toContain(' Ferguson');
  });

  it('Should change the view', () => {
    page.changeView('list');

    // expect(page.getTodoCards().count()).toEqual(0); // There should be no cards
    expect(page.getTodoListItems().count()).toBeGreaterThan(0); // There should be list items
  });

  it('Should select a role, switch the view, and check that it returned correct elements', () => {
    page.selectMatSelectValue('todo-role-select', 'viewer');

    page.changeView('list');

    // All of the todo list items should have the role we are looking for
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-role')).getText()).toEqual('viewer');
    });
  });

  it('Should click view profile on a todo and go to the right URL', () => {
    page.clickViewProfile(page.getTodoListItems().first());

    // When the view profile button on the first todo card is clicked, we should be sent to the right URL
    page.getUrl().then(url => {
      expect(url.endsWith('/todos/588935f57546a2daea44de7c')).toBe(true);
    });

    // On this profile page we were sent to, the name should be correct
    expect(element(by.className('todo-category-name')).getText()).toEqual('software design');
  });

});
