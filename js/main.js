var home_typed = null;
var contact_typed = null;
var projects_typed_1 = null;
var projects_typed_2 = null;
var projects_typed_3 = null;
var home_typed_content = ['I\'m a UI/UX focused web developer from <span>Prince Edward Island, Canada.</span>',
  'Currently writing enterprise-level software in <span>Java/Struts 2.</span>',
  'University of Prince Edward Island alumni holding a <span>B.Sc. in Computer Science.</span>'
];
var contact_typed_content = ['Shoot me an email! I always take interest in new projects. My email is <a href="#">cmacrowther@gmail.com</a>'];
var projects_typed_content_1 = ['<a href="https://timeshifts.netlify.com/">TimeShifts</a> is a <span>web-application</span> that generates work schedules taking into account employee preferences.'];
var projects_typed_content_2 = ['<a href="https://squawkbox.netlify.com">Squawkbox</a> allows users to turn their device into a communal jukebox by linking their <span>Spotify</span>.'];
var projects_typed_content_3 = ['<a href="https://defuserband.com/">Defuser</a> is a website I threw together for my band leveraging <span>Jekyll</span> and <span>ForestryCMS</span>.'];

var $mobileMenu = $('.mobile-menu');

$(function () {
  var $footer = $('.footer');
  setTimeout(function () {
    $footer.fadeIn()
  }, 0);

  applyColorsToTypedSpans();
  showSection("home");

  $('#home_menu').on('click', function () {
    setMenuItemActive(this);
    showSection("home");
  });
  $('#home_menu_mobile').on('click', function () {
    setMenuItemActive(this);
    showSection("home");
    toggleMobileMenu(null);
  });
  $('#projects_menu').on('click', function () {
    setMenuItemActive(this);
    showSection("projects");
  });
  $('#projects_menu_mobile').on('click', function () {
    setMenuItemActive(this);
    showSection("projects");
    toggleMobileMenu(null);
  });
  $('#contact_menu').on('click', function () {
    setMenuItemActive(this);
    showSection("contact");
  });
  $('#contact_menu_mobile').on('click', function () {
    setMenuItemActive(this);
    showSection("contact");
    toggleMobileMenu(null);
  });
});

function setMenuItemActive(elementP) {
  var $this = $(elementP);
  $('.menu .item').removeClass("active")
  $('.mobile-menu .item').removeClass("active")
  $('.menu .item').children('span').remove();
  $('.mobile-menu .item').children('span').remove();
  $this.addClass("active");
  $this.html("<span>>&nbsp;</span>" + $this.html());
}

function showSection(sectionP) {
  if (home_typed != null) home_typed.destroy();
  if (contact_typed != null) contact_typed.destroy();
  if (projects_typed_1 != null) projects_typed_1.destroy();
  if (projects_typed_2 != null) projects_typed_2.destroy();
  if (projects_typed_3 != null) projects_typed_3.destroy();
  if (sectionP == 'home') {
    $('#contact_content').hide();
    $('#projects_content').hide();
    $('#home_content').show();
    home_typed = new Typed('#home_content .typed-message', {
      strings: home_typed_content,
      typeSpeed: 5,
      backDelay: 5000,
      loop: true,
      cursorChar: '_',
    });
  } else if (sectionP == "contact") {
    $('#home_content').hide();
    $('#projects_content').hide();
    $('#contact_content').show();
    contact_typed = new Typed('#contact_content .typed-message', {
      strings: contact_typed_content,
      typeSpeed: 5,
      backDelay: 1000,
      cursorChar: '_',
    });
  } else if (sectionP == "projects") {
    $('#contact_content').hide();
    $('#home_content').hide();
    $('#projects_content').show();

    var swiper = new Swiper('.swiper-container', {
      mousewheel: {
        enabled: true,
        invert: false,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 10000
      }
    });

    projects_typed_1 = new Typed('#projects_content .typed-message-1', {
      strings: projects_typed_content_1,
      typeSpeed: -500000,
      cursorChar: '_',
      onComplete: function () {
        $('.timeshifts.project-btn').show();
      }
    });

    swiper.on('slideChangeTransitionStart', function () {
      if (projects_typed_1 != null) projects_typed_1.destroy();
      if (projects_typed_2 != null) projects_typed_2.destroy();
      if (projects_typed_3 != null) projects_typed_3.destroy();
      $('.timeshifts.project-btn').hide();
      $('.squawkbox.project-btn').hide();
      $('.defuser.project-btn').hide();
      $('.timeshifts.first-line').hide();
      $('.squawkbox.first-line').hide();
      $('.defuser.first-line').hide();
    });

    swiper.on('slideChangeTransitionEnd', function () {

      if (swiper.activeIndex == 0) {
        $('.timeshifts.first-line').show();
        projects_typed_1 = new Typed('#projects_content .typed-message-1', {
          strings: projects_typed_content_1,
          typeSpeed: -500000,
          cursorChar: '_',
          onComplete: function () {
            $('.timeshifts.project-btn').show();
          }
        });
      } else if (swiper.activeIndex == 1) {
        $('.squawkbox.first-line').show();
        projects_typed_2 = new Typed('#projects_content .typed-message-2', {
          strings: projects_typed_content_2,
          typeSpeed: -500000,
          cursorChar: '_',
          onComplete: function () {
            $('.squawkbox.project-btn').show();
          }
        });
      } else if (swiper.activeIndex == 2) {
        $('.defuser.first-line').show();
        projects_typed_3 = new Typed('#projects_content .typed-message-3', {
          strings: projects_typed_content_3,
          typeSpeed: -500000,
          cursorChar: '_',
          onComplete: function () {
            $('.defuser.project-btn').show();
          }
        });
      }
    });
  }
}

function toggleMobileMenu(thisP) {
  if (thisP == null) {
    var btn = document.getElementById("hamburgler")
    btn.classList.toggle('opened');
    btn.setAttribute('aria-expanded', btn.classList.contains('opened'));
  }
  $mobileMenu.toggle();
}

function applyColorsToTypedSpans() {
  $.each(home_typed_content, function (index, value) {
    home_typed_content[index] = value.replace(/<span>/g, "<span style=\"color:" + randomColor() + "\">");
  });
  $.each(contact_typed_content, function (index, value) {
    contact_typed_content[index] = value.replace(/<span>/g, "<span style=\"color:" + randomColor() + "\">");
  });
  $.each(projects_typed_content_1, function (index, value) {
    projects_typed_content_1[index] = value.replace(/<span>/g, "<span style=\"color:" + randomColor() + "\">");
  });
  $.each(projects_typed_content_2, function (index, value) {
    projects_typed_content_2[index] = value.replace(/<span>/g, "<span style=\"color:" + randomColor() + "\">");
  });
  $.each(projects_typed_content_3, function (index, value) {
    projects_typed_content_3[index] = value.replace(/<span>/g, "<span style=\"color:" + randomColor() + "\">");
  });
}

function randomColor() {
  var colors = ['#c3a9ff', '#f7941d', '#7fc7bb', '#f64c71', '#5bdc92', '#3feee7', '#65fcf0', '#febd41', '#13a76b', '#ffe401', '#5ab8eb'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
}