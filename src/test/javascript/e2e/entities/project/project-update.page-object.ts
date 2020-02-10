import { element, by, ElementFinder } from 'protractor';

export default class ProjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('proTrackApp.project.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#project-name'));
  descriptionInput: ElementFinder = element(by.css('input#project-description'));
  billingCompanyInput: ElementFinder = element(by.css('input#project-billingCompany'));
  careerNameInput: ElementFinder = element(by.css('input#project-careerName'));
  siteNumberInput: ElementFinder = element(by.css('input#project-siteNumber'));
  siteNameInput: ElementFinder = element(by.css('input#project-siteName'));
  siteCompanyInput: ElementFinder = element(by.css('input#project-siteCompany'));
  siteLatitudeInput: ElementFinder = element(by.css('input#project-siteLatitude'));
  siteLongitudeInput: ElementFinder = element(by.css('input#project-siteLongitude'));
  siteTypeSelect: ElementFinder = element(by.css('select#project-siteType'));
  isSite360Input: ElementFinder = element(by.css('input#project-isSite360'));
  internalDueInput: ElementFinder = element(by.css('input#project-internalDue'));
  pONumberInput: ElementFinder = element(by.css('input#project-pONumber'));
  projectTypeSelect: ElementFinder = element(by.css('select#project-projectType'));
  programManagerSelect: ElementFinder = element(by.css('select#project-programManager'));
  projectCoordinatorSelect: ElementFinder = element(by.css('select#project-projectCoordinator'));
  prpjectLeadSelect: ElementFinder = element(by.css('select#project-prpjectLead'));
  superviserSelect: ElementFinder = element(by.css('select#project-superviser'));
  prpjectManagerSelect: ElementFinder = element(by.css('select#project-prpjectManager'));
  prpjectEngineerSelect: ElementFinder = element(by.css('select#project-prpjectEngineer'));
  technicianSelect: ElementFinder = element(by.css('select#project-technician'));
  engineerOfRecordSelect: ElementFinder = element(by.css('select#project-engineerOfRecord'));
  trafficSpecialistSelect: ElementFinder = element(by.css('select#project-trafficSpecialist'));
  prpjectStaffSelect: ElementFinder = element(by.css('select#project-prpjectStaff'));
  qualitySpecialistSelect: ElementFinder = element(by.css('select#project-qualitySpecialist'));
  parentProjectSelect: ElementFinder = element(by.css('select#project-parentProject'));

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

  async setBillingCompanyInput(billingCompany) {
    await this.billingCompanyInput.sendKeys(billingCompany);
  }

  async getBillingCompanyInput() {
    return this.billingCompanyInput.getAttribute('value');
  }

  async setCareerNameInput(careerName) {
    await this.careerNameInput.sendKeys(careerName);
  }

  async getCareerNameInput() {
    return this.careerNameInput.getAttribute('value');
  }

  async setSiteNumberInput(siteNumber) {
    await this.siteNumberInput.sendKeys(siteNumber);
  }

  async getSiteNumberInput() {
    return this.siteNumberInput.getAttribute('value');
  }

  async setSiteNameInput(siteName) {
    await this.siteNameInput.sendKeys(siteName);
  }

  async getSiteNameInput() {
    return this.siteNameInput.getAttribute('value');
  }

  async setSiteCompanyInput(siteCompany) {
    await this.siteCompanyInput.sendKeys(siteCompany);
  }

  async getSiteCompanyInput() {
    return this.siteCompanyInput.getAttribute('value');
  }

  async setSiteLatitudeInput(siteLatitude) {
    await this.siteLatitudeInput.sendKeys(siteLatitude);
  }

  async getSiteLatitudeInput() {
    return this.siteLatitudeInput.getAttribute('value');
  }

  async setSiteLongitudeInput(siteLongitude) {
    await this.siteLongitudeInput.sendKeys(siteLongitude);
  }

  async getSiteLongitudeInput() {
    return this.siteLongitudeInput.getAttribute('value');
  }

  async setSiteTypeSelect(siteType) {
    await this.siteTypeSelect.sendKeys(siteType);
  }

  async getSiteTypeSelect() {
    return this.siteTypeSelect.element(by.css('option:checked')).getText();
  }

  async siteTypeSelectLastOption() {
    await this.siteTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getIsSite360Input() {
    return this.isSite360Input;
  }
  async setInternalDueInput(internalDue) {
    await this.internalDueInput.sendKeys(internalDue);
  }

  async getInternalDueInput() {
    return this.internalDueInput.getAttribute('value');
  }

  async setPONumberInput(pONumber) {
    await this.pONumberInput.sendKeys(pONumber);
  }

  async getPONumberInput() {
    return this.pONumberInput.getAttribute('value');
  }

  async projectTypeSelectLastOption() {
    await this.projectTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projectTypeSelectOption(option) {
    await this.projectTypeSelect.sendKeys(option);
  }

  getProjectTypeSelect() {
    return this.projectTypeSelect;
  }

  async getProjectTypeSelectedOption() {
    return this.projectTypeSelect.element(by.css('option:checked')).getText();
  }

  async programManagerSelectLastOption() {
    await this.programManagerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async programManagerSelectOption(option) {
    await this.programManagerSelect.sendKeys(option);
  }

  getProgramManagerSelect() {
    return this.programManagerSelect;
  }

  async getProgramManagerSelectedOption() {
    return this.programManagerSelect.element(by.css('option:checked')).getText();
  }

  async projectCoordinatorSelectLastOption() {
    await this.projectCoordinatorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async projectCoordinatorSelectOption(option) {
    await this.projectCoordinatorSelect.sendKeys(option);
  }

  getProjectCoordinatorSelect() {
    return this.projectCoordinatorSelect;
  }

  async getProjectCoordinatorSelectedOption() {
    return this.projectCoordinatorSelect.element(by.css('option:checked')).getText();
  }

  async prpjectLeadSelectLastOption() {
    await this.prpjectLeadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prpjectLeadSelectOption(option) {
    await this.prpjectLeadSelect.sendKeys(option);
  }

  getPrpjectLeadSelect() {
    return this.prpjectLeadSelect;
  }

  async getPrpjectLeadSelectedOption() {
    return this.prpjectLeadSelect.element(by.css('option:checked')).getText();
  }

  async superviserSelectLastOption() {
    await this.superviserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async superviserSelectOption(option) {
    await this.superviserSelect.sendKeys(option);
  }

  getSuperviserSelect() {
    return this.superviserSelect;
  }

  async getSuperviserSelectedOption() {
    return this.superviserSelect.element(by.css('option:checked')).getText();
  }

  async prpjectManagerSelectLastOption() {
    await this.prpjectManagerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prpjectManagerSelectOption(option) {
    await this.prpjectManagerSelect.sendKeys(option);
  }

  getPrpjectManagerSelect() {
    return this.prpjectManagerSelect;
  }

  async getPrpjectManagerSelectedOption() {
    return this.prpjectManagerSelect.element(by.css('option:checked')).getText();
  }

  async prpjectEngineerSelectLastOption() {
    await this.prpjectEngineerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prpjectEngineerSelectOption(option) {
    await this.prpjectEngineerSelect.sendKeys(option);
  }

  getPrpjectEngineerSelect() {
    return this.prpjectEngineerSelect;
  }

  async getPrpjectEngineerSelectedOption() {
    return this.prpjectEngineerSelect.element(by.css('option:checked')).getText();
  }

  async technicianSelectLastOption() {
    await this.technicianSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async technicianSelectOption(option) {
    await this.technicianSelect.sendKeys(option);
  }

  getTechnicianSelect() {
    return this.technicianSelect;
  }

  async getTechnicianSelectedOption() {
    return this.technicianSelect.element(by.css('option:checked')).getText();
  }

  async engineerOfRecordSelectLastOption() {
    await this.engineerOfRecordSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async engineerOfRecordSelectOption(option) {
    await this.engineerOfRecordSelect.sendKeys(option);
  }

  getEngineerOfRecordSelect() {
    return this.engineerOfRecordSelect;
  }

  async getEngineerOfRecordSelectedOption() {
    return this.engineerOfRecordSelect.element(by.css('option:checked')).getText();
  }

  async trafficSpecialistSelectLastOption() {
    await this.trafficSpecialistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async trafficSpecialistSelectOption(option) {
    await this.trafficSpecialistSelect.sendKeys(option);
  }

  getTrafficSpecialistSelect() {
    return this.trafficSpecialistSelect;
  }

  async getTrafficSpecialistSelectedOption() {
    return this.trafficSpecialistSelect.element(by.css('option:checked')).getText();
  }

  async prpjectStaffSelectLastOption() {
    await this.prpjectStaffSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async prpjectStaffSelectOption(option) {
    await this.prpjectStaffSelect.sendKeys(option);
  }

  getPrpjectStaffSelect() {
    return this.prpjectStaffSelect;
  }

  async getPrpjectStaffSelectedOption() {
    return this.prpjectStaffSelect.element(by.css('option:checked')).getText();
  }

  async qualitySpecialistSelectLastOption() {
    await this.qualitySpecialistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async qualitySpecialistSelectOption(option) {
    await this.qualitySpecialistSelect.sendKeys(option);
  }

  getQualitySpecialistSelect() {
    return this.qualitySpecialistSelect;
  }

  async getQualitySpecialistSelectedOption() {
    return this.qualitySpecialistSelect.element(by.css('option:checked')).getText();
  }

  async parentProjectSelectLastOption() {
    await this.parentProjectSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentProjectSelectOption(option) {
    await this.parentProjectSelect.sendKeys(option);
  }

  getParentProjectSelect() {
    return this.parentProjectSelect;
  }

  async getParentProjectSelectedOption() {
    return this.parentProjectSelect.element(by.css('option:checked')).getText();
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
