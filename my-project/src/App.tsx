import { observer } from 'mobx-react-lite';
import './App.css'
import Shedule from './components/shedule/Main'
import Sidebar from './components/sidebar/Sidebar'

function App() {

  return (
    <div className="container">
      <Sidebar />
      <Shedule />
    </div>
  )
}

export default observer(App);
