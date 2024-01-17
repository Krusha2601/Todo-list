//import logo from './logo.svg';
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Body from "./components/body";
import { Provider } from "react-redux";
import store from "./store";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  return (
    <Provider store={store}>
      <DragDropContext>
        <div className="App">
          <Header />
          <div className="flex">
            <Sidebar />
            <Body />
          </div>
        </div>
      </DragDropContext>
    </Provider>
  );
}

export default App;
