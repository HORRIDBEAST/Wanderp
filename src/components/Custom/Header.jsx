import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react";
  import { googleLogout } from '@react-oauth/google';
import { FaGoogle } from "react-icons/fa6";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { getDocs, collection } from "firebase/firestore";
import { db } from '@/Service/firebaseConfig'; // Your Firebase config
// import { Link } from 'react-router-dom';
const Header = () => {
  
    const [opendia, setOpendia] = useState(false);
    const [hasTrips, setHasTrips] = useState(false);
    const [userTrips, setUserTrips] = useState([]);
  const users = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (users) {
      checkUserTrips();
    }
  }, [users]);

  const checkUserTrips = async () => {
    const tripsRef = collection(db, 'AITRIPS');
    const querySnapshot = await getDocs(tripsRef);
    if (!querySnapshot.empty) {
      setHasTrips(true); // User has at least one trip
      // const tripDoc = querySnapshot.docs[0]; // Assuming the first trip (change logic as per your need)
      // setTripId(tripDoc.id);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (c) => {
      // console.log(c)
      Getuserprofile(c);
    },
    onError: (e) => console.log(e),
  });

  const Getuserprofile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'Application/json',
    }).then((resp) => {
      //console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpendia(false);
      window.location.reload();
    });
  };
  return (
    
        <div>
      <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <a href="/">
        <img src="/logo.png" alt="my logo" height={100} width={100} />
        </a>
        <div className=""></div>
        <div className='flex'>
          {users ? (
            <div className='flex'>
              { hasTrips && (<div className='flex'>
               
                <a href={`/track-budget/`}>

                <Button className="rounded-full mr-3">Budget Tracker</Button>
                
                </a>
                
              </div>
            )}
                <a href='/create-trip'>
                  <Button variant="destructive" className="mr-3 rounded-xl">Create Trip</Button>
                </a>
                <a href='/my-trips'>
                  <Button variant="destructive" className="mr-3 rounded-xl">My Trips</Button>
                </a>
             

              <Popover >
                <PopoverTrigger>
                  <img src={users?.picture} className='h-[35px] w-[35px] rounded-full bg-white' alt="user" />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
              </div>
            
          ) : (
            <Button onClick={() => setOpendia(true)} className="justify-end mr-10 rounded-full bg-yellow-300 text-black">Sign In</Button>
          )}
        </div>
      </div>

      <Dialog open={opendia} onOpenChange={setOpendia}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle><h1>Sign In with Google</h1></DialogTitle>
            <DialogDescription>
              You need to log in or sign up to generate a trip plan. Please log in to continue.
              <img src='' alt='' />
              <Button onClick={handleLogin} className="w-full mt-5">
                <FaGoogle className='h-7 w-7' />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export default Header