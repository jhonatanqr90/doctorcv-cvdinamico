'use strict'
import data from '../../json/data.js'

const site = (function () {

    const DOM = {
        ACTIVE_CLASS: '-active-',
        SHOW_CLASS: '-show-',
        HIDING_CLASS: '-hiding-',
        COMPLETED_CLASS: '-completed-',
        DISABLED_CLASS: '-disabled-'
    };

    const siteFunctions = function () {

        events.cv();

    };

    const events = {

        cv: function () {

            const { organizaciones } = data

            const queryString = window.location.search;
            const params = new URLSearchParams(queryString);
            const temporalKey = params.get('universidad') || 'default'
            let keySearch = 'default'
            organizaciones.forEach(item => {
                if (item.nombre == temporalKey) {
                    keySearch = item.nombre
                }
            })
            const universidad = organizaciones.filter(organizacion => { return organizacion.nombre == keySearch }, {})[0]


            let $box_opened = false
            const $boxs_viewed = new Set([])

            const $_fnShowFileDetail = document.querySelectorAll('.fnShowFileDetail')
            const $_closeFileDetail = document.querySelectorAll('.closeFileDetail')

            const $_fnShowVideoDetail = document.querySelectorAll('.fnShowVideoDetail')
            const $_fnCloseVideoDetail = document.querySelectorAll('.fnCloseVideoDetail')

            const $videoDetail = document.getElementById('videoDetail')
            const $videoDetailIframe = document.getElementById('videoDetailIframe')
            const $fnShowRefence = document.getElementById('fnShowRefence')
            const $reference = document.getElementById('reference')
            const $fnCloseReference = document.getElementById('fnCloseReference')

            // Datos dinámicos
            const $dataLogo = document.querySelector('[data-logo]')
            const $dataDescripcion = document.querySelector('[data-descripcion]')
            const $dataStyle = document.querySelector('[data-style]')

            $dataLogo.src = 'json/' + universidad.archivo_png
            $dataDescripcion.innerHTML = universidad.descripcion
            $dataStyle.innerHTML = `:root{--width-logo:${universidad.archivo_width}px;}`


            const $fnShowPhotoVideo = document.querySelector('.fnShowPhotoVideo')
            const $fnShowPhotoVideoTarget = document.querySelector('.fnShowPhotoVideoTarget')
            let isVideoplaying = false

            const showPhotoVideo = (reset = false) => {
                if ($fnShowPhotoVideoTarget.classList.contains(DOM.ACTIVE_CLASS || reset)) {
                    $fnShowPhotoVideoTarget.classList.remove(DOM.ACTIVE_CLASS)
                    $fnShowPhotoVideoTarget.pause()
                    $fnShowPhotoVideoTarget.currentTime = 0
                    isVideoplaying = false
                } else {
                    $fnShowPhotoVideoTarget.classList.add(DOM.ACTIVE_CLASS)
                    $fnShowPhotoVideoTarget.play()
                    isVideoplaying = true
                }
            }

            $fnShowPhotoVideo.addEventListener('click', () => showPhotoVideo())

            // Detalle de texto
            $_fnShowFileDetail.forEach($button => {
                $button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const DATA_TARGET = event.target.dataset.target
                    const CONTAINER_TARGET = $button.dataset.target
                    const TARGET_ID = DATA_TARGET ?? CONTAINER_TARGET
                    const $box_detail = document.getElementById(TARGET_ID)

                    $boxs_viewed.add(TARGET_ID)
                    if (!$box_detail || TARGET_ID == 'foto') return

                    isVideoplaying && showPhotoVideo(true)

                    const $video_iframe = $box_detail.querySelector('.fnfileDetailIframe')

                    if ($video_iframe) {
                        const DATA_VIDEO_IFRAME = $video_iframe.dataset.src
                        $video_iframe.src = DATA_VIDEO_IFRAME
                    }

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
                    const $iframe = $box_opened.querySelector('.fnfileDetailIframe')
                    setTimeout(() => {
                        $box_opened.classList.remove(DOM.ACTIVE_CLASS)
                        $iframe && ($iframe.src = '')
                        $box_opened = false
                    }, 300)
                })
            })

            // Detalle de video
            $_fnShowVideoDetail.forEach($button => {
                $button.addEventListener('click', () => {
                    $videoDetail.classList.add(DOM.ACTIVE_CLASS)
                    setTimeout(() => {
                        $videoDetailIframe.src = universidad.url_video
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
            $fnShowRefence?.addEventListener('click', () => {
                $reference.classList.add(DOM.ACTIVE_CLASS)
                $boxs_viewed.forEach(box => {
                    if (box !== undefined) {
                        $reference.querySelector(`[data-reference="${box}"]`).checked = true
                    }
                })
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