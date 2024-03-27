import "./App.scss";

import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./router/AppRoutes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Toaster />
    </div>
  );
}

export default App;
