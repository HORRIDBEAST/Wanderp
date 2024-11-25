import Hero from "./components/Custom/Hero"


function App() {
console.log("HI");
  return (
    <>
     <div       className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
 style={{ backgroundImage: `url('/bg.jpg')` }}>
      <Hero/>
      
 </div>
    </>
  )
}

export default App
