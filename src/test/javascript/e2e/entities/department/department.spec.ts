import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DepartmentComponentsPage, { DepartmentDeleteDialog } from './department.page-object';
import DepartmentUpdatePage from './department-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Department e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departmentUpdatePage: DepartmentUpdatePage;
  let departmentComponentsPage: DepartmentComponentsPage;
  let departmentDeleteDialog: DepartmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Departments', async () => {
    await navBarPage.getEntityPage('department');
    departmentComponentsPage = new DepartmentComponentsPage();
    expect(await departmentComponentsPage.getTitle().getText()).to.match(/Departments/);
  });

  it('should load create Department page', async () => {
    await departmentComponentsPage.clickOnCreateButton();
    departmentUpdatePage = new DepartmentUpdatePage();
    expect(await departmentUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.department.home.createOrEditLabel/);
    await departmentUpdatePage.cancel();
  });

  it('should create and save Departments', async () => {
    async function createDepartment() {
      await departmentComponentsPage.clickOnCreateButton();
      await departmentUpdatePage.setNameInput('name');
      expect(await departmentUpdatePage.getNameInput()).to.match(/name/);
      await departmentUpdatePage.setDescriptionInput('description');
      expect(await departmentUpdatePage.getDescriptionInput()).to.match(/description/);
      const selectedActiveFlag = await departmentUpdatePage.getActiveFlagInput().isSelected();
      if (selectedActiveFlag) {
        await departmentUpdatePage.getActiveFlagInput().click();
        expect(await departmentUpdatePage.getActiveFlagInput().isSelected()).to.be.false;
      } else {
        await departmentUpdatePage.getActiveFlagInput().click();
        expect(await departmentUpdatePage.getActiveFlagInput().isSelected()).to.be.true;
      }
      // departmentUpdatePage.teamSelectLastOption();
      // departmentUpdatePage.metricesSelectLastOption();
      await waitUntilDisplayed(departmentUpdatePage.getSaveButton());
      await departmentUpdatePage.save();
      await waitUntilHidden(departmentUpdatePage.getSaveButton());
      expect(await departmentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDepartment();
    await departmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await departmentComponentsPage.countDeleteButtons();
    await createDepartment();

    await departmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Department', async () => {
    await departmentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await departmentComponentsPage.countDeleteButtons();
    await departmentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    departmentDeleteDialog = new DepartmentDeleteDialog();
    expect(await departmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.department.delete.question/);
    await departmentDeleteDialog.clickOnConfirmButton();

    await departmentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
