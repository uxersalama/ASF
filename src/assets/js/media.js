/// <reference path="angular.min.js" />
(function () {

    'use strict';


    function initMediaSlider(main, thumb, m, t, s) {




        if ($('.' + main).length) {
            var $slider = $('.' + main)
                .on('init', function (slick) {
                    $('.' + main).fadeIn(1000);
                })
                .slick({
                    slidesToShow: m || 1,
                    slidesToScroll: 1,
                    arrows: true,
                    autoplay: false,
                    lazyLoad: 'ondemand',
                    autoplaySpeed: 3000,
                    asNavFor: s ? '' : '.' + thumb,
                    speed: s ? 300 : 500,
                    fade: s ? false : true,
                    cssEase: 'linear'
                });
            if (!s) {

            
            var $slider2 = $('.' + thumb)
                    .on('init', function (slick) {
                        $('.' + thumb).fadeIn(1000);
                    })
                    .slick({
                        slidesToShow: t || 5,
                        slidesToScroll: 1,
                        infinite: false,
                        lazyLoad: 'ondemand',
                        asNavFor: s ? '' : '.' + main,
                        dots: false,
                        centerMode: false,
                        focusOnSelect: true,
                        //draggable: false,
                        speed: 500,
                        responsive: [{
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }]
                    });
            }
            //remove active class from all thumbnail slides
            $('.' + main + ' .slick-slide').removeClass('slick-active');

            //set active class to first thumbnail slides
            $('.' + main + ' .slick-slide').eq(0).addClass('slick-active');

            // On before slide change match active thumbnail to current slide
            $('.' + main).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var mySlideNumber = nextSlide;
                $('.' + main + ' .slick-slide').removeClass('slick-active');
                $('.' + main + ' .slick-slide').eq(mySlideNumber).addClass('slick-active');
                //$('.'+main+' .slick-slide').removeClass('current');
                //$(this).addClass('current');

                if (main == 'portel-video-slider') {
                    $('.' + main + ' video').each(function () {
                        $(this).get(0).pause();
                    });
                }
            });

            var options = {
                progressbarSelector: '.bJS_progressbar'
              , slideSelector: '.bJS_slider'
              , previewSlideSelector: '.bJS_previewSlider'
              , progressInterval: ''
                // add your own progressbar animation function to sync it i.e. with a video
                // function will be called if the current preview slider item (".b_previewItem") has the data-customprogressbar="true" property set
              , onCustomProgressbar: function ($slide, $progressbar) { }
            }

            // slick slider options
            // see: https://kenwheeler.github.io/slick/
            var sliderOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                autoplay: true
            }

            // slick slider options
            // see: https://kenwheeler.github.io/slick/
            var previewSliderOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                focusOnSelect: true,
                centerMode: true
            }

            $('.media-item').each(function (i) {
                $(this).attr('data-slide', i);
            });

            $('.media-item').click(function (e) {
                e.preventDefault();
                var slideno = $(this).attr('data-slide');
                console.log(slideno);
                $('.' + main).slick('slickGoTo', slideno);
            });

        }
    }

    initMediaSlider('portel-photo-slider', 'portel-photo-thumb', 1, 3);
    initMediaSlider('portel-video-slider', 'portel-video-thumb', 1, 3);
    initMediaSlider('menu-main-slider', 'menu-main-thumb');
    initMediaSlider('gallery-main-slider', 'gallery-main-thumb');
    initMediaSlider('one-side-slider', '', 1, 3, 's');
    if ($('.bar-slider.of-media-gallery').length) {

        $('.bar-slider.of-media-gallery').children().each(function (index) {
            $(this).attr('data-position', index);
        });
        $('.bar-slider.of-media-gallery').owlCarousel({
            loop: true,
            center: true,
            margin: 5,
            autoWidth: true,
            //items: 4,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                }
            }

            //items: 5
        });
        $('.bar-slider.of-media-gallery').on('click', '.owl-item', function (event) {
            event.preventDefault();
            //console.log(event);
            var _index = $(this).index();
            //var pos = thumbs.sliderData.normalize(_index, true);
            //screen.slider.trigger('to.owl.carousel', [_index, 0, true]);
            //change the current class name
            //changeCurrentThumb.call(thumbs.slider, _index);
            $('.bar-slider.of-media-gallery').find('.owl-item').removeClass('current');
            $(this).addClass('current');
            $('.bar-slider.of-media-gallery').trigger('to.owl.carousel', $(this).children('.slide-item').data('position'));
        });

        $('.bar-slider.of-media-gallery .owl-item:first').click().addClass('current');
    }

    $('.video-item-container .play').on('click', function () {
        var playing = $(this);
        $('.video-item-container').removeClass('playing');
        $('.video-item-container video').each(function () {
            $(this).get(0).pause();
        });
        $(this).next('video')[0].play();
        playing.addClass('playing');
    });
}());

