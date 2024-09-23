import { useState ,useEffect} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions,SelectTravelGroupOptions } from "@/Constants/options";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from "sonner"
import { FaGoogle } from "react-icons/fa6";
import { Dialog,DialogContent, DialogDescription,DialogHeader,DialogTitle,} from '../components/ui/dialog'
import { useGoogleLogin } from '@react-oauth/google';
import { db } from "@/Service/firebaseConfig";
import { AiOutlineLoading } from "react-icons/ai";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AI_PROMPT } from "@/Constants/options";
import { chatSession } from "@/Service/aiCode";
import { setDoc ,doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function GenTrip() {
  const [place,setPlace]=useState('')
  const [formData,setFormData]=useState([])
  const [loading, setLoading]=useState()
  const [opendia,setOpendia]=useState(false) 

    const router=useNavigate()

const handleinputChange=(name, value)=>{
  setFormData({
    ...formData,
    [name]: value,
  });
}
  useEffect(()=>{
     console.log(formData);
  },[formData])


  const handleLogin=useGoogleLogin({
    onSuccess:(c)=>{
      console.log(c)
       Getuserprofile(c);
    },
    onError:(e)=>console.log(e)
    })
    const Getuserprofile=(tokenInfo)=>{
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
        }
      ).then((resp)=>{
    //console.log(resp);
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpendia(false);
    onGenTrip()
      })
    }

    const saveAItrip=async(tData)=>{

      // Add a new document in collection "cities"
      setLoading(true)
      const user=JSON.parse(localStorage.getItem("user"))
      const docId=Date.now().toString()
  await setDoc(doc(db, "AITRIPS", docId), {
   userSelection:formData,
   tripData:JSON.parse(tData),
   userEmail:user?.email,
   id:docId
  });
  setLoading(false)
 router("/see-trip/"+docId)
  }


const onGenTrip=async()=>{
  const user=localStorage.getItem('user');
  if(!user){
    setOpendia(true);
    return;
  }
  const {location , no_of_days, start_date, end_date , people , budget}=formData
  if(!location || !no_of_days || !start_date || !end_date || !people || !budget) {
    toast("Please enter the missing data")
    return;  
  }
  if(formData?.no_of_days<3){
    toast("Please enter atleast 2 days trip");
    return;
  }
  if (start_date && end_date) {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const dateDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
console.log(dateDifference)
    if (dateDifference !== parseInt(no_of_days)) {
      toast("The number of days does not match the selected dates");
      return;
    }
  } else {
    toast("Please select both start and end dates");
    return;
  }
  setLoading(true)
  const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location)
    .replace('{totalDays}', formData?.no_of_days)
    .replace('{traveler}', formData?.people)
    .replace('{start_date}', formData?.start_date)
    .replace('{end_date}', formData?.end_date)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.no_of_days)

    const result=await chatSession.sendMessage(FINAL_PROMPT);
    //console.log();
    setLoading(false);
    saveAItrip(result?.response?.text())
}

  return (

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-62 mt-10 justify-between text-start'>
            <Toaster position="top-center" reverseOrder={false} />
            <h2 className='font-bold text-3xl'>Please provide details about your dream travel preferences 🌍✈️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Please fill out the details below to help our <b className='text-purple-600 text-2xl underline'>Trip Guru</b> create your perfect trip plan
      </p>
      <div>
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Your Dream Destination?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,

            onChange: (v) => {
              // console.log("Selected Place is ",v);
               setPlace(v) ;
               handleinputChange('location',v.label)
          }}}
        />
      </div>
      <div className='mt-10 mb-5 flex items-center space-x-4'>
  <h2 className='text-xl font-medium'>Trip Duration</h2>
  <Input 
    type='number' 
    min="2" 
    placeholder='Eg: 3 days' 
     onChange={(e) => handleinputChange("no_of_days", e.target.value)} 
    className='w-24'
  />
    <h2 className='text-xl font-medium'>Select Dates</h2>
  <Input 
    type='date' 
     onChange={(e) => handleinputChange("start_date", e.target.value)} 
    className='w-40'
  />
  <p className="font-bold">to</p>
  <Input 
    type='date' 
     onChange={(e) => handleinputChange("end_date", e.target.value)} 
    className='w-40'
  />
  </div>


  <div>
        <h2 className='mt-5 text-xl my-3 font-medium'>What is your budget?</h2>
         <div className='grid grid-cols-4 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div
            key={index}
             onClick={() => handleinputChange('budget', item.title)} 
            className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg${formData?.budget === item.title ? 'shadow-lg border-violet-500' : ''}`}
          >
            <div className='flex'>
              <h2 className='text-4xl'>{item.icon}</h2>
              {item.discount && <h2>Discount: {item.discount}</h2>}
            </div>
            <h2 className='text-xl font-semibold'>{item.title}</h2>
            <h2 className='text-gray-600'>{item.desc}</h2>
          </div>
          
          ))}
         </div>
      </div>

      <div>
        <h2 className='mt-5 text-xl my-3 font-medium'>Whom are you travelling with ?</h2>
         <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelGroupOptions.map((item,index)=>(
              <div
              key={index}
               onClick={() => handleinputChange('people', item.title)} 
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg  ${formData?.people === item.title ? 'shadow-lg border-yellow-500' : ''}`}
            >
              <div className='flex'>
                <h2 className='text-4xl'>{item.icon}</h2>
                {item.discount && <h2>Discount: {item.discount}</h2>}
              </div>
              <h2 className='text-xl font-semibold'>{item.title}</h2>
              <h2 className='text-gray-600'>{item.desc}</h2>
            </div>
            
          ))}
         </div>
      </div>

      </div>


      <div className="mt-15">
      <Button className="my-10 flex justify-end" onClick={onGenTrip} disabled={loading}>
      {
        loading?<AiOutlineLoading className='h-7 w-7 animate-spin' />:('Generate Trip')
      }  </Button>
        
      </div>
      <Dialog open={opendia} onOpenChange={setOpendia}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle><h1>Sign In with Google</h1></DialogTitle>
      <DialogDescription>
      You need to log in or sign up to generate a trip plan. Please log in to continue.
      <img src=''></img>
     
      <Button onClick={handleLogin} className="w-full mt-5"><FaGoogle className='h-7 w-7'/> 
      </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      </div>
  )
}

export default GenTrip