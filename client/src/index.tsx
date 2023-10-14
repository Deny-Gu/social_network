import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Registration from './components/Registration';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import Header from './components/Header';
import Photo from './components/photo/Photo';
import ProfileId from './components/profile/ProfileId';
import PhotoAlbumEdit from './components/photo/PhotoAlbumEdit';
import PhotoAlbumPage from './components/photo/PhotoAlbumPage';
import FriendsPage from './components/friends/FriendsPage';
import FriendsSearchPage from './components/friends/FriendsSearchPage';

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
    children: [
      {
        path: "",
        element: <ProfileId />
      },
      {
        path: "/:id",
        element: <Profile />
      },
      {
        path: "/profile-edit",
        element: <ProfileEdit />
      },
      {
        path: "/friends",
        element: <FriendsPage />
      },
      {
        path: "/friends-search",
        element: <FriendsSearchPage />
      },
      {
        path: "/photo",
        element: <Photo />
      },
      {
        path: "/photo/album/:id",
        element: <PhotoAlbumPage />
      },
      {
        path: "/photo/edit-album/:id",
        element: <PhotoAlbumEdit />
      },
    ]
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
    <Header />
    <RouterProvider router={router} />
  </Context.Provider>
);