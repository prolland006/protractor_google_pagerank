/**
 * Params
 * @type {string}
 */
const KEYWORDS = 'qi-gong nice';
const LINK_TO_FIND = 'Fabienne';
const MAX_GOOGLE_PAGE_TO_CHECK = 10;
const SLEEP_DURING_PAGES = 2000;

/**
 * find something on google page per page
 * @param linkToFind
 * @param page
 * @returns {Promise<number>}
 */
function findInPage(linkToFind:string, page: number) :any {

  return browser.findElement(by.partialLinkText(linkToFind))
    .then((data) => {
      return data.getText();
    })
    .then((data2 => {
      //found
      console.log('data2=',data2, ' page:',page);
      return page;
    }),(err)=>{
      //not found
      if (page == MAX_GOOGLE_PAGE_TO_CHECK) {
        return Promise.reject(-1);
      }
      element(by.css(`a[aria-label="Page ${++page}"`)).click(); //stuff to set the page
      browser.sleep(SLEEP_DURING_PAGES);
      return findInPage(linkToFind, page);
    });
}

describe('test protractor', () => {

  fit('search link on google', (done) => {
    browser.get('https://www.google.fr/');
    browser.waitForAngular();

    element(by.css('.gsfi')).sendKeys(KEYWORDS);
    element(by.css('.sbico')).click();
    browser.sleep(2000);

    findInPage(LINK_TO_FIND, 1)
      .then(
        (page)=>{
          console.log('#### PAGE FOUND : ',page)
          done();
        },
        (err)=>{
          console.log('#### NOT FOUND');
          done();
        }
      );
  });


});

