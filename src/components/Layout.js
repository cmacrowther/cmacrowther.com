import Header from './Header'
import Meta from './Meta'

import $ from 'jquery'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import netlifyAuth from '../../netlifyAuth.js'
import { useCMS } from 'tinacms'

export default function Layout(props) {
  const cms = useCMS()
  let [user, setUser] = useState(null)
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

  let login = () => {
    netlifyAuth.authenticate(user => {
      setLoggedIn(!!user)
      setUser(user)
      netlifyAuth.closeModal()
    })
  }
  useEffect(() => {
    netlifyAuth.initialize(user => {
      setLoggedIn(!!user)
    })
  }, [loggedIn])

  if (loggedIn && !cms.enabled) {
    cms.enable()
  }

  if (typeof window !== 'undefined' && !$('div.waves').length) {
    loadFooter()

    var SEPARATION = 45,
      AMOUNTX = 100,
      AMOUNTY = 35
    var container
    var camera, scene, renderer
    var particles,
      particle,
      count = 0
    var windowHalfX = window.innerWidth / 3
    var windowHalfY = window.innerHeight / 3
    init()
    animate()

    function init() {
      container = document.createElement('div')
      document.body.appendChild(container)
      if (container) {
        container.className += container.className ? ' waves' : 'waves'
      }
      camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      camera.position.y = 400
      camera.position.z = 50
      camera.rotation.y = 0.1
      scene = new THREE.Scene()
      particles = new Array()
      var PI2 = Math.PI * 2
      var material = new THREE.SpriteCanvasMaterial({
        color: 0x444444,
        program: function(context) {
          context.beginPath()
          context.arc(0, 0, 0.2, 0, PI2, true)
          context.fill()
        },
      })
      var i = 0
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Sprite(material)
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION - 10)
          scene.add(particle)
        }
      }
      renderer = new THREE.CanvasRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x111111, 1)
      container.appendChild(renderer.domElement)
      window.addEventListener('resize', onWindowResize, false)
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate() {
      requestAnimationFrame(animate)
      render()
    }

    function render() {
      var i = 0
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++]
          particle.position.y =
            Math.sin((ix + count) * 0.5) * 20 +
            Math.sin((iy + count) * 0.5) * 20
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 2) * 4 +
            (Math.sin((iy + count) * 0.5) + 1) * 4
        }
      }
      renderer.render(scene, camera)
      count += 0.2
    }

    function loadFooter() {
      var $footer = $('.footer')
      setTimeout(function() {
        $footer.fadeIn()
      }, 0)
    }
  }

  return (
    <section
      className={`layout ${props.pathname == 'info' && 'info_page'}`}
      style={{
        height: `100%`,
      }}
    >
      <Meta
        siteTitle={props.siteTitle}
        siteDescription={props.siteDescription}
      />

      <div className="pixelized"></div>
      <div className="pixelized-heavy"></div>
      <div className="pixelized-heaviest"></div>

      <Header siteTitle={props.siteTitle} login={login} />

      {props.children}

      <div className="ui container grid">
        <div className="column">
          <div className="footer">
            <div className="pull-right">
              {props.footerLinks?.map(function(link, index) {
                return (
                  <a key={index} href={link.anchor}>
                    <span
                      className={'fab ' + link.icon + ' animated circle-icon'}
                    ></span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
