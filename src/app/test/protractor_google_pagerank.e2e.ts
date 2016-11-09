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
      if (page==10) {
        return Promise.reject(-1);
      }
      element(by.css(`a[aria-label="Page ${++page}"`)).click(); //stuff to set the page
      browser.sleep(2000);
      return findInPage(linkToFind, page);
    });
}

describe('test protractor', () => {

  fit('search link on google', (done) => {
    browser.get('https://www.google.fr/');
    browser.waitForAngular();

    element(by.css('.gsfi')).sendKeys('qi-gong nice');
    element(by.css('.sbico')).click();
    browser.sleep(2000);


    findInPage('Fabie_nne', 1)
      .then(
        (page)=>{
          console.log('page found:',page)
          done();
        },
        (err)=>{
          console.log('not found');
          done();
        }
      );
  });


});

