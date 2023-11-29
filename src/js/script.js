'use strict';

$(document).ready( () => {
    //----паралах----------------------------------
   $('.jarallax').jarallax({
        speed: 0.2,
    });
    $( '#services__tabs' ).tabs({
        show: { effect: "fade", duration: 200 },
        hide: { effect: "fade", duration: 200 }
    });

    //----Меню бургер------------------------------
    const menuBtn = $('.header__menu-btn');
    const menuMobile = $('.menu__mobile');
    menuBtn.click( function () {
        menuMobile.toggleClass('active');
        menuBtn.toggleClass('active');
        if (menuMobile.hasClass('active')){
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    })

    //----Мобильное меню----------------------------
    $('.menu__mobile *').each( function () {
        $(this).click( () => {
            menuMobile.removeClass('active');
            menuBtn.removeClass('active');
            document.body.style.overflow = 'auto';
        })
    })

    //----Плавный скрол для якорных линков----------
    const navLink = $('nav ul li a, .logo a');
    navLink.on('click', function (env) {
        if (this.hash !== '') {
            env.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            })
        }
    })

  new WOW().init();

  const button = $('#actionUp');
  $(window).scroll(function () {
      if ($(this).scrollTop () > 300) {
          button.fadeIn();
      } else {
          button.fadeOut();
      }
  });
  button.on('click', function(){
      $('body, html').animate({
          scrollTop: 0
      }, 800);
      return false;
  });


    const buttonPhone = $('.button__phone');
    setInterval(() => {
        buttonPhone.addClass('effect');
        setTimeout(()=> buttonPhone.removeClass('effect'), 1000)
    },10000)

});



