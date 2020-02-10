import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CalenderComponentsPage, { CalenderDeleteDialog } from './calender.page-object';
import CalenderUpdatePage from './calender-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Calender e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let calenderUpdatePage: CalenderUpdatePage;
  let calenderComponentsPage: CalenderComponentsPage;
  let calenderDeleteDialog: CalenderDeleteDialog;

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

  it('should load Calenders', async () => {
    await navBarPage.getEntityPage('calender');
    calenderComponentsPage = new CalenderComponentsPage();
    expect(await calenderComponentsPage.getTitle().getText()).to.match(/Calenders/);
  });

  it('should load create Calender page', async () => {
    await calenderComponentsPage.clickOnCreateButton();
    calenderUpdatePage = new CalenderUpdatePage();
    expect(await calenderUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.calender.home.createOrEditLabel/);
    await calenderUpdatePage.cancel();
  });

  it('should create and save Calenders', async () => {
    async function createCalender() {
      await calenderComponentsPage.clickOnCreateButton();
      await calenderUpdatePage.setTitleInput('title');
      expect(await calenderUpdatePage.getTitleInput()).to.match(/title/);
      await calenderUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await calenderUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
      await calenderUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await calenderUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
      await calenderUpdatePage.setJsonUIDetailsInput('jsonUIDetails');
      expect(await calenderUpdatePage.getJsonUIDetailsInput()).to.match(/jsonUIDetails/);
      await calenderUpdatePage.taskHistorySelectLastOption();
      await calenderUpdatePage.taskSelectLastOption();
      await calenderUpdatePage.projectSelectLastOption();
      await calenderUpdatePage.departmentSelectLastOption();
      await calenderUpdatePage.assignedToSelectLastOption();
      await waitUntilDisplayed(calenderUpdatePage.getSaveButton());
      await calenderUpdatePage.save();
      await waitUntilHidden(calenderUpdatePage.getSaveButton());
      expect(await calenderUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCalender();
    await calenderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await calenderComponentsPage.countDeleteButtons();
    await createCalender();

    await calenderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await calenderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Calender', async () => {
    await calenderComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await calenderComponentsPage.countDeleteButtons();
    await calenderComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    calenderDeleteDialog = new CalenderDeleteDialog();
    expect(await calenderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.calender.delete.question/);
    await calenderDeleteDialog.clickOnConfirmButton();

    await calenderComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await calenderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
