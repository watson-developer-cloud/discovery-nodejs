/* eslint no-undef: 0 */
/* eslint prefer-arrow-callback: 0 */
casper.test.begin('Discovery Demo', 2, function suite(test) {
  const baseHost = 'http://localhost:3000';
  casper.start(baseHost, function runAfterStart(result) {
    test.assert(result.status === 200, 'Front page opens');
    test.assertEquals(this.getTitle(), 'Discovery Demo', 'Title is found');
  });

  casper.run(function runAfterRun() {
    test.done();
  });
});
