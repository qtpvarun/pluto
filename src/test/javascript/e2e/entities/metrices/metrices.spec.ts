import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MetricesComponentsPage, { MetricesDeleteDialog } from './metrices.page-object';
import MetricesUpdatePage from './metrices-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Metrices e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metricesUpdatePage: MetricesUpdatePage;
  let metricesComponentsPage: MetricesComponentsPage;
  let metricesDeleteDialog: MetricesDeleteDialog;

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

  it('should load Metrices', async () => {
    await navBarPage.getEntityPage('metrices');
    metricesComponentsPage = new MetricesComponentsPage();
    expect(await metricesComponentsPage.getTitle().getText()).to.match(/Metrices/);
  });

  it('should load create Metrices page', async () => {
    await metricesComponentsPage.clickOnCreateButton();
    metricesUpdatePage = new MetricesUpdatePage();
    expect(await metricesUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.metrices.home.createOrEditLabel/);
    await metricesUpdatePage.cancel();
  });

  it('should create and save Metrices', async () => {
    async function createMetrices() {
      await metricesComponentsPage.clickOnCreateButton();
      await metricesUpdatePage.setNameInput('name');
      expect(await metricesUpdatePage.getNameInput()).to.match(/name/);
      await metricesUpdatePage.setDescriptionInput('description');
      expect(await metricesUpdatePage.getDescriptionInput()).to.match(/description/);
      await metricesUpdatePage.setSumInput('5');
      expect(await metricesUpdatePage.getSumInput()).to.eq('5');
      await metricesUpdatePage.setCountInput('5');
      expect(await metricesUpdatePage.getCountInput()).to.eq('5');
      await metricesUpdatePage.setAverageInput('5');
      expect(await metricesUpdatePage.getAverageInput()).to.eq('5');
      await waitUntilDisplayed(metricesUpdatePage.getSaveButton());
      await metricesUpdatePage.save();
      await waitUntilHidden(metricesUpdatePage.getSaveButton());
      expect(await metricesUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createMetrices();
    await metricesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await metricesComponentsPage.countDeleteButtons();
    await createMetrices();

    await metricesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await metricesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Metrices', async () => {
    await metricesComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await metricesComponentsPage.countDeleteButtons();
    await metricesComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    metricesDeleteDialog = new MetricesDeleteDialog();
    expect(await metricesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.metrices.delete.question/);
    await metricesDeleteDialog.clickOnConfirmButton();

    await metricesComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await metricesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
