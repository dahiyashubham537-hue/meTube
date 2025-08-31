import { Children } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Watch from "./components/Watch";

function App() {
  const AppLayout = () => {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  };
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Body />,
          children: [
            {
              path: "/",
              element: <MainContainer />,
            },
            {
              path: "/results",
              element: <MainContainer />,
            },
            {
              path: "/watch",
              element: <Watch />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Provider store={appStore}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
