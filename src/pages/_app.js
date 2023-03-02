import React from 'react'
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'
import { GitClient, GitMediaStore } from '@tinacms/git-client'
import { MarkdownFieldPlugin, HtmlFieldPlugin } from 'react-tinacms-editor'
import { DateFieldPlugin } from 'react-tinacms-date'

import { CreateBlogPlugin } from '../../plugins/markdownCreator'

//TODO: Replace this stuff with npm packages
import '../styles/semantic.min.css'
import '../styles/icon.min.css'
import '../styles/main.css'
import '../styles/animate.min.css'
import '../styles/all.css'
import '../styles/swiper.css'
import '../../public/static/fonts/mono-plex.css'

class MyApp extends App {
  constructor() {
    super()
    const git = new GitClient('/___tina')
    this.cms = new TinaCMS({
      enabled: process.env.NODE_ENV !== "production",
      sidebar: {
        position: 'overlay',
      },
      apis: {
        git,
      },
      media: new GitMediaStore(git),
    })
    this.cms.plugins.add(MarkdownFieldPlugin)
    this.cms.plugins.add(HtmlFieldPlugin)
    this.cms.plugins.add(DateFieldPlugin)
    this.cms.plugins.add(CreateBlogPlugin)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}
export default MyApp
