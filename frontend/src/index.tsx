import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Sign_up from './Pages/Sign_up';
import Log_in from './Pages/Log_in';
import Projects from './Pages/Projects';
import User_Profile from './Pages/Profile';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async function () {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch(`http://localhost:3075/auth/cwc/user`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // console.log("res: ", data)
          return data

        } catch (error) {
          return {};
        }

      } else {
        return {};
      } // end if
    },//end loader
    children: [
      {
        path: '/login',
        element: <Log_in />
      },
      {
        path: '/signup',
        element: <Sign_up />
      },
      {
        path: '/projects',
        element: <Projects />
      },
      {
        path: '/u/profile',
        element: <User_Profile />,
        loader: async function () {
          const token = localStorage.getItem('token');

          if (token) {
            try {
              const response = await fetch(`http://localhost:3075/auth/cwc/user`, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              const data = await response.json();
              // console.log("res: ", data)
              return data

            } catch (error) {
              // console.log("errror", error);
              // toast({
              //   title: 'An error occurred!',
              //   description: `You must be logged in to view this page.`,
              //   status: 'error',
              //   duration: 3000,
              //   isClosable: true,
              // })
              return window.location.href = '/login';
            }

          } else {
            // console.log("NO token!");
            // toast({
            //   title: 'An error occurred!',
            //   description: `You must be signed up to view this page.`,
            //   status: 'error',
            //   duration: 3000,
            //   isClosable: true,
            // })
            return window.location.href = '/signup';
          } // end if
        }//end loader
      },
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <ToastContainer /> 
    <RouterProvider router={router} />
  </>
);

