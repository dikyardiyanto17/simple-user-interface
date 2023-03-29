import 'bootstrap/dist/css/bootstrap.min.css';
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./stores";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
