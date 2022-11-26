import Header from '../Header'
import { memo } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import './HeaderOnly.scss'

function HeaderOnly({ languageSelected, setLanguageSelected, children, setProgress }) {
    return (

        <div className='layout-header-only'>

            <Header setLanguageSelected={setLanguageSelected} languageSelected={languageSelected} setProgress={setProgress} />
            {children}
        </div >
    )
}

export default memo(HeaderOnly)