import Typed from 'react-typed'

class Callout extends React.Component {
  constructor(props) {
    super()
    const slides = props.content
    const typed_content = []

    slides.map((slide, i) => {
      typed_content.push(
        slide.sContent.replace(
          /<strong>/g,
          '<strong style="color:' + this.randomColor() + '">'
        )
      )
    })

    this.slide_content = typed_content
  }

  render() {
    return (
      <>
        <div
          id="home_content"
          className="ui middle aligned container centered grid main-content"
        >
          <div className="column">
            <h1
              dangerouslySetInnerHTML={{ __html: this.props.title }}
              className="first-line animate__animated animate__fadeIn"
            ></h1>
            <div className="sub header second-line">
              {typeof this.slide_content !== 'undefined' ? (
                <Typed
                  strings={this.slide_content}
                  typeSpeed={1}
                  cursorChar="_"
                  backDelay={2000}
                  loop={true}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  randomColor() {
    var colors = [
      '#c3a9ff',
      '#f7941d',
      '#7fc7bb',
      '#f64c71',
      '#5bdc92',
      '#3feee7',
      '#65fcf0',
      '#febd41',
      '#13a76b',
      '#ffe401',
      '#5ab8eb',
    ]
    var random_color = colors[Math.floor(Math.random() * colors.length)]
    return random_color
  }
}

export default Callout
