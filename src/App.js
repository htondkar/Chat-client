import Component from 'inferno-component'

class App extends Component {
  render() {
    return <div className="app">{this.props.children}</div>
  }
}

export default App
