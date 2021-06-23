import React, { useState, useEffect } from "react";
import Folder from "./components/Folder";
import File from "./components/File";

import axios from "axios";

const App = () => {
    const [folders, setFolders] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/filesystem")
            .then(({ data }) => setFolders(data?.children));
    }, []);

    const handleEnterClick = () => {
        setShowModal((prev) => !prev);
    };

    const handleSubmitModal = () => {
        setShowModal(false);
    };

    return (
        <div className='app'>
            {showModal && (
                <div className={"modal__wrapper"} onClick={handleEnterClick}>
                    <div
                        className={"modal"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form className={"modal__inner"}>
                            <input
                                type={"text"}
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder={"Введите логин"}
                                className={"modal__input"}
                            />
                            <input
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={"Введите пароль"}
                                className={"modal__input"}
                            />
                            <input
                                type='button'
                                value={"Войти"}
                                className={"modal__button"}
                                onClick={handleSubmitModal}
                            />
                        </form>
                    </div>
                </div>
            )}
            <header className='header'>
                <h1 className='header__text'>Test for D-Habits</h1>
                <button className='header__button' onClick={handleEnterClick}>
                    Войти
                </button>
            </header>
            <main className='main'>
                {!!folders.length &&
                    folders.map((item, index) => {
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
