import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function useCharacter(query) {
    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        setIsLoading(true)
        axios.get('https://rickandmortyapi.com/api/character?name=' + query, { signal })
            .then(({ data: { results } }) => setCharacters(results))
            .catch((err) => {
                if (err.name !== 'AbortError') toast.error(err.response.data.error)
            })
            .finally(() => setIsLoading(false))

        return () => {
            controller.abort()
        }
    }, [query])

    return { isLoading, characters }
}