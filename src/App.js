import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
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
import { API_LOGIN } from './components/API';

export const LanguageShowing = createContext()

function App() {
  document.title = 'WeTravel'

  const navigate = useNavigate()

  const cokkieArr = document.cookie;
  const language = cokkieArr.split("languageSelected=")[1] ? cokkieArr.split("languageSelected=")[1].split(';')[0] : 'EN'
  const email = cokkieArr.split("email=")[1] && cokkieArr.split("email=")[1].split(';')[0]
  const password = cokkieArr.split("password=")[1] && cokkieArr.split("password=")[1].split(';')[0]

  const handleClickLogin = () => {
    //create data to request server
    let account = {
      email: email,
      password: password
    }

    //call api from server
    axios.post(API_LOGIN, account)
      .then((res) => {
        sessionStorage.setItem('email', email);
        const account = res.data.data
        sessionStorage.setItem('id', account.information.accountId)

        if (account.information.roleId) {
          if (account.information.isBlock) {
            toast.error(language === 'EN' ? 'This account has been locked' : 'Tài khoản này đã bị khoá')
          }
          else {
            if (account.information.roleId > 1) {
              sessionStorage.setItem('role', account.information.roleId)
              sessionStorage.setItem('firstName', account.information.firstName)
              sessionStorage.setItem('lastName', account.information.lastName)

              sessionStorage.setItem('gender', account.information.gender)
              sessionStorage.setItem('birthdate', account.information.birthDate)
              sessionStorage.setItem('phone', account.information.phone)
            }
            if (account.information.roleId === 3) {
              sessionStorage.setItem('rankPoint', account.information.rankPoint)

            } else if (account.information.roleId === 2) {
              sessionStorage.setItem('index-service-selected', account.information.serviceCategory)
              sessionStorage.setItem('partnerEmail', account.information.emailContactCompany)

            }
            toast.success(language === 'EN' ? 'Login success' : 'Đăng nhập thành công')
          }
          navigate('/')
        }
        else {
          sessionStorage.setItem('role', 1)
          toast.success(language === 'EN' ? 'Login success' : 'Đăng nhập thành công')
          navigate('/admin/dashboard')
        }

        setProgress(100)
      })
      .catch(() => {
        toast.error(language === 'EN' ? 'Incorrect account' : 'Tài khoản không chính xác')
        document.cookie = `email=`;
        document.cookie = `password=`;
      })
  }

  if (email && password && sessionStorage.getItem('role') === null) {
    //Tự động đăng nhập bằng cookie email và password bên trên
    handleClickLogin()
  }

  const [languageSelected, setLanguageSelected] = useState(language)
  const [progress, setProgress] = useState(100)

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
        <div className="fade-in App">
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
            onLoaderFinished={() => setProgress(0)}
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
              let needLogin
              let path

              path = route.path

              if (route.layout) { Layout = route.layout }
              else if (route.layout === null) { Layout = Fragment }

              if (route.image !== null) { image = route.image }

              if (route.role !== null) { role = route.role }

              if (route.changePassword) { changePassword = true }

              if (route.secondLayout) { SecondLayout = route.secondLayout }

              needLogin = route.needLogin

              if (path === window.location.pathname && needLogin && sessionStorage.getItem('id') === null) {
                toast.warning(language === 'EN' ? 'You are not logged in' : 'Bạn chưa đăng nhập')
                return <Route key={index}
                  path={route.path} element={<Navigate to={'/'} />} />
              }

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
    </LanguageShowing.Provider >
  );
}

export default memo(App);
