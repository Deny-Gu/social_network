import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Registration from './components/Registration';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';


interface State {
  store: Store
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Profile />
  },
  {
    path: "/:id/profile-edit",
    element: <ProfileEdit />
  },
  {
    path: "/registration",
    element: <Registration />

  },
  {
    path: "/login",
    element: <LoginForm />

  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ store }}>
    <RouterProvider router={router} />
  </Context.Provider>
);

