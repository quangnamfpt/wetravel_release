
import BackgroundSimple from '../../Animation/backgroundSimple.json'
import Lottie from 'lottie-react'
import './BackgroundAnimater.scss'

function BackgroundAnimater() {
    return (

            <Lottie
                autoPlay={true}
                loop={false}
                animationData={BackgroundSimple}
                className='animater-full'
            />

    )
}

export default BackgroundAnimater;