
import LoadingFly from '../../Animation/loadingFly.json'
import Lottie from 'lottie-react'
import './LoadingDialog.scss'
import { memo } from 'react'

function LoadingDialog() {
    return (
        <div className='location locationDialog'>
            <Lottie
                animationData={LoadingFly}
                height={350}
                width={350}
            />
        </div>

    )
}

export default memo(LoadingDialog)