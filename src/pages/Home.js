import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, DialogTitle, TextField, Button, ButtonGroup} from '@mui/material';
import '../index.css'
function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [pokeCount, setPokeCount] = useState(0)
    const [pokeSearch, setPokeSearch] = useState('')
    const [pokeRes, setPokeRes] = useState({
        name: '',
        images: ''
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
            name: res.data.name,
            images: res.data.sprites.front_default
          })
          console.log(pokeRes)
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
      <DialogTitle sx={{ textAlign: 'center' }}>
        <h1>Poke Center</h1>
      </DialogTitle>
      <Box 
          component="div"
          sx={{ display:'flex', justifyContent: 'center' }}
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
            {loading ? (
                    <p> In Progress </p>
                ) : (
                <div className='poke-result'>
                        <Card 
                            variant='success'
                            key={pokeRes.id}
                            sx={{ maxWidth: 200, m: 5 }}
                        >
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={pokeRes.images}
                            alt={pokeRes.images}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                            {pokeRes.name}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                        </Card>
                </div>
                )}
        </Box>
        <div className="cards-deck"  display="flex">
              {pokemon.map((p) => (
                <Card sx={{ maxWidth: 200, m: 2 }}>
                  <Link 
                    to={`/${p.data.id}`} 
                    className='poke-card' key={p.data.id}
                    state={{
                      dataParams: p.data
                     }}
                    >
                        <CardActionArea>
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