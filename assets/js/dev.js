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
        events.cv();

    };

    const events = {

        header: function () {

            const $cv = document.getElementById('cv')
            console.log($cv.offsetHeight)
        },
        cv: function () {

            const $_fnShowFileDetail = document.querySelectorAll('.fnShowFileDetail')
            const $_closeFileDetail = document.querySelectorAll('.closeFileDetail')

            const $_fnShowVideoDetail = document.querySelectorAll('.fnShowVideoDetail')
            const $_fnCloseVideoDetail = document.querySelectorAll('.fnCloseVideoDetail')


            const $fileDetail = document.getElementById('fileDetail')
            const $videoDetail = document.getElementById('videoDetail')
            const $videoDetailIframe = document.getElementById('videoDetailIframe')

            // Detalle de texto
            $_fnShowFileDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $fileDetail.classList.add(DOM.ACTIVE_CLASS)
                    setTimeout(() => {
                        $fileDetail.classList.add(DOM.SHOW_CLASS)
                    }, 10)
                })
            })

            $_closeFileDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $fileDetail.classList.remove(DOM.SHOW_CLASS)
                    setTimeout(() => {
                        $fileDetail.classList.remove(DOM.ACTIVE_CLASS)
                    }, 300)
                })
            })

            // Detalle de video
            $_fnShowVideoDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $videoDetail.classList.add(DOM.ACTIVE_CLASS)
                    setTimeout(() => {
                        $videoDetailIframe.src = 'https://www.youtube.com/embed/pRxfifDkmCk?si=fiDCD0wWZn7wVuNn'
                        $videoDetail.classList.add(DOM.SHOW_CLASS)
                    }, 10)
                })
            })

            $_fnCloseVideoDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $videoDetail.classList.remove(DOM.SHOW_CLASS)
                    setTimeout(() => {
                        $videoDetail.classList.remove(DOM.ACTIVE_CLASS)
                        $videoDetailIframe.src = ''
                    }, 300)
                })
            })


        }

    }


    let initialize = siteFunctions;

    return { init: initialize }

})();

site.init();