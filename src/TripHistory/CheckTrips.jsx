import { useEffect,useState } from "react"
import { useNavigation } from "react-router-dom"
import {collection,query,where,getDocs} from "firebase/firestore"
import {db} from "../Service/firebaseConfig"
import UsertripCard from "./Components/UsertripCard"
const CheckTrips = () => {
    const navigation=useNavigation()
    const [userTrips,setUserTrips]=useState([])

    useEffect(()=>{
        GetUserTrips();
    },[])
    const GetUserTrips=async ()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        console.log("the user is"+user)
        if(!user){
            navigation('/')
            return;
        }
        const q = query(collection(db, "AITRIPS"), where("userEmail", "==", user?.email));
      
        const querySnapshot = await getDocs(q);
        setUserTrips([])

        console.log("Query sanep"+querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
            setUserTrips(pV=>[...pV,doc.data()])
        });
    }
  return (
    <div className='px-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 justify-between text-start'><h2 className='font-bold text-3xl mb-10'>My Trips are :-</h2>
   <div className="w-10/12  mx-auto">
    <div className='grid grid-col-2 md:grid-cols-3 gap-5 mt-5 '>
        {userTrips.length>0 ? userTrips.map((trip,index)=>(
            <UsertripCard trip={trip} key={index}/>
        )) :
         [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
         ))
        }
    </div>
    </div>
    </div>
  )
}

export default CheckTrips