import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

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
    <Box
      key={{pokemonId}}
      component="div"
      sx={{ textAlign: 'center' }}
      className="Details"
      >
        <Box
          component='div'
          sx={{ display: 'block'}}
          className="poke-title"
          >
            <h1> Pokemon Details </h1>
          </Box>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'center', p: 10 }} 
          className="poke-details"
        >
            <Box 
                component="div"
                sx={{ display: 'inline-flex', width: 500 }}
                className='poke-images'
             >
               <img 
                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${locationState.dataParams.id}.png`} 
                 alt={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`}
               />
               <img 
                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`} 
                 alt={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${locationState.dataParams.id}.png`} 
               />
            </Box>
            <Box
              component="div"
              sx={{ textAlign: 'left' }}
              className='poke-info'  
            >
                <h1 className='text-2xl py-2'> Name: {locationState.dataParams.name} </h1>
                <h1 className='text-2xl py-2'> Height: {locationState.dataParams.height} </h1>
                <h1 className='text-2xl py-2'> Weight: {locationState.dataParams.weight} </h1>
            </Box>
        </Box>
    </Box>
  )
}

export default Details