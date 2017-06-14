import { AirBookingPage } from './app.po';

describe('air-booking App', function() {
  let page: AirBookingPage;

  beforeEach(() => {
    page = new AirBookingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
