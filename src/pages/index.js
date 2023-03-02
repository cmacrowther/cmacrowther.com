import matter from 'gray-matter'
import { useJsonForm } from 'next-tinacms-json'
import { usePlugin } from 'tinacms'

import Layout from '../components/Layout'
import Callout from '../components/Callout'

const Index = ({ jsonFile }) => {
  const formOptions = {
    label: 'cmacrowther.com',
    fields: [
      {
        label: 'Global Settings',
        name: 'global',
        description: 'Global site settings such as meta data information',
        component: 'group',
        fields: [
          {
            name: 'title',
            label: 'Site Title',
            component: 'text',
          },
          {
            name: 'description',
            label: 'Site Description',
            component: 'text',
          },
          {
            name: 'repositoryUrl',
            label: 'Repository Url',
            component: 'text',
          },
        ],
      },
      {
        label: 'Homepage Content',
        name: 'homepage',
        description: 'Content specific to the homepage',
        component: 'group',
        fields: [
          {
            name: 'homepageTitle',
            label: 'Homepage Title',
            component: 'html',
          },
          {
            label: 'Homepage Content',
            name: 'homepageContent',
            component: 'group-list',
            description: 'Homepage Content',
            itemProps: item => ({
              key: item.id,
              label: item.name,
            }),
            defaultItem: () => ({
              name: 'New Typed Item',
              id: Math.random()
                .toString(36)
                .substr(2, 9),
            }),
            fields: [
              {
                label: 'Name',
                name: 'name',
                component: 'text',
              },
              {
                label: 'Content',
                name: 'sContent',
                component: 'html',
              },
            ],
          },
        ],
      },
      {
        label: 'Social Media & External Links',
        name: 'contact',
        description: 'Links to external websites',
        component: 'group',
        fields: [
          {
            label: 'Links',
            name: 'links',
            component: 'group-list',
            description: 'Links displayed throughout the website.',
            itemProps: item => ({
              key: item.id,
              label: item.name,
            }),
            defaultItem: () => ({
              name: 'New Link',
              id: Math.random()
                .toString(36)
                .substr(2, 9),
            }),
            fields: [
              {
                label: 'Name',
                name: 'name',
                component: 'text',
              },
              {
                label: 'Link',
                name: 'anchor',
                component: 'text',
              },
              {
                label: 'Icon',
                name: 'icon',
                component: 'text',
              },
            ],
          },
        ],
      },
    ],
  }
  const [data, form] = useJsonForm(jsonFile, formOptions)
  usePlugin(form)

  return (
    <Layout
      pathname="/"
      siteTitle={data.global.title}
      siteDescription={data.global.description}
      footerLinks={data.contact.links}
    >
      <Callout
        title={data.homepage.homepageTitle}
        content={data.homepage.homepageContent}
      />
    </Layout>
  )
}

export default Index

Index.getInitialProps = async function() {
  const content = await import(`../../data/config.json`)
  
  return {
    jsonFile: {
      fileRelativePath: `data/config.json`,
      data: content.default,
    },
  }
}
