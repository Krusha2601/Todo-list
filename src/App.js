//import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Sidebar from './components/sidebar'
import Body from './components/body'
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <Header/>
     <div className='flex'>
      <Sidebar/>
      <Body/>
      </div>
    </div>
    </Provider>
  );
}

export default App;
