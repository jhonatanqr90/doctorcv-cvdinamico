'use strict';
const site = (function () {

    const DOM = {
        ACTIVE_CLASS: '-active-',
        SHOW_CLASS: '-show-',
        HIDING_CLASS: '-hiding-',
        COMPLETED_CLASS: '-completed-',
        DISABLED_CLASS: '-disabled-'
    };

    const siteFunctions = function () {

        events.header();

    };

    const events = {

        header: function () {

            const $cv = document.getElementById('cv')
            console.log($cv.offsetHeight)
        },

    }


    let initialize = siteFunctions;

    return { init: initialize }

})();

site.init();