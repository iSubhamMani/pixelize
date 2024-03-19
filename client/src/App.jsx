import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthCheck from "./utils/AuthCheck";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  // Check for auth
  // Load components based on result

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AuthCheck />,
      children: [
        {
          path: "/feed",
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
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
