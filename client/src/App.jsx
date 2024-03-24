import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
