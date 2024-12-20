import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GenTrip from './Gen-trip/index.jsx'
import Header from './components/Custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from "@/components/ui/sonner"
import CheckTrips from './TripHistory/CheckTrips.jsx'
import See_my_Trips from './view-trip/[tripId]/index.jsx'
import Budget from './Budget-tracker/index.jsx/'
import { store } from './Budget-tracker/Redux/store.js';
import { Provider } from 'react-redux';
import TG from "./Budget-tracker/travelguru.jsx"
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/create-trip",
    element:<GenTrip/>
  },
  {
    path:"/see-trip/:tripId",
    element:<See_my_Trips/>
  },
  {
    path:"/my-trips",
    element:<CheckTrips/>
  },
  {
    path:"/track-budget/",
    element: <Budget/>

  },
  {
    path:"track-budget/travel-guru",
    element: <TG/>
    
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
