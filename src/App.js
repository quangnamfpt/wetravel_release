import { Routes, Route, useNavigate } from 'react-router-dom'
import { Fragment, useState, memo, useEffect, createContext } from 'react';
import { publicRoute } from './routes'
import { DefaultLayout } from './components/Layout';
import { ToastContainer, Slide, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { ProSidebarProvider } from 'react-pro-sidebar'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'

export const LanguageShowing = createContext()

function App() {
  document.title = 'WeTravel'

  const navigate = useNavigate()

  const cokkieArr = document.cookie;
  const language = (cokkieArr.split("languageSelected=")[1] ? cokkieArr.split("languageSelected=")[1].split(';')[0] : 'EN')
  const email = cokkieArr.split("email=")[1] && cokkieArr.split("email=")[1].split(';')[0]
  const password = cokkieArr.split("password=")[1] && cokkieArr.split("password=")[1].split(';')[0]

  if (email && password) {
    //Tự động đăng nhập bằng cookie email và password bên trên
  }

  const [languageSelected, setLanguageSelected] = useState(language)
  const [progress, setProgress] = useState(100)

  // useEffect(() => {
  //   if (sessionStorage.getItem('email') === null && window.location.pathname !== '/' && window.location.pathname !== '/register' && window.location.pathname !== '/register-partner' && window.location.pathname !== '/checkmail'
  //     && window.location.pathname !== '/register-information-customer' && window.location.pathname !== '/register-information-partner' && window.location.pathname !== '/register-profile-partner'
  //     && window.location.pathname !== '/select-service') {
  //     navigate('/')
  //     toast.warning('Bạn chưa đăng nhập')
  //   }
  // })

  useEffect(() => {
    if ((sessionStorage.getItem('role') == 1 && !window.location.pathname.includes('/admin')) ||
      (sessionStorage.getItem('role') != 1 && window.location.pathname.includes('/admin')) ||
      (sessionStorage.getItem('role') == 3 && window.location.pathname.includes('/partner')) && window.location.pathname != ('/error')) {
      navigate('/error')
    }
  }, [window.location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    if (sessionStorage.getItem('role') == 1) {
      document.getElementById('fb-root').style.display = 'none'
      document.getElementById('fb-customer-chat').style.display = 'none'
    }
    else {
      document.getElementById('fb-root').style.display = 'block'
      document.getElementById('fb-customer-chat').style.display = 'block'
    }
  }, [sessionStorage.getItem('role')])

  return (
    <LanguageShowing.Provider value={languageSelected}>
      <ProSidebarProvider>
        <div className="App">
          <ToastContainer
            transition={Slide}
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <LoadingBar
            height={2}
            loaderSpeed={500}
            color='#4874E8'
            progress={progress}
          />
          <Routes>
            {publicRoute.map((route, index) => {
              let Layout = DefaultLayout;
              let image;
              let role;
              let changePassword = false;
              let SecondLayout;

              if (route.layout) { Layout = route.layout }
              else if (route.layout === null) { Layout = Fragment }

              if (route.image !== null) { image = route.image }

              if (route.role !== null) { role = route.role }

              if (route.changePassword) { changePassword = true }

              if (route.secondLayout) { SecondLayout = route.secondLayout }

              const Page = route.component
              return <Route key={index}
                path={route.path}
                element={<Layout setProgress={setProgress} changePassword={changePassword} languageSelected={languageSelected} setLanguageSelected={setLanguageSelected} image={image}>
                  {SecondLayout ? <SecondLayout setProgress={setProgress} languageSelected={languageSelected} role={role}>
                    <Page setProgress={setProgress} languageSelected={languageSelected} role={role} />
                  </SecondLayout> :
                    <Page setProgress={setProgress} languageSelected={languageSelected} role={role} />
                  }
                </Layout>} />
            })}
          </Routes>
        </div>
        <div id="fb-customer-chat" class="fb-customerchat"></div>
      </ProSidebarProvider>
    </LanguageShowing.Provider>
  );
}

export default memo(App);
