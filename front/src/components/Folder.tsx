import React, { useState, useEffect } from "react";
import File from "./File";
import FolderOpenImage from "../assets/images/folderOpen.svg";
import FolderImage from "../assets/images/folder.svg";
import axios from "axios";

interface IProps {
    title: string;
    id: number;
}

const Folder: React.FC<IProps> = ({ title, id }: IProps) => {
    const [send, setSend] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!send) return;
        console.log("Here is fetching...");
        axios
            .get(`http://localhost:5000/api/filesystem/${id}`)
            .then(({ data }) => setData(data?.children));
    }, [send]);

    const handleClick = () => {
        if (!show) {
            setSend(true);
        } else {
            setSend(false);
        }
        setShow((prev) => !prev);
    };

    return (
        <div className={"folder"}>
            <div className={"folder__item"} onClick={handleClick}>
                {show && <FolderOpenImage className={"folder__icon"} />}
                {!show && <FolderImage className={"folder__icon"} />}

                <h4>{title}</h4>
            </div>
            {show && (
                <div className={"subfolder"}>
                    {!!data.length &&
                        data.map((item, index) => {
                            if (item.hasOwnProperty("children")) {
                                return (
                                    <Folder
                                        key={`file-${item?.id} - ${index}`}
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
                </div>
            )}
        </div>
    );
};

export default Folder;
