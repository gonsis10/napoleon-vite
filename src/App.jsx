import { BrowserRouter, Route } from "react-router-dom";
import ToDoModal from "./components/ToDoModal";
import TitleBar from "./components/TitleBar";
import NavPage from "./components/NavPage";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToDoModal />
        {/* heading section */}
        <section className="flex flex-col h-screen">
          <TitleBar />
          <div className="relative flex-1 items-stretch">
            <NavPage />
          </div>
        </section>
        {/* sidebar section */}
        <section>
          <Sidebar />
        </section>
        {/* <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/settings" component={Settings} />
        </Switch> */}
      </BrowserRouter>
      {/* <div>
        <h1>Hello</h1>
        <p className="text-2xl font-spacemono">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident est nobis placeat ipsam pariatur, quaerat molestiae, beatae accusamus fuga id dolor eaque recusandae explicabo odio
          commodi consequuntur, harum dicta ratione?
        </p>
        <Test />
        <Clock />
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p> */}
    </div>
  );
}

export default App;
