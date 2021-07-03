import React, {useState} from "react";
import { ISubmitObject } from "../App";


interface IProps{
    onEnterClick: () => void;
    onSubmit: (value?:ISubmitObject) => void;
}

const SignUpModal:React.FC<IProps> = ({onEnterClick, onSubmit} : IProps) => {

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleSubmit = () => {
        onSubmit({login, password})
    }

    return (
        <div className={"modal__wrapper"} onClick={onEnterClick}>
        <div
            className={"modal"}
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className={'modal__title'}>Регистрация</h3>
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
                    value={"Создать"}
                    className={"modal__button"}
                    onClick={handleSubmit}
                />
            </form>
        </div>
    </div>
    )
}

export default SignUpModal