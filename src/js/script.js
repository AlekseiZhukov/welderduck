'use strict';

$(document).ready( () => {

    //----header color -------------------------------


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
    const navLink = $('nav ul li a, .logo a, .main__subdivision');
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
      if ($(this).scrollTop() > 50 && window.screen.width <= 678) {
          $('#logo').hide('slow');
      } else {
          $('#logo').show('slow');
      }

      if ($(this).scrollTop() > 50) {
          $('.header').addClass("color");
      } else {
          $('.header').removeClass("color");
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


    //----Popup & Feedback form --------------------------------------
    const feedbackForm = $('.feedback__form');
    const name = $('#name');
    const phone = $('#phone');
    const message=$('#message');
    const checkbox = $('#checkbox');
    const checkboxLabel = $('#checkboxLabel');
    const messageError = $('.message__error');
    let hasErrorName = false;
    let hasErrorPhone = false;
    let hasErrorMessage = false;
    let hasErrorCheckbox = false;

    $('.show_popup').click( function () {
        let popupId = $(`#${$(this).attr('rel')}`);
        $(popupId).show({effect: "scale", duration: 300, complete: () => {
                $('.popup__content').show({effect: "explode", duration: 300})
            }});
    });

    $('.form-reset').click(resetForm);
    function resetForm() {

        $('.popup__content').hide({effect: "explode", duration: 500, complete: ()=> {
                $('#popup1').hide({effect: "scale", duration: 500})
            }})
        hasErrorName = hasErrorPhone = hasErrorMessage = hasErrorCheckbox = false;
        $('input, textarea').each( function () {
            $(this).val('');
        } );
        $('.form__action').show();
        $('.resul-message').text('').hide();
    }
    function validationName () {
        if (!name.val()) {
            name.next('.message__error').text('Введите имя');
            name.addClass('error');
            hasErrorName = true;
        } else {
            name.removeClass('error');
            name.next('.message__error').text('');
            hasErrorName = false
        }
    }
    function validationPhone () {
        if (!phone.val()) {
            phone.next('.message__error').text('Введите номер телефона');
            phone.addClass('error');
            hasErrorPhone = true;
        } else if (phone.val().includes('_')) {
            phone.next('.message__error').text('Некорректный номер');
            phone.addClass('error');
            hasErrorPhone = true;
        } else {
            phone.removeClass('error');
            phone.next('.message__error').text('');
            hasErrorPhone = false;
        }
    }
    function validationMessage () {
        if (!message.val()) {
            message.next('.textarea__message__error').text('Напишите сообщение');
            message.addClass('error');
            hasErrorMessage = true;
        } else {
            message.removeClass('error');
            message.next('.textarea__message__error').text('');
            hasErrorMessage = false;
        }
    }
    function validationCheckbox () {
        if(!checkbox[0].checked) {
            checkboxLabel.next('.message__error').text('Подтвердите согласие');
            checkboxLabel.addClass('error');
            hasErrorCheckbox = true;
        } else {
            checkboxLabel.removeClass('error');
            checkboxLabel.next('.message__error').text('');
            hasErrorCheckbox = false;
        }
    }

    //----плагин для поля номера телефона, позиционирование курсора--------
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            let range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    name.on('change', function () {
        validationName()
    })

    phone.on('change', function () {
        validationPhone()
    })

    message.on('change', function () {
        validationMessage()
    })

    checkbox.on('change', function () {
        validationCheckbox()
    })

    phone.click( function () {
        $(this).setCursorPosition(3);
    }).mask("+7(999) 999-99-99", {autoclear: false});

    feedbackForm.on('submit', function(env) {
        env.preventDefault();
        const loader = $('.loader');
        let hasError;
        loader.css('display', 'flex');
        messageError.text('');
        validationName();
        validationPhone();
        validationMessage();
        validationCheckbox();

        hasError = !(!hasErrorName && !hasErrorPhone && !hasErrorMessage && !hasErrorCheckbox);

        if(!hasError) {
            const sentMessage = `Имя: ${name.val()}\n\n Телефон: ${phone.val()}\n\n Сообщение: ${message.val()}`;
            const dataForSend = {
                chat_id: "-4064576446",
                parse_mode: "HTML",
                text: sentMessage,
            }
            $.ajax({
                method: "POST",
                url: "https://api.telegram.org/bot6925321360:AAHzHslfXmNbnHCHgLaZfZMSwSnITBdRXL8/sendMessage",
                data: dataForSend
            })
                .done( (msg) => {
                    loader.hide();
                    console.log('ajax', msg)
                    if (msg && msg.ok) {
                        $('.form__action').hide();
                        $('.resul-message').text('Сообщение отправлено!').show();
                        setTimeout( () => {
                            resetForm('popup1')
                        }, 3000)
                    }
                    if (msg && !msg.ok) {
                        $('.form__action').hide();
                        $('.resul-message').text('Сообщение не отправлено!').show();
                        console.log('Сообщение не отправлено: ', msg)
                        setTimeout( () => {
                            resetForm('popup1')
                        }, 3000)
                    }
                })
        } else {
            loader.hide()
        }
    })

    $(".loft-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive:[
            {
                breakpoint: 426,
                settings: {
                    arrows: false,
                    dots: false
                }
            }
        ]

    });


});



