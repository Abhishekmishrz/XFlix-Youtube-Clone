import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import VideoPage from "./Components/VideoPage";

export const endpoint =
"https://be8cae9f-8af6-4a48-9161-d55d453d9d5c.mock.pstmn.io/v1/videos";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/video/:id">
          <VideoPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
