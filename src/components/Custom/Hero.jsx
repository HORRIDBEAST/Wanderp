import { Button } from '../ui/button'
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 mx-auto mt-14 max-w-4xl'>
      <h1 className='font-extrabold text-[40px] text-center'>
        <span className='text-[#f56551]'>Your Dream Trip, Curated by AI:</span>
        <br />
        Discover and Experience Your Ideal Vacation
      </h1>
      <p className='text-xl text-center text-gray-600'>
        Your dedicated travel planner and curator, meticulously designing custom itineraries that perfectly align with your unique interests, preferences, and budget, ensuring every journey is unforgettable.
      </p>
      <Link to={"/create-trip"}>
      <Button className="rounded-full">Begin for Free</Button>
      </Link>
    </div>
  )
}

export default Hero
