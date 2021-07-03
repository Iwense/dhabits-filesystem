import React, { useState, useEffect, useCallback } from "react";
import Folder from "./components/Folder";
import File from "./components/File";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import Alert, { IAlertItem } from "./components/Alert";
import cookie from "./services/cookieService";

import { useDispatch, useSelector } from "react-redux";
import { getRootFolder } from "./app/features/filesystem/filesystem.js";
// import { getUser } from "./app/features/auth/auth.js";
import { getRoot } from "./app/features/filesystem/filesystemAsync";
import { signUp, userLogin } from "./app/features/auth/authAsync";



export interface ISubmitObject { 
    login: string;
    password:string;
}

const alertsList:Array<IAlertItem> = [{
    status:'ok',
    text:'asd',
}]

const App = () => {
    // const [folders, setFolders] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSignUpModal, setShowSignUpModal ] = useState<boolean>(false)
    const folders = useSelector(getRootFolder)
    // const user =useSelector(getUser) 
    const user = 'me'
    const dispatch = useDispatch()
    const userAccessToken = cookie.get('accessToken')
    const [alert, setAlert] = useState<boolean>(false)

    console.log("alertsList" , alertsList)

    const fetch = useCallback(()=> {
        dispatch(getRoot())
    }, [dispatch])

    useEffect(()=> {
        // TODO : remove this 
        cookie.set('accessToken', 'asdasdasd')
        if(!folders.length) {
            fetch()
        }
    }, [folders, fetch])

    const handleEnterClick = () => {
        setShowModal((prev) => !prev);
    };

    const handleEnterSignUpClick =()=> {
        setShowSignUpModal(prev => !prev)
    }

    const handleSubmitLoginModal = ({login, password}: ISubmitObject) => {
        setShowModal(false);
        //TODO : Check how to give throw parameters
        dispatch(userLogin())
        console.log('Login: ', login)
        console.log('password', password)
    };

    useEffect(() => {
        if(!alert) return 
        const alertShowTime = setTimeout(() => {
            setAlert(false)
            alertsList.shift()
        }, 4000)
    }, [alert, alertsList.length])

    const handleSubmitSignUpModal = ({login, password}: ISubmitObject) => {
        // setShowSignUpModal(false);
        //TODO
        // dispatch(signUp())
        console.log('Login: ', login)
        console.log('password', password)
        alertsList.push({ 
            status: 'ok',
            text: `Пользователь ${login} успешно создан!`}
        )
        setAlert(true)
    };


    const handleSwitchModal = () => {
        setShowModal(false);
        setShowSignUpModal(true)
    };
    
    return (
        <div className='app'>
            {alert && <Alert list={alertsList}/>}
            {showModal && (
               <SignInModal onEnterClick={handleEnterClick} onSubmit={(user:ISubmitObject) => handleSubmitLoginModal(user)} onModalLinkClick={handleSwitchModal}/>
            )}
            {showSignUpModal && (
                <SignUpModal onEnterClick={handleEnterSignUpClick}  onSubmit={(user:ISubmitObject) => handleSubmitSignUpModal(user)}/>
            )}
            <header className='header'>
                <h1 className='header__text'>Test for D-Habits</h1>
                {user && userAccessToken && (
                    <div>
                        <h3>{user}</h3>
                    </div>
                )}
                 <button className='header__button' onClick={handleEnterClick}>
                     Войти
                    </button>
                {!user && !userAccessToken && (
                    <button className='header__button' onClick={handleEnterClick}>
                     Войти
                    </button>
                )}
                
            </header>
            {userAccessToken && (
                 <main className='main'>
                 {!!folders.length &&
                     folders.map((item:any, index:number) => {
                         if (item.hasOwnProperty("children")) {
                             return (
                                 <Folder
                                     key={`Folders-${item?.id} - ${index}`}
                                     title={item?.title}
                                     id={item?.id}
                                 />
                             );
                         }
                         return (
                             <File
                                 key={`file-${item?.id} - ${index}`}
                                 title={item?.title}
                             />
                         );
                     })}
                </main>
            )}

            {!userAccessToken && (
                 <section className={"extract"}>
                    <h3>ВЫ не вошли в систему, чтобы увидеть файловую структуру войдите в свой профиль</h3>
                </section>
            )}
           
            <section className={"extract"}>
                {/* <h3>Extract webpack config functional : </h3>
                <div>
                    <p>git version  - {__VERSION__} </p>
                </div>
                <div>
                    <p>commit hash  -  {COMMITHASH} </p>
                </div>
                <div>
                    <p>git branch  -   {BRANCH} </p>
                </div> */}
            </section>
        </div>
    );
};

export default App;
