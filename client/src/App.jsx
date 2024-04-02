import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import NewPost from "./pages/NewPost";
import Main from "./components/Main";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/new-post",
          element: <NewPost />,
        },
      ],
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
