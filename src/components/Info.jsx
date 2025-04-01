import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import myPicture from '../assets/me5.webp'
import { MdEmail } from 'react-icons/md'

export default function Info() {
    return (
        <div className="fixed-info">
            <div className="circle">
                <img src={myPicture} alt="myPicture" />
            </div>
            <strong>Frontend Developer</strong>
            <a href="https://www.linkedin.com/in/reza-geshani-web">
                <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/rezageshani_web">
                <FaInstagram />
            </a>
            <a href="https://github.com/RezaGeshaniWeb/">
                <FaGithub />
            </a>
            <a href="mailto:rezageshaniweb@gmail.com">
                <MdEmail />
            </a>
        </div>
    )
}