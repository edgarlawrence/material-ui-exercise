import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

function Details() {
    const { pokemonId } = useParams()
  
    const location = useLocation()
    const [locationState, setLocationState] = useState({
      dataParams: {}
    })
  
    useEffect(() => {
      console.log('propsss', location)
      if(location.state) {
          const states = location.state
          setLocationState(states)
      }
    }, [location])

  return (
    <div className='Details bg-blue-300'>
        <h1 className='text-5xl font-bold text-center p-20'> Details </h1>
          <div key={{pokemonId}} className='poke-details flex justify-center'>
              <div className='poke-details-img flex'>
                  <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${locationState.dataParams.id}.png`} 
                    alt={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`}
                    className='w-56' 
                  />
                  <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`} 
                    alt={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`} 
                    className='w-56' 
                  />
              </div>
                 <div className='poke-info'>
                     <h1 className='text-2xl py-2'> Name: {locationState.dataParams.name} </h1>
                     <h1 className='text-2xl py-2'> Height: {locationState.dataParams.height} </h1>
                     <h1 className='text-2xl py-2'> Weight: {locationState.dataParams.weight} </h1>
                 </div>
          </div>
    </div>
  )
}

export default Details