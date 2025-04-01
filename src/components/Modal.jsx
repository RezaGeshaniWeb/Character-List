import { XCircleIcon } from '@heroicons/react/24/outline'

function Modal({ children, setIsOpen, open }) {
    if (!open) return null

    return (
        <div className='modal-main'>
            <div onClick={() => setIsOpen(false)}></div>
            <div>
                <div>
                    <h2>List of Favourite</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <XCircleIcon />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
