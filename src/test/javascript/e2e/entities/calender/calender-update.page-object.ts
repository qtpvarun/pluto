import { element, by, ElementFinder } from 'protractor';

export default class CalenderUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.calender.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#calender-title'));
  startDateInput: ElementFinder = element(by.css('input#calender-startDate'));
  endDateInput: ElementFinder = element(by.css('input#calender-endDate'));
  jsonUIDetailsInput: ElementFinder = element(by.css('input#calender-jsonUIDetails'));
  taskHistorySelect: ElementFinder = element(by.css('select#calender-taskHistory'));
  taskSelect: ElementFinder = element(by.css('select#calender-task'));
  projectSelect: ElementFinder = element(by.css('select#calender-project'));
  departmentSelect: ElementFinder = element(by.css('select#calender-department'));
  assignedToSelect: ElementFinder = element(by.css('select#calender-assignedTo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setJsonUIDetailsInput(jsonUIDetails) {
    await this.jsonUIDetailsInput.sendKeys(jsonUIDetails);
  }

  async getJsonUIDetailsInput() {
    return this.jsonUIDetailsInput.getAttribute('value');
  }

  async taskHistorySelectLastOption() {
    await this.taskHistorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async taskHistorySelectOption(option) {
    await this.taskHistorySelect.sendKeys(option);
  }

  getTaskHistorySelect() {
    return this.taskHistorySelect;
  }

  async getTaskHistorySelectedOption() {
    return this.taskHistorySelect.element(by.css('option:checked')).getText();
  }

  async taskSelectLastOption() {
    await this.taskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async taskSelectOption(option) {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect() {
    return this.taskSelect;
  }

  async getTaskSelectedOption() {
    return this.taskSelect.element(by.css('option:checked')).getText();
  }

  async projectSelectLastOption() {
    await this.projectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projectSelectOption(option) {
    await this.projectSelect.sendKeys(option);
  }

  getProjectSelect() {
    return this.projectSelect;
  }

  async getProjectSelectedOption() {
    return this.projectSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
  }

  async assignedToSelectLastOption() {
    await this.assignedToSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async assignedToSelectOption(option) {
    await this.assignedToSelect.sendKeys(option);
  }

  getAssignedToSelect() {
    return this.assignedToSelect;
  }

  async getAssignedToSelectedOption() {
    return this.assignedToSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
