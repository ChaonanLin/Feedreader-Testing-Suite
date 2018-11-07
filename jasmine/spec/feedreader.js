/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         */
         it("has a URL and the URL is defined",function() {
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();

        // and that the URL is not empty.
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it("has a name and the names is defined",function() {
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* a new test suite named "The menu" */
    describe("The menu",function(){
        /* a test that ensures the menu element is
         * hidden by default.
         */
        it ("is hidden by default",function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* a test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it ("is visible when clicked and hidden when clicked again", function(){
            // test the menu display when clicked
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // and does it hide when clicked again.
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work
         */

         //load the first feed
         beforeEach(function(done){
             loadFeed(0, done);
         });

         // there is at least a single .entry element within the .feed container.
         it("is loaded", function(){
            expect($('.feed .entry')).toBeDefined();
         });

    });


    /* a new test suite named "New Feed Selection" */
    describe("New Feed Selection",function(){
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var FirstFeed;
         var SecondFeed;

         beforeEach(function(done){
            loadFeed(0,function(){
                FirstFeed = $('.feed').html();

                loadFeed(1,function(){
                    SecondFeed = $('.feed').html();
                    done();
                });
            });
         });

         it("actually changes",function(){
             expect(FirstFeed === SecondFeed).toBe(false);
         });
    });

}());
