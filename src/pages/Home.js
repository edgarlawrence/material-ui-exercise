import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, DialogTitle, TextField, Button} from '@mui/material';
import '../index.css'
import Navbar from '../components/Navbar';

function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [pokeCount, setPokeCount] = useState(0)
    const [pokeSearch, setPokeSearch] = useState('')
    const [pokeRes, setPokeRes] = useState({
        key: '',
        name: '',
        images: '',
        data: null
    })
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokeCount}&limit=52`)
        .then(res => {
          const fetches = res.data.results.map(p => axios.get(p.url))
    
          Promise.all(fetches).then(data => {
            setPokemon(data);
            console.log(data)
          })
        });
    }, []);
    
    const searchPokemon = async(e) => {
      e.preventDefault()
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}`)
      .then(res => {
          setLoading(true)
          setPokeRes({
            key: res.data.id,
            name: res.data.name,
            images: res.data.sprites.front_default,
            datas: res.data
          })
          console.log('poke res =====>',pokeRes)
          setLoading(false)
      })
    }
    
    const nextBtn = async() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokeCount}&limit=52`)
      .then(res => {
        setPokeCount(pokeCount + 1)
        const fetches = res.data.results.map(p => axios.get(p.url))
    
        Promise.all(fetches).then(data => {
          setPokemon(data);
          console.log(data)
        })
      });
    }
    
    const prevBtn = async() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokeCount}&limit=52`)
      .then(res => {
        setPokeCount(pokeCount - 1)
        const fetches = res.data.results.map(p => axios.get(p.url))
    
        Promise.all(fetches).then(data => {
          setPokemon(data);
          console.log(data)
        })
      });
    }

  return (
    <div className="Home">
      <Navbar />
      <DialogTitle sx={{ textAlign: 'center' }}>
        <h1>Poke Center</h1>
      </DialogTitle>
      <Box 
          component="div"
          sx={{ 
                display:'flex', 
                justifyContent: 'center' 
              }}
        >
            <form onSubmit={searchPokemon}>
                  <TextField 
                        label="Find Your Pokemon" 
                        variant="standard" 
                        onChange={(e) => setPokeSearch(e.target.value)}
                    />
                  <Button 
                      sx={{ mt: 2, ml: 2, height: 35 }}
                      variant="contained"
                      type='submit'
                  > 
                      Search 
                  </Button>
              </form>
      </Box>
    
        <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
            >
            { loading ? (
                    <p> In Progress </p>
                ) : (
                <div className='poke-result'>
                    <div 
                        className='poke-card'
                        key={pokeRes.key}    
                    >
                         <Link
                             to={`/${pokeRes.key}`} 
                             className='poke-card'
                             state={{
                               dataParams: pokeRes.datas
                              }}
                          >
                            <div className='poke-img'>
                              <img src={pokeRes.images} alt={pokeRes.images} />
                            </div>
                            <div className='poke-name'>
                              <h1> {pokeRes.name} </h1>
                            </div>
                        </Link>
                    </div>
                </div>
                )}
        </Box>
        <div className="cards-deck"  display="flex">
              {pokemon.map((p) => (
                <Card sx={{ maxWidth: 200, m: 2 }}>
                  <Link 
                    to={`/${p.data.id}`} 
                    className='poke-card' 
                    state={{
                      dataParams: p.data
                     }}
                    >
                        <CardActionArea key={p.data.id}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={p.data.sprites.front_default}
                                alt={p.data.sprites.front_default}
                            />
                                <CardContent>
                                    <Typography 
                                        gutterBottom 
                                        variant="h5" 
                                        component="div"
                                        sx={{ textAlign: 'center' }}
                                    >
                                    {p.data.name}
                                    </Typography>
                                </CardContent>
                        </CardActionArea>
                  </Link>
                </Card>
              ))}
        </div>
      <Box 
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between', width: 800, mx: 'auto', mt: 10 }}
       >
            <Button
                variant='contained'
                onClick={prevBtn}
                disabled={pokeCount === 0}
            > previous </Button>
            <Button
                variant='contained'
                onClick={nextBtn}
            > next </Button>
            </Box>
    </div>
  )
}

export default Home