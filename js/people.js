/* jshint esversion:6, browser: true, devel: true */
/* globals jQuery, app */

app.people = (function($) {
    
    var people = ['Will', 'Steve'],
        DOM    = {};

     
    /* ============================= CACHE DOM ============================= */
    
    function cacheDom() {
        DOM.$el     = $('#peopleModule');
        DOM.$button = DOM.$el.find('button');
        DOM.$input  = DOM.$el.find('input');
        DOM.$ul     = DOM.$el.find('ul');
        DOM.$li     = $(document.createElement('li'));
    }
    
    
    /* ============================ BIND EVENTS ============================ */

    function bindEvents() {
        DOM.$button.on('click', addPerson);
        DOM.$ul.delegate('i.del', 'click', deletePerson);
    }
    
    
    /* ========================== PRIVATE METHODS ========================== */

    function _render() {
        DOM.$ul.html('');
        people.forEach(person => {
            var $newLi = DOM.$li.clone();
            $newLi
                .append(`<span>${person}</span>`)
                .append(`<i class="del">X</i>`)
                .appendTo(DOM.$ul);
        });
        
        // call stats module's public 'setPeople' method with updated count
        // stats.setPeople(people.length);
        
        // instead of above tight coupling, let's use pubsub pattern.
        // We emit the 'peopleChanged' event and pass our people collection
        app.events.emit('peopleChanged', people);
    }
    
    
    /* ========================== PUBLIC METHODS =========================== */

    function addPerson(value) {
        var name = (typeof value === "string") ? value : DOM.$input.val();
        people.push(name);
        _render();
        DOM.$input.val('');
    }

    
    function deletePerson(event) {
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = DOM.$ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }
    
    
    function init() {
        cacheDom();
        bindEvents();
        _render();
    }
    
    
    /* ============================ EXPORT API ============================= */

    return {
        addPerson    : addPerson,
        deletePerson : deletePerson,
        init         :init
    };

})(jQuery);
