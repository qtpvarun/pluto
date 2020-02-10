import { element, by, ElementFinder } from 'protractor';

export default class DepartmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.department.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#department-name'));
  descriptionInput: ElementFinder = element(by.css('input#department-description'));
  activeFlagInput: ElementFinder = element(by.css('input#department-activeFlag'));
  teamSelect: ElementFinder = element(by.css('select#department-team'));
  metricesSelect: ElementFinder = element(by.css('select#department-metrices'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  getActiveFlagInput() {
    return this.activeFlagInput;
  }
  async teamSelectLastOption() {
    await this.teamSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teamSelectOption(option) {
    await this.teamSelect.sendKeys(option);
  }

  getTeamSelect() {
    return this.teamSelect;
  }

  async getTeamSelectedOption() {
    return this.teamSelect.element(by.css('option:checked')).getText();
  }

  async metricesSelectLastOption() {
    await this.metricesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async metricesSelectOption(option) {
    await this.metricesSelect.sendKeys(option);
  }

  getMetricesSelect() {
    return this.metricesSelect;
  }

  async getMetricesSelectedOption() {
    return this.metricesSelect.element(by.css('option:checked')).getText();
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
