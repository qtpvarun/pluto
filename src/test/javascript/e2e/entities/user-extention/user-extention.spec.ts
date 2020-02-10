import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserExtentionComponentsPage, { UserExtentionDeleteDialog } from './user-extention.page-object';
import UserExtentionUpdatePage from './user-extention-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('UserExtention e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userExtentionUpdatePage: UserExtentionUpdatePage;
  let userExtentionComponentsPage: UserExtentionComponentsPage;
  let userExtentionDeleteDialog: UserExtentionDeleteDialog;

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

  it('should load UserExtentions', async () => {
    await navBarPage.getEntityPage('user-extention');
    userExtentionComponentsPage = new UserExtentionComponentsPage();
    expect(await userExtentionComponentsPage.getTitle().getText()).to.match(/User Extentions/);
  });

  it('should load create UserExtention page', async () => {
    await userExtentionComponentsPage.clickOnCreateButton();
    userExtentionUpdatePage = new UserExtentionUpdatePage();
    expect(await userExtentionUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.userExtention.home.createOrEditLabel/);
    await userExtentionUpdatePage.cancel();
  });

  it('should create and save UserExtentions', async () => {
    async function createUserExtention() {
      await userExtentionComponentsPage.clickOnCreateButton();
      await userExtentionUpdatePage.setLoginInput('login');
      expect(await userExtentionUpdatePage.getLoginInput()).to.match(/login/);
      await userExtentionUpdatePage.setProfilePicInput('profilePic');
      expect(await userExtentionUpdatePage.getProfilePicInput()).to.match(/profilePic/);
      await userExtentionUpdatePage.setGroupInput('group');
      expect(await userExtentionUpdatePage.getGroupInput()).to.match(/group/);
      await userExtentionUpdatePage.setJsonOtherDetailsInput('jsonOtherDetails');
      expect(await userExtentionUpdatePage.getJsonOtherDetailsInput()).to.match(/jsonOtherDetails/);
      await waitUntilDisplayed(userExtentionUpdatePage.getSaveButton());
      await userExtentionUpdatePage.save();
      await waitUntilHidden(userExtentionUpdatePage.getSaveButton());
      expect(await userExtentionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createUserExtention();
    await userExtentionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await userExtentionComponentsPage.countDeleteButtons();
    await createUserExtention();

    await userExtentionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await userExtentionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UserExtention', async () => {
    await userExtentionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await userExtentionComponentsPage.countDeleteButtons();
    await userExtentionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    userExtentionDeleteDialog = new UserExtentionDeleteDialog();
    expect(await userExtentionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.userExtention.delete.question/);
    await userExtentionDeleteDialog.clickOnConfirmButton();

    await userExtentionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await userExtentionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
