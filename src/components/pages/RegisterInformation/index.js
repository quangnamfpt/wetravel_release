import { useState, useCallback, memo } from 'react'
import RegisterPassword from '../RegisterPassword'
import RegisterProfile from '../RegisterProfile'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

function RegisterInformation({ languageSelected, role, setProgress }) {
    const [nextScreen, setNextScreen] = useState(false)
    const [passwordMain, setPasswordMain] = useState('')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const tokenSaved = localStorage.getItem('tokenRegister')

    if (token === null || token !== tokenSaved) {
        toast.error(languageSelected === 'EN' ? 'Request is invalid' : 'Yêu cầu không hợp lệ')
    }

    const handleNextScreen = () => {
        setNextScreen(true)
    }

    return (
        <>
            {token === null || token !== tokenSaved ?
                <Navigate to='/' />
                :
                <>
                    {nextScreen ? <RegisterProfile token={token} setProgress={setProgress} role={role} languageSelected={languageSelected} passwordMain={passwordMain} /> :
                        <RegisterPassword token={token} languageSelected={languageSelected} handleNextScreen={handleNextScreen} role={role} setPasswordMain={setPasswordMain} />}
                </>
            }
        </>)
}

export default memo(RegisterInformation)