import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'

// import SearchPage from './components/Tabs/SearchPage'
import PlayPage from './components/Tabs/PlayPage'
// import Queue from './components/Queue'
import './App.css';

export default function App() {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const auth_code = searchParams.get('code')
  const state = searchParams.get('state')
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="Logo1">Lyrical Miracle</h1>
        <Tabs defaultActiveKey="Play" id="PageTabs">
          {/* <Tab eventKey="Search" title="Search">
            <SearchPage />
          </Tab> */}
          <Tab eventKey="Play" title="Play">
            <PlayPage auth_code={auth_code} state={state}/>
          </Tab>
        </Tabs>
        {/* <Queue/> */}
      </header>
    </div>
  );
}