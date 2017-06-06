/* jshint esversion:6 */

var app = (function () {
    
    'use strict';
    
    // initialize modules
    function init() {
        app.stats.init();
        app.people.init();
    }
    
    // export API
    return {
        init: init
    };
    
}());
