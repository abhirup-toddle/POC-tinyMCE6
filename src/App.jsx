import './App.css'
import Box from './Box'
import Tiny from './Tiny'

function App() {
  return (
    <div className="App">
      <h1>Rich Text Editor POC</h1>
      <Tiny />
      <Tiny inline={true}/>
      <Box/>
    </div>
  )
}

export default App
