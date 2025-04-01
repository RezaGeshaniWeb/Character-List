import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Loader from './Loader'

function CharacterList({ characters, isLoading, onSelectCharacter, selectedId }) {
    return (
        <div>
            {
                isLoading ? <Loader /> :
                    characters.map((item) => {
                        return <Character key={item.id} item={item} onSelectCharacter={onSelectCharacter} selectedId={selectedId}>
                            <button>
                                {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </Character>
                    })
            }
        </div>
    )
}

export default CharacterList


export function Character({ item, onSelectCharacter, children }) {
    return <div onClick={() => onSelectCharacter(item.id)}>
        <img src={item.image} alt={item.name} />
        <h3>
            <span>{item.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
            <span> {item.name}</span>
        </h3>
        <div>
            <span className={`${item.status === 'Dead' ? 'red' : ''}`}></span>
            <span> {item.status}</span>
            <span> - {item.species}</span>
        </div>
        {children}
    </div>
}