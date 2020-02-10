import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProjectTypeComponentsPage, { ProjectTypeDeleteDialog } from './project-type.page-object';
import ProjectTypeUpdatePage from './project-type-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ProjectType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projectTypeUpdatePage: ProjectTypeUpdatePage;
  let projectTypeComponentsPage: ProjectTypeComponentsPage;
  let projectTypeDeleteDialog: ProjectTypeDeleteDialog;

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

  it('should load ProjectTypes', async () => {
    await navBarPage.getEntityPage('project-type');
    projectTypeComponentsPage = new ProjectTypeComponentsPage();
    expect(await projectTypeComponentsPage.getTitle().getText()).to.match(/Project Types/);
  });

  it('should load create ProjectType page', async () => {
    await projectTypeComponentsPage.clickOnCreateButton();
    projectTypeUpdatePage = new ProjectTypeUpdatePage();
    expect(await projectTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.projectType.home.createOrEditLabel/);
    await projectTypeUpdatePage.cancel();
  });

  it('should create and save ProjectTypes', async () => {
    async function createProjectType() {
      await projectTypeComponentsPage.clickOnCreateButton();
      await projectTypeUpdatePage.setNameInput('name');
      expect(await projectTypeUpdatePage.getNameInput()).to.match(/name/);
      await projectTypeUpdatePage.setDescriptionInput('description');
      expect(await projectTypeUpdatePage.getDescriptionInput()).to.match(/description/);
      await projectTypeUpdatePage.departmentSelectLastOption();
      await waitUntilDisplayed(projectTypeUpdatePage.getSaveButton());
      await projectTypeUpdatePage.save();
      await waitUntilHidden(projectTypeUpdatePage.getSaveButton());
      expect(await projectTypeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProjectType();
    await projectTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await projectTypeComponentsPage.countDeleteButtons();
    await createProjectType();

    await projectTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await projectTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ProjectType', async () => {
    await projectTypeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await projectTypeComponentsPage.countDeleteButtons();
    await projectTypeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    projectTypeDeleteDialog = new ProjectTypeDeleteDialog();
    expect(await projectTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.projectType.delete.question/);
    await projectTypeDeleteDialog.clickOnConfirmButton();

    await projectTypeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await projectTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
