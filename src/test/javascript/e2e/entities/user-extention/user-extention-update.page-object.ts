import { element, by, ElementFinder } from 'protractor';

export default class UserExtentionUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.userExtention.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  loginInput: ElementFinder = element(by.css('input#user-extention-login'));
  profilePicInput: ElementFinder = element(by.css('input#user-extention-profilePic'));
  groupInput: ElementFinder = element(by.css('input#user-extention-group'));
  jsonOtherDetailsInput: ElementFinder = element(by.css('input#user-extention-jsonOtherDetails'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLoginInput(login) {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput() {
    return this.loginInput.getAttribute('value');
  }

  async setProfilePicInput(profilePic) {
    await this.profilePicInput.sendKeys(profilePic);
  }

  async getProfilePicInput() {
    return this.profilePicInput.getAttribute('value');
  }

  async setGroupInput(group) {
    await this.groupInput.sendKeys(group);
  }

  async getGroupInput() {
    return this.groupInput.getAttribute('value');
  }

  async setJsonOtherDetailsInput(jsonOtherDetails) {
    await this.jsonOtherDetailsInput.sendKeys(jsonOtherDetails);
  }

  async getJsonOtherDetailsInput() {
    return this.jsonOtherDetailsInput.getAttribute('value');
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
