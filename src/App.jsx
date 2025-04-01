import { useState } from 'react'
import Navbar from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import { Toaster } from 'react-hot-toast'
import useCharacter from './hooks/useCharacter'
import useLocalStorage from './hooks/useLocalStorage'
import Info from './components/Info'

function App() {
    const [query, setQuery] = useState('')
    const { isLoading, characters } = useCharacter(query)
    const [selectedId, setSelectedId] = useState(1)
    const [favourites, setFavourites] = useLocalStorage("FAVOURITES", [])

    const handleSelectCharacter = id => setSelectedId(id)

    const handleAddFavourite = character => {
        if (favourites.includes(character)) return null
        else setFavourites(prev => [...prev, character])
    }

    const handleDeleteFavourite = id => {
        setFavourites(favourites.filter(f => f.id != id))
    }

    const isAddedToFavourite = favourites.some(fav => fav.id === selectedId)

    return (
        <main>
            <Toaster />
            <Navbar numOfResult={characters.length} setQuery={setQuery} query={query} favourites={favourites} onDelete={handleDeleteFavourite} />
            <section>
                <CharacterList characters={characters} isLoading={isLoading} onSelectCharacter={handleSelectCharacter} selectedId={selectedId} />
                <CharacterDetail selectedId={selectedId} onAddFavourite={handleAddFavourite} isAddedToFavourite={isAddedToFavourite} />
            </section>
            <Info />
        </main>
    )
}

export default App