import Link from 'next/link'
import $ from 'jquery'

export default function Header(props) {
  if (typeof window !== 'undefined') {
    var $mobileMenu = $('.mobile-menu')
  }

  function setMenuItemActive(elementP) {
    var $this = $(elementP)
    $('.menu .item').removeClass('active')
    $('.mobile-menu .item').removeClass('active')
    $('.menu .item')
      .children('span')
      .remove()
    $('.mobile-menu .item')
      .children('span')
      .remove()
    $this.addClass('active')
    $this.html('<span>>&nbsp;</span>' + $this.html())
  }

  function toggleMobileMenu(thisP) {
    if (thisP == null) {
      this.setAttribute('aria-expanded', this.classList.contains('opened'))
    }

    var btn = document.getElementById('hamburgler')
    btn.classList.toggle('opened')
    btn.setAttribute('aria-expanded', btn.classList.contains('opened'))

    $mobileMenu.toggle()
  }

  return (
    <div id="menu" className="ui fixed borderless inverted huge menu">
      <div className="ui container grid">
        <div className="tablet mobile only hamburger">
          <div className="ui container grid">
            <div className="left floated aligned column">
              <button
                id="hamburgler"
                className="menu"
                onClick={toggleMobileMenu}
                aria-label="Main Menu"
              >
                <svg width="50" height="50" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
              <div className="mobile-menu">
                <div className="container">
                  <a
                    id="home_menu_mobile"
                    href="/"
                    className="active item animate__animated animate__fadeIn"
                  >
                    Home
                  </a>
                  <a
                    id="projects_menu_mobile"
                    href="/projects"
                    className="item animate__animated animate__fadeIn animate__fast"
                  >
                    Projects
                  </a>
                  <a
                    id="contact_menu_mobile"
                    href="/contact"
                    className="item animate__animated animate__fadeIn animate__faster"
                  >
                    Contact
                  </a>
                  <div
                    id="login"
                    onClick={props.login}
                    className="item animate__animated animate__fadeIn animate__fastest"
                  >
                    Login
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
