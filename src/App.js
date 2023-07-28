import React, {useEffect, useState} from 'react'
//import './App.css';

const App = () => {
  const [city, setCity] = useState('')
  const [temp, setTemperature] = useState('')
  const [descr, setDescription] = useState('')
  const [wind, setWind] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [unit, setUnit] = useState('metric')

  
  
const fetchWeatherData = async () => {
  setLoading(true)
  setTemperature('')
  const endpoint=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50702cbb9c99a3aac713ff97a801c51b&units=${unit}`
  
  
  try {
    const res = await fetch( endpoint );
    const data = await res.json();
    const temp = data?.main?.temp
    const des = data?.weather[0].description
    const win = data?.wind?.speed
    const coun = data?.sys?.country
   setTimeout(() => {
    console.log(data)
    setTemperature(temp)
    setDescription(des)
     setWind(win)
     setCountry(coun)
     setLoading(false)
    }, 400);
  } catch (error) {
   //setError('An error Occurred')
   setLoading(false)
   
    if (!error) {
      setError(' ')
    } else {
      setError('An error Occurred')
      
    }
    
  }}

  useEffect ( () => {
    if(!city) return;
    fetchWeatherData()
  },[unit])


  return (
    <div className='container flex justify-center items-center flex-col ml-16 mt-10 h-[100vh]'> 
    

      <h1 className='text-5xl mt-8 text-blue-400'>Weather Forecast</h1>
      <label> Enter city:
        <input className='px-8 py-2 rounded-lg shadow-sm m-4 mt-8 bg-gray-200 shadow-blue-500'
         name='city' 
          placeholder='Please enter a city' 
        value={city}
        onChange={ (e) => {
         const key= (e.target.value) 
         setCity(key)
         
        }}
      />
      <select className='border-4 border-orange-200 '  value={unit} onChange={ (e) =>setUnit(e.target.value) }>
        <option value='standard'>Degree K</option>
        <option value='metric'>Degree C</option>
        <option value='imperial'>Degree F</option>
      </select>


      </label>
      <button onClick={fetchWeatherData } className='px-8 py-2 rounded-md bg-green-400'>
        Fetch Weather
      </button>
      {error && <p>{error}</p>}
    {loading && < img src= "https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif "/> }
      {temp && <div className='shadow-lg w-full flex justify-center items-center flex-col p-16'>
      <p className='text-lg font-semibold'>City: {city}</p>
      <p className='text-lg font-semibold'>Temperature:{temp}</p>
      <p className='text-lg font-semibold'>Weather Decription:{descr}.</p>
      <p className='text-lg font-semibold'>Wind Speed:{wind}.</p>
      <p className='text-lg font-semibold'>Country:{country}.</p>
     
    </div>}
    </div> 
  )



}
export default App