import { useState } from 'react'
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'
import Modal from './Modal'
import { Character } from './CharacterList'

function Navbar({ numOfResult, setQuery, query, favourites, onSelectCharacter, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <h3>LOGO 😍</h3>
      <input type="text" placeholder='Search ...' spellCheck='false' autoComplete='off' value={query} onInput={(e) => setQuery(e.target.value)} />
      <p>Found {numOfResult} characters</p>
      <button onClick={() => setIsOpen(true)}>
        <HeartIcon />
        <span>{favourites.length}</span>
      </button>

      <Modal open={isOpen} setIsOpen={setIsOpen} onSelectCharacter={onSelectCharacter} onDelete={onDelete}>
        {
          favourites.map((item) => {
            return <Character key={item.id} item={item} onSelectCharacter={() => { }}>
              <button onClick={() => onDelete(item.id)}>
                <TrashIcon />
              </button>
            </Character>
          })
        }
      </Modal>
    </header>
  )
}

export default Navbar
