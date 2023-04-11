import {useState, useEffect} from "react";
import axios from "axios";


const Character = () => {
    const [characters, setCharacters] = useState([])
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState('10')
    const [offset, setOffset] = useState('0')
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    const handleListClick = (character)=>{
        const faves = JSON.parse(localStorage.getItem('favorites')) || []
        faves.push(character)
        setFavorites(faves)
        localStorage.setItem('favorites', JSON.stringify(faves))
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        try{
            axios.get('http://localhost:3001/characters.json', {
                params: { search: search, limit: limit, offset: offset }
            }).then((response)=> {
                setCharacters(response.data);
            })
        }catch (error){
            console.log('fuck')
            setCharacters([])
            console.log(error)
        }
    }
    const characterList = characters.map((character, key)=>{
        return <li key={key} onClick={ e => handleListClick(character) } style={{cursor: "pointer"}}>{character['name']}</li>
    })

    const favoritesList = favorites.map((favorite, key)=>{
        return <li key={key} style={{cursor: "pointer"}}>{favorite['name']}</li>
    })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="search" name="search"onChange={(e) => setSearch(e.target.value)} placeholder="Search Term"/>
                <input type="text" id="limit" name="limit"onChange={(e)=> setLimit(e.target.value)} placeholder="limit"/>
                <input type="text" id="offset" name="offset"onChange={(e)=> setOffset(e.target.value)} placeholder="offset"/>
                <button type="submit">Search</button>
            </form>
            <h3>Characters</h3>
            <ul style={{width: '100px'}}>{characterList}</ul>
            <h3>Faves</h3>
            <ul style={{width: '100px'}}>{favoritesList}</ul>

        </div>

    );
}

export default Character



