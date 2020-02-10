import { element, by, ElementFinder } from 'protractor';

export default class MetricesUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.metrices.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#metrices-name'));
  descriptionInput: ElementFinder = element(by.css('input#metrices-description'));
  sumInput: ElementFinder = element(by.css('input#metrices-sum'));
  countInput: ElementFinder = element(by.css('input#metrices-count'));
  averageInput: ElementFinder = element(by.css('input#metrices-average'));

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

  async setSumInput(sum) {
    await this.sumInput.sendKeys(sum);
  }

  async getSumInput() {
    return this.sumInput.getAttribute('value');
  }

  async setCountInput(count) {
    await this.countInput.sendKeys(count);
  }

  async getCountInput() {
    return this.countInput.getAttribute('value');
  }

  async setAverageInput(average) {
    await this.averageInput.sendKeys(average);
  }

  async getAverageInput() {
    return this.averageInput.getAttribute('value');
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
