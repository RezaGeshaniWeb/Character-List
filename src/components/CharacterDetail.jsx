import { useEffect, useState } from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Loader from './Loader'
import toast from 'react-hot-toast'

function CharacterDetail({ selectedId, onAddFavourite, isAddedToFavourite }) {
  const [singleCharacter, setSingleCharacter] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [episodes, setEpisods] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setSingleCharacter(null)
    axios.get('https://rickandmortyapi.com/api/character/' + selectedId)
      .then(({ data }) => {
        setSingleCharacter(data)
        const episodsId = data.episode.map(e => e.split("/").at(-1))

        axios.get('https://rickandmortyapi.com/api/episode/' + episodsId)
          .then(val => setEpisods([val.data].flat()))
      })
      .catch(err => toast.error(err.response.data.error))
      .finally(() => setIsLoading(false))
  }, [selectedId])

  return (
    singleCharacter ? (
      <div style={{ flex: 1 }}>
        <CharacterInfo singleCharacter={singleCharacter} onAddFavourite={onAddFavourite} isAddedToFavourite={isAddedToFavourite} />

        <EpisodList episodes={episodes} />
      </div>
    ) : (
      isLoading ? <Loader /> : ''
    )
  )
}

export default CharacterDetail


function CharacterInfo({ singleCharacter, onAddFavourite, isAddedToFavourite }) {
  return (
    <div>
      <img src={singleCharacter.image} alt={singleCharacter.name} />
      <div>
        <h3>
          <span>{singleCharacter.gender === 'Male' ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
          <span> {singleCharacter.name}</span>
        </h3>
        <div>
          <span className={`${singleCharacter.status === 'Dead' ? 'red' : ''}`}></span>
          <span> {singleCharacter.status}</span>
          <span> - {singleCharacter.species}</span>
        </div>
        <div>
          <p>Last known location :</p>
          <p>{singleCharacter.location.name}</p>
        </div>
        <div>
          <button onClick={() => onAddFavourite(singleCharacter)}>
            {isAddedToFavourite ? 'Already Added To Favourites ✅' : 'Add to Favourite'}
          </button>
        </div>
      </div>
    </div>
  )
}

function EpisodList({ episodes }) {
  const [sortBy, setSortBy] = useState(true)

  let sortedEpisodes;

  if (sortBy) sortedEpisodes = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created))
  else sortedEpisodes = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created))

  return (
    <div>
      <div>
        <h2>List of Episodes : </h2>
        <button onClick={() => setSortBy(prev => !prev)}>
          <ArrowUpCircleIcon style={{ transform: sortBy ? 'rotate(0)' : 'rotate(180deg)' }} />
        </button>
      </div>
      <ul>
        {
          sortedEpisodes.map((item, index) => {
            return <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, '0')} &nbsp;{item.episode} : <strong>{item.name}</strong>
              </div>
              <div className='badge'>
                {item.air_date}
              </div>
            </li>
          })
        }
      </ul>
    </div>
  )
}