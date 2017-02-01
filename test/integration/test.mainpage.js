/* eslint no-undef: 0 */
/* eslint prefer-arrow-callback: 0 */
casper.test.begin('Discovery Demo', 3, function suite(test) {
  const baseHost = 'http://localhost:3000';

  function testForButtons() {
    casper.waitForSelector('div.query--row._container', function runAfterWaiting() {
      test.assertExists('input[type=text].text-input--input', 'Company input');
    });
  }

  casper.start(baseHost, function runAfterStart(result) {
    test.assert(result.status === 200, 'Front page opens');
    test.assertEquals(this.getTitle(), 'Discovery Demo', 'Title is found');
    testForButtons();
  });

  casper.run(function runAfterRun() {
    test.done();
  });
});
