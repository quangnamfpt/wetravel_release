import Header from "../Header";
import Footer from "../Footer";
import './DefaultLayout.css'

function DefaultLayout({ languageSelected, setLanguageSelected, children, setProgress }) {
    return (
        <div className="layout">

            <Header setLanguageSelected={setLanguageSelected} languageSelected={languageSelected} setProgress={setProgress} />
            <div className="content">
                {children}
            </div>
            <Footer languageSelected={languageSelected} setProgress={setProgress} />
        </div>
    )
}

export default DefaultLayout;