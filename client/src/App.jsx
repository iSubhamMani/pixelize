import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Feed />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
