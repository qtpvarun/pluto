import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BoardComponentsPage, { BoardDeleteDialog } from './board.page-object';
import BoardUpdatePage from './board-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Board e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let boardUpdatePage: BoardUpdatePage;
  let boardComponentsPage: BoardComponentsPage;
  let boardDeleteDialog: BoardDeleteDialog;

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

  it('should load Boards', async () => {
    await navBarPage.getEntityPage('board');
    boardComponentsPage = new BoardComponentsPage();
    expect(await boardComponentsPage.getTitle().getText()).to.match(/Boards/);
  });

  it('should load create Board page', async () => {
    await boardComponentsPage.clickOnCreateButton();
    boardUpdatePage = new BoardUpdatePage();
    expect(await boardUpdatePage.getPageTitle().getAttribute('id')).to.match(/proTrackApp.board.home.createOrEditLabel/);
    await boardUpdatePage.cancel();
  });

  it('should create and save Boards', async () => {
    async function createBoard() {
      await boardComponentsPage.clickOnCreateButton();
      await boardUpdatePage.setNameInput('name');
      expect(await boardUpdatePage.getNameInput()).to.match(/name/);
      await boardUpdatePage.setBoardFilterInput('boardFilter');
      expect(await boardUpdatePage.getBoardFilterInput()).to.match(/boardFilter/);
      await waitUntilDisplayed(boardUpdatePage.getSaveButton());
      await boardUpdatePage.save();
      await waitUntilHidden(boardUpdatePage.getSaveButton());
      expect(await boardUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBoard();
    await boardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await boardComponentsPage.countDeleteButtons();
    await createBoard();

    await boardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await boardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Board', async () => {
    await boardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await boardComponentsPage.countDeleteButtons();
    await boardComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    boardDeleteDialog = new BoardDeleteDialog();
    expect(await boardDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/proTrackApp.board.delete.question/);
    await boardDeleteDialog.clickOnConfirmButton();

    await boardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await boardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
