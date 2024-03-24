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

            let $box_opened = false
            const $boxs_viewed = new Set()

            const $_fnShowFileDetail = document.querySelectorAll('.fnShowFileDetail')
            const $_closeFileDetail = document.querySelectorAll('.closeFileDetail')

            const $_fnShowVideoDetail = document.querySelectorAll('.fnShowVideoDetail')
            const $_fnCloseVideoDetail = document.querySelectorAll('.fnCloseVideoDetail')

            const $videoDetail = document.getElementById('videoDetail')
            const $videoDetailIframe = document.getElementById('videoDetailIframe')
            const $fnShowRefence = document.getElementById('fnShowRefence')
            const $reference = document.getElementById('reference')
            const $fnCloseReference = document.getElementById('fnCloseReference')

            // Detalle de texto
            $_fnShowFileDetail.forEach($button => {
                $button.addEventListener('click', (event) => {
                    const DATA_TARGET = event.target.dataset.target
                    const CONTAINER_TARGET = $button.dataset.target
                    const TARGET_ID = DATA_TARGET ?? CONTAINER_TARGET
                    const $box_detail = document.getElementById(TARGET_ID)

                    if (!$box_detail) return

                    $boxs_viewed.add(TARGET_ID)
                    console.log($boxs_viewed)

                    const $video_iframe = $box_detail.querySelector('.fnfileDetailIframe')
                    const DATA_VIDEO_IFRAME = $video_iframe.dataset.src
                    $video_iframe.src = DATA_VIDEO_IFRAME

                    $box_detail.classList.add(DOM.ACTIVE_CLASS)
                    setTimeout(() => {
                        $box_detail.classList.add(DOM.SHOW_CLASS)
                        $box_opened = $box_detail
                    }, 10)

                })
            })

            $_closeFileDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $box_opened.classList.remove(DOM.SHOW_CLASS)
                    setTimeout(() => {
                        $box_opened.classList.remove(DOM.ACTIVE_CLASS)
                        $box_opened.querySelector('.fnfileDetailIframe').src = ''
                        $box_opened = false
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

            // CV de referencia
            $fnShowRefence.addEventListener('click', () => {
                $reference.classList.add(DOM.ACTIVE_CLASS)
                setTimeout(() => {
                    $reference.classList.add(DOM.SHOW_CLASS)
                }, 10)
            })

            $fnCloseReference.addEventListener('click', () => {
                $reference.classList.remove(DOM.SHOW_CLASS)
                setTimeout(() => {
                    $reference.classList.remove(DOM.ACTIVE_CLASS)
                }, 350)
            })

        }

    }


    let initialize = siteFunctions;

    return { init: initialize }

})();

site.init();