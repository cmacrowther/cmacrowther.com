import { useJsonForm } from 'next-tinacms-json'
import { usePlugin } from 'tinacms'
import Layout from '../components/Layout'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const Projects = ({ jsonFile, title }) => {
  const formOptions = {
    label: 'Projects Page',
    fields: [
      {
        label: 'Projects Content',
        name: 'projects',
        component: 'group-list',
        description: 'List of projects to display on this page',
        itemProps: item => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: () => ({
          name: 'New Project',
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
          {
            label: 'Project Source Code URL',
            name: 'projectLink',
            component: 'text',
          },
          {
            label: 'Project Deployment URL',
            name: 'deployLink',
            component: 'text',
          },
        ],
      },
    ],
  }

  const [data, form] = useJsonForm(jsonFile, formOptions)
  usePlugin(form)

  return (
    <Layout pathname="projects" siteTitle={title}>
      <div className="ui middle aligned container centered grid main-content">
        <Splide className="projects-slides" options={{ gap: '15em' }}>
          {data.projects?.map(function(project, index) {
            return (
              <SplideSlide key={index}>
                <div className="project-slide">
                  <h2 className="first-line animate__animated animate__fadeIn">
                    {project.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.sContent }}
                    className="second-line animate__animated animate__fadeIn"
                  ></div>
                  <div className="project-links animate__animated animate__fadeIn">
                    {project.projectLink ? (
                      <a href={project.projectLink}>
                        <span className="fab fa-gitlab animated circle-icon"></span>
                      </a>
                    ) : (
                      <></>
                    )}
                    {project.deployLink ? (
                      <a href={project.deployLink}>
                        <span className="fas fa-link animated circle-icon"></span>
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </SplideSlide>
            )
          })}
        </Splide>
      </div>
    </Layout>
  )
}

export default Projects

Projects.getInitialProps = async function() {
  const content = await import(`../../data/projects.json`)
  const config = await import(`../../data/config.json`)

  return {
    jsonFile: {
      fileRelativePath: `data/projects.json`,
      data: content.default,
    },
    title: config.global.title,
  }
}
