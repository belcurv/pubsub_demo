/* jshint esversion:6, devel:true, browser: true */
/* globals jQuery, events */

var stats = (function($) {
    
    var people = 0,
        DOM = {};
    

    /* ============================= CACHE DOM ============================= */

    function _cacheDom() {
        DOM.$stats  = $('#stats-module');
        DOM.$p      = $(document.createElement('p'));
    }
    
    
    /* ============================ BIND EVENTS ============================ */
    
    function _bindEvents() {
        // subscribe to 'peopleChanged' event
        // When received, fire setPeople
        events.on('peopleChanged', setPeople);
    }
    
    
    /* ========================== PRIVATE METHODS ========================== */
    
    function _render() {
        DOM.$p
            .empty()
            .text(`People: ${people.length}`)
            .appendTo(DOM.$stats);
    }

    
    /* ========================== PUBLIC METHODS =========================== */
    
    function setPeople(newPeople) {
        people = newPeople;
        _render();
    }
    
    
    function destroy() {
        DOM.$stats.remove();
        events.off('peopleChanged', setPeople);
    }
    
    
    (function init() {
        _cacheDom();
        _bindEvents();
    }());

    
    /* ============================ EXPORT API ============================= */

     return {
         // no need for public setPeople when using PubSub
         // setPeople : setPeople
         destroy : destroy
     };

})(jQuery);
