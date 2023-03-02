import matter from 'gray-matter'
import { useMarkdownForm } from 'next-tinacms-markdown'
import { usePlugin } from 'tinacms'

import Layout from '../components/Layout'
import Typed from 'react-typed'

export default function Contact(props) {
  const formOptions = {
    label: 'Contact Page',
    fields: [
      {
        name: 'frontmatter.page_header',
        label: 'Page Header',
        component: 'text',
      },
      {
        name: 'markdownBody',
        label: 'Page Content',
        component: 'html',
      },
    ],
  }
  const [data, form] = useMarkdownForm(props.markdownFile, formOptions)
  const typed_content = []
  typed_content.push(data.markdownBody)

  usePlugin(form)

  return (
    <Layout
      pathname="contact"
      siteTitle={props.title}
      footerLinks={props.contact.links}
    >
      <div
        id="contact_content"
        className="ui middle aligned container centered grid main-content"
      >
        <div className="column">
          <h1 className="first-line animate__animated animate__fadeIn">
            {data.frontmatter.page_header}
          </h1>

          <div className="sub header second-line">
            <Typed strings={typed_content} typeSpeed={-1000} cursorChar="_" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

Contact.getInitialProps = async function() {
  const content = await import(`../../data/contact.md`)
  const config = await import(`../../data/config.json`)
  const data = matter(content.default)

  return {
    markdownFile: {
      fileRelativePath: `data/contact.md`,
      frontmatter: data.data,
      markdownBody: data.content,
    },
    title: config.global.title,
    contact: config.contact,
  }
}
