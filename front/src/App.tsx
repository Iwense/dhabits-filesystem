import React, { useState, useEffect, useCallback } from "react";
import Folder from "./components/Folder";
import File from "./components/File";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import Alert, { IAlertItem } from "./components/Alert";
import cookie from "./services/cookieService";

import { useDispatch, useSelector } from "react-redux";
import { getRootFolder } from "./app/features/filesystem/filesystem.js";
import { getUser, getUserError, logout } from "./app/features/auth/auth.js";
import { getRoot } from "./app/features/filesystem/filesystemAsync";
import { signUp, userLogin, userLogout } from "./app/features/auth/authAsync";

export interface ISubmitObject {
    username: string;
    password: string;
}

const alertsList: Array<IAlertItem> = [];

const App = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const userAccessToken = cookie.get("accessToken");
    const folders = useSelector(getRootFolder);
    const user = useSelector(getUser) || cookie.get("username");
    const error = useSelector(getUserError);
    const dispatch = useDispatch();

    const fetch = useCallback(() => {
        dispatch(getRoot());
    }, [dispatch]);

    useEffect(() => {
        if (!folders.length) {
            fetch();
        }
    }, [folders, fetch]);

    const handleEnterClick = () => {
        setShowModal((prev) => !prev);
    };

    const handleEnterSignUpClick = () => {
        setShowSignUpModal((prev) => !prev);
    };

    const handleSubmitLoginModal = ({ username, password }: ISubmitObject) => {
        setShowModal(false);
        dispatch(userLogin({ username, password }));
        error &&
            alertsList.push({
                status: "error",
                text: error,
            });
    };

    useEffect(() => {
        if (!alert) return;
        const alertShowTime = setTimeout(() => {
            setAlert(false);
            alertsList.shift();
        }, 4000);
    }, [alert, alertsList.length]);

    const handleSubmitSignUpModal = ({ username, password }: ISubmitObject) => {
        setShowSignUpModal(false);
        dispatch(signUp({ username, password }));

        alertsList.push({
            status: "ok",
            text: `Пользователь ${username} успешно создан!`,
        });
        setAlert(true);
    };

    const handleSwitchModal = () => {
        setShowModal(false);
        setShowSignUpModal(true);
    };

    const handleExitClick = () => {
        cookie.remove("accessToken");
        cookie.remove("refreshToken");
        cookie.remove("username");
        dispatch(logout());
    };

    return (
        <div className='app'>
            {alert && <Alert list={alertsList} />}
            {showModal && (
                <SignInModal
                    onEnterClick={handleEnterClick}
                    onSubmit={(user: ISubmitObject) =>
                        handleSubmitLoginModal(user)
                    }
                    onModalLinkClick={handleSwitchModal}
                />
            )}
            {showSignUpModal && (
                <SignUpModal
                    onEnterClick={handleEnterSignUpClick}
                    onSubmit={(user: ISubmitObject) =>
                        handleSubmitSignUpModal(user)
                    }
                />
            )}
            <header className='header'>
                <h1 className='header__text'>Test for D-Habits</h1>
                {user && userAccessToken && (
                    <div className={"header__user"} onClick={handleExitClick}>
                        <h3>{user}</h3>
                    </div>
                )}
                {!user && !userAccessToken && (
                    <button
                        className='header__button'
                        onClick={handleEnterClick}
                    >
                        Войти
                    </button>
                )}
            </header>
            {userAccessToken && (
                <nav className='sidebar'>
                    {!!folders.length &&
                        folders.map((item: any, index: number) => {
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
                </nav>
            )}

            {!userAccessToken && (
                <section className={"main"}>
                    <h3>
                        Вы не вошли в систему, чтобы увидеть файловую структуру
                        войдите в свой профиль
                    </h3>
                    <p>Тестовый пользователь test / test</p>
                </section>
            )}
        </div>
    );
};

export default App;
