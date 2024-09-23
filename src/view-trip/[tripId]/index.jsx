import { getDoc,doc } from 'firebase/firestore'
import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/Service/firebaseConfig' 
import { useState } from 'react'
import Info_Sec from '../Components/Info'
import Hotels from '../Components/Hotels'
import VisitPlaces from '../Components/Places'
import {toast} from "sonner"
const See_my_Trips = () => {
    const {tripId}=useParams()
    const [trip,setTrip]=useState([])

    useEffect(()=>{
        tripId && getTripData();
    },[tripId])


    const getTripData=async()=>{
        const docRef=doc(db,'AITRIPS',tripId)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
             console.log("Document ",docSnap.data()); 
            setTrip(docSnap.data());     
          }
          else{
            console.log("Document Doesnt exists");
            toast("No Trip Found");
          }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'> 
<Info_Sec trip={trip}/>
<Hotels trip={trip}/>
<VisitPlaces   trip={trip}/>
    </div>
  )
}

export default See_my_Trips