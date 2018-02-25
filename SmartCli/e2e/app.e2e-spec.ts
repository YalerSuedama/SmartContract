import { SmartCliPage } from './app.po';

describe('smart-cli App', function() {
  let page: SmartCliPage;

  beforeEach(() => {
    page = new SmartCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
