import React from "react";
import Image from "../assets/images/file.svg";

interface IProps {
    title: string;
}

const File: React.FC<IProps> = ({ title }: IProps) => {
    return (
        <div className={"file"}>
            <Image className={"folder__icon"} />
            <p className={"file__text"}>{title}</p>
        </div>
    );
};

export default File;
