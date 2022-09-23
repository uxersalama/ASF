

window.onload = function () {
    initWizard();
    setTimeout(function () {
        $('.mac-menu-effect').addClass('view')
    }, 200);

    if ($(window).width() > 4800) {


        var oMenu = document.getElementById("main-menu-mac");
        var aImg = oMenu.getElementsByTagName("img");
        var aWidth = [];
        var i = 0;

        for (i = 0; i < aImg.length; i++) {
            aWidth.push(aImg[i].offsetWidth);
            aImg[i].width = 47;

        }
        var active;
        oMenu.onmousemove = function (event) {

            var event = event || window.event;
            for (i = 0; i < aImg.length; i++) {
                var a = event.clientX - aImg[i].offsetLeft - aImg[i].offsetWidth / 2;
                var b = event.clientY - aImg[i].offsetTop - oMenu.offsetTop - aImg[i].offsetHeight / 2;

                //var iScale = 1 - Math.sqrt(a * a + b * b) / 300;
                var iScale = 1 - Math.sqrt(a * a) / 300;
                if (iScale < 0.5) iScale = 0.5;
                aImg[i].width = aWidth[i] * iScale * 1.1
            }
        };

        oMenu.onmouseleave = function () {

            var aWidth2 = [];
            for (i = 0; i < aImg.length; i++) {
                aWidth2.push(aImg[i].offsetWidth);
                aImg[i].width = 47;

            }
        }

    }
};

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('.selectpicker').selectpicker('mobile');
}


(function () {

    'use strict';


    $(".pick-calendar input").datepicker({
        showOn: "button",
        buttonImage: "../assets/images/calendar.png",
        buttonImageOnly: true
    });

    new WOW().init();


    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                //$element.removeClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');


    function Swap(images, remove) {

        if ((typeof images).toLowerCase() === 'object') {

            if (images instanceof jQuery) {

                images.each(function () {

                    var _img = $(this);
                    var source = _img.attr('src') || _img.data('src');
                    var _parent = _img.parent();

                    if (remove) {
                        _img.remove();
                    }

                    _parent
                        .addClass('swappedBg')
                        .css('backgroundImage', 'url(' + source + ')');

                    if (_parent.parent().attr('rel') == 'prettyPhoto') {
                        //_parent.parent().attr('href', source)
                    }

                });

            }

        }

    }


    window.swapToBackground = Swap;



}());
(function () {
    //AIzaSyDGhL6je0X26clIixhMBGAvppN9FmfqPxE
    if ($('#map').length) {


        initMap();
    }

    swapToBackground($('.swapme img'), false);
    swapToBackground($('.swap-me > img.banner'), true);

    $('.login-item.log').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.login-item').removeClass('active');
            $(this).addClass('active');
        }
    });
    $('.pop-overlay').on('click', function () {
        $('.login-item').removeClass('active');
        $('.popup').removeClass('open');
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.login-item').removeClass('active');
            $('.popup').removeClass('open');
        }
    });

    $(document).on('click', '.popme', function () {
        var el = $(this);
        $('.popup[data-popup=' + el.attr('data-popup') + ']').toggleClass('open');

    });
    $('.popup a.close-popup').click(function () {
        $('.popup').removeClass('open');
        $('.login-item').removeClass('active');
    });

    $('#owlHeroSlider').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        animateOut: 'fadeOut',
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        dots: false
    });

    $('#TopRatedSlider').owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        items: 3,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        dots: true,
        slideBy: 1,
        smartSpeed: 150,
        mouseDrag: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
                mouseDrag: true
            },
            600: {
                items: 3,
                mouseDrag: false
            }
        }
    });

    $('#TryAttendSlider').owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        items: 4,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        dots: true,
        slideBy: 1,
        smartSpeed: 150,
        mouseDrag: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 1,
                mouseDrag: true
            },
            600: {
                items: 4,
                mouseDrag: false
            }
        }
    });

    $('.menu-gallery-list.as-slider').owlCarousel({
        loop: false,
        margin: 10,
        //navigationText: ["<span class='prev-nav'></span>", "<span class='next-nav'></span"],
        nav: true,
        items: 4,
        slideBy: 3,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        dots: false
    });

    function searchScreenSliders(element, thumbsid) {
        //plugin call
        var screen = {};
        screen.$el = $("#" + element);
        if (!screen.$el.length) {
            return;
        }
        screen.$el.owlCarousel({
            responsive: null,
            rtl: false,
            //animateIn: 'fadeIn',
            items: 1,
            mouseDrag: false,
            lazyLoad: false,
            nav: false,
            dots: false,
            loop: false,
            autoplay: false,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    //stagePadding: 30,
                    mouseDrag: true,
                    nav: false,
                    dots: true
                },
                480: {
                    items: 1,
                    nav: false,
                    mouseDrag: false,
                    dots: false
                }
            }

        });

        //screen.sliderData = screen.slider.data('owl-carousel');
        //screen.options = screen.sliderData.options;
        searchThumbsSliders(thumbsid, screen);
    }


    function searchThumbsSliders(element, screen) {
        //plugin call
        thumbs = {};
        thumbs.$el = $("#" + element);
        if (!thumbs.$el.length) {
            return;
        }
        thumbs.$el.owlCarousel({
            responsive: null,
            rtl: false,
            animateOut: 'fadeOut',
            //animateIn: 'fadeIn',
            items: 6,
            //mouseDrag: false,
            lazyLoad: false,
            nav: true,
            dots: false,
            loop: false,
            autoplay: false,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 4,
                    //stagePadding: 30,
                    mouseDrag: true,
                    nav: false,
                    dots: true
                },
                480: {
                    items: 4,
                    nav: true,
                    dots: false
                },
                768: {
                    items: 4,
                    dots: false
                },
                1360: {
                    items: 6,
                    dots: false
                }
            }
        });

        //thumbs.sliderData = thumbs.slider.data('owl-carousel');
        //thumbs.options = thumbs.sliderData.options;

        /*************** on click of thumbs **********************/
        thumbs.$el.find('.owl-item:first').addClass('current')
        thumbs.$el.on('click', '.owl-item', function (event) {
            event.preventDefault();
            //console.log(event);
            var _index = $(this).index();
            //var pos = thumbs.sliderData.normalize(_index, true);
            screen.$el.trigger('to.owl.carousel', [_index, 0, true]);
            //change the current class name
            //changeCurrentThumb.call(thumbs.slider, _index);
            $('.owl-item.current').removeClass('current');
            $(this).addClass('current')
        });

    }

    // searchScreenSliders('OwlPopupSlider', 'OwlThumbSlider');
















    swapToBackground($('.owl-thumb-item > img'), true);
    if ($('.promotions-list').length) {


        $('.promotions-list').masonry({
            itemSelector: '.promo-item',
            //gutter: 30,
            columnWidth: '.promo-item',
            percentPosition: true
        });

    }

    $(document).on('click', '.promo-item .actions a', function () {
        $(this).parents('.promo-item').remove();
        $('.promotions-list').masonry({
            itemSelector: '.promo-item',
            //gutter: 30,
            columnWidth: '.promo-item',
            percentPosition: true
        });
    });

    $(document).on('change', '.category-item input', function () {
        $('.sub-categories').removeClass('open');
        var top = $(this).parents('.category-item').position().top;
        var last = $('.category-item').filter(function (index) {
            return $(this).position().top == top;
        }).last();

        $('.sub-categories').insertAfter(last).addClass('open');
    });

    $(document).on('click', '.review-text .reply', function () {
        $(this).parent().children('.put-reply').addClass('replying');
    })
    $('.load-more').click(function (e) {
        e.preventDefault();
        $(this).addClass('load-more--loading');
        setTimeout(function (e) {
            $('.load-more--loading').removeClass('load-more--loading')
        }, 3000);
    })
    $('.bar-slider.of-menu-page').children().each(function (index) {
        $(this).attr('data-position', index);
    });
    $('.bar-slider.of-menu-page').owlCarousel({
        loop: true,
        center: true,
        margin: 4,
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
    });

    $('.bar-slider.of-menu-page').on('click', '.owl-item', function (event) {
        event.preventDefault();
        //console.log(event);
        var _index = $(this).index();
        //var pos = thumbs.sliderData.normalize(_index, true);
        //screen.slider.trigger('to.owl.carousel', [_index, 0, true]);
        //change the current class name
        //changeCurrentThumb.call(thumbs.slider, _index);
        $('.bar-slider.of-menu-page').find('.owl-item').removeClass('current');
        $(this).addClass('current');
        $('.bar-slider.of-menu-page').trigger('to.owl.carousel', $(this).children('.slide-item').data('position'));
    });
    $('.bar-slider.of-menu-page .owl-item:first').click().addClass('current');

    $('table input[name="table_default"]').change(function () {
        $(this).parents('table').find('tr').removeClass('default');
        $(this).parents('tr').addClass('default');
        $(this).parents('table').find('tr span.default').remove();
        $(this).parent().parent().append('<span class="default">Default</span>');
    })

}())
$(document).on('change', '.upload-form input', function () {
    var filename = $(this).val().replace(/C:\\fakepath\\/i, '');
    readImageURL(this);
});
// map
function initMap() {

    var mapDiv = document.getElementById('map'),
          location = {
              lat: 53.472225,
              lng: -2.299675
          },
      icon = {
          url: "../assets/images/marker.png" // url
          //scaledSize: new google.maps.Size(50, 50)
      };

    var map = new google.maps.Map(mapDiv, {
        center: location,
        gestureHandling: 'greedy',
        scrollwheel: false,
        // draggable: false,
        disableDefaultUI: true,
        zoom: 14
    });

    var newMarker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon
    });

    newMarker.addListener('click', function () {
        // console.log({lat: this.getPosition().lat(), lng: this.getPosition().lng()});
        // console.log(location);
        //map.setZoom(17);
        //// map.setCenter(location); 
        //map.setCenter({
        //    lat: this.getPosition().lat(),
        //    lng: this.getPosition().lng()
        //});
        $('.popup[data-popup=makan]').toggleClass('open');
    });

    //var msg1 = document.getElementById('dragend');
    //map.addListener('dragend', function () {
    //    msg1.className = 'active';
    //    setTimeout(function () { msg1.className = ''; }, 500);
    //});

    //var msg2 = document.getElementById('bounds_changed');
    //map.addListener('bounds_changed', function () {
    //    msg2.className = 'active';
    //    setTimeout(function () { msg2.className = ''; }, 500);
    //});
};

function initWizard() {
    var screen = {};
    var navText = ['<a class="default-btn black-btn prev prev-wizard">Previous<i class="fa fa-long-arrow-left"></i></a>', '<a class="default-btn next next-wizard">Next<i class="fa fa-long-arrow-right"></i></a>'];
    screen.$el = $('#WizardEntity');
    if (!screen.$el.length) {
        return;
    }

    screen.$slider = screen.$el.owlCarousel({
        items: 1,
        margin: 10,
        autoHeight: true,
        mouseDrag: false,
        dots: false,
        navText: navText,
        nav: false,
        smartSpeed: 300,
        onChanged: function () {
            setTimeout(function () {


                if (screen.$el.find('.owl-item.active').prev('.owl-item').length) {
                    $('.wizard-action').addClass('has-prev');
                }
                else {
                    $('.wizard-action').removeClass('has-prev');
                }

                if (screen.$el.find('.owl-item.active').next('.owl-item').length) {
                    $('.wizard-action').addClass('has-next');
                    $('.wizard-action').removeClass('has-finished');
                }
                else {
                    $('.wizard-action').removeClass('has-next');
                    $('.wizard-action').addClass('has-finished');
                }

                $('.wizard-ticks').attr('data-tick', screen.$el.find('.owl-item.active').index())
                //$('.wizard-ticks .tick').eq(screen.$el.find('.owl-item.active').index()).addClass('done')
                $('.wizard-ticks .tick').removeClass('done');
                $('.wizard-ticks .tick').filter(function (index) {
                    //alert(index)
                    return $(this).index() <= screen.$el.find('.owl-item.active').index()
                }).addClass('done');
                if (this.currentItem === this.maximumItem) {
                    //alert(
                    //  $('.owl-item').eq(this.maximumItem)
                    //)
                }
            }, 0);


        }
    });
    $('.change-select button').click(function () {
        setTimeout(function () {
            //screen.$slider.trigger('refresh.owl.carousel');
            //$(document).bind('click', function () {

            //    screen.$slider.trigger('resize.owl.carousel');
            //});

            setTimeout(function () {
                // $(document).unbind("click");
            }, 100)

        }, 0)

    });

    $('.next-wizard').click(function () {
        screen.$slider.trigger('next.owl.carousel');
        $('.wizard-ticks').removeClass('go-back');
    });

    $('.prev-wizard').click(function () {
        screen.$slider.trigger('prev.owl.carousel');
        $('.wizard-ticks').addClass('go-back');
    });

    screen.$slider.on('changed.owl.carousel', function () {
        setTimeout(function () {


        }, 0)
    });

}

var readImageURL = function (input) {


    if (input.files && input.files[0]) {

        var filesArray = Array.prototype.slice.call(input.files);
        filesArray.forEach(function (fileElement) {

            var reader = new FileReader();
            reader.onload = function (e) {
                var inputFilesArray = $(input).data('files') ? JSON.parse($(input).data('files')) : [];
                var $thumbnail, $wrapper;
                var file = {
                    'name': fileElement.name,
                    'type': fileElement.type,
                    'doctype': $(input).attr('doctype')
                }
                //var $wrapper = $($(input).closest('.form-image'));
                //if ($wrapper.length <= 0) {
                //    $(input).closest('.file-explorer-wrapper').append($("<div class='thumbnails' />"));
                //    $wrapper = $(".thumbnails", $(input).closest('.file-explorer-wrapper'));
                //}
                //<a href='javascript:void(0)' class='close-btn'><i class='la la-trash-o'></i></a>
                if ($(input).hasClass('promo')) {
                    $wrapper = $(input).closest('.file-explorer-wrapper');
                    $thumbnail = $("<div class='form-image'></div>").attr('title', fileElement.name);
                }
                else {
                    $thumbnail = $($(input).next('.form-image')).attr('title', fileElement.name);
                }

                if (/\/pdf$/i.test(fileElement.type))
                    $thumbnail.css({
                        'background-image': 'url("assets/img/sample/pdf.png")',
                        'background-size': 'auto',
                        'background-position': 'center top'
                    });
                else if (/^image\//i.test(fileElement.type))
                    $thumbnail.css({
                        'background-image': 'url(' + e.target.result + ')',
                        'background-size': 'cover',
                        'background-position': 'center center'
                    });
                else
                    $thumbnail.css({
                        'background-image': 'url("assets/img/sample/doc.png")',
                        'background-size': 'auto',
                        'background-position': 'center top'
                    });
                if ($(input).hasClass('promo')) {
                    $wrapper.prepend("<div class='upload-form max animated pulse'>" + $thumbnail[0].outerHTML + "<div class='form-caption has-thumb'></div><a href='javascript:void(0)' class='reset ever'><i class='la la-trash-o'></i></a></div>");
                    $(input).val('');
                }
                else {
                    $thumbnail.parent().find('.form-caption').addClass('has-thumb');
                }

                file.base64Content = e.target.result;

                inputFilesArray.push(file);
                $(input).data('files', JSON.stringify(inputFilesArray));

            };

            reader.readAsDataURL(fileElement);
        });
    }

    $(document).on('click', '.upload-form .reset', function () {
        if ($(this).hasClass('ever')) {
            $(this).parent('.upload-form').remove();
        }
        else {
            $(this).prevAll('.form-caption').removeClass('has-thumb');
            $(this).prevAll('.form-image').removeAttr('style');
            $(this).prevAll('input').val('');
        }
    });

}