import React from 'react'
import file from '../assets/images/file.svg'


const File = ({title}) => {
    return (
        <div className={'file'}>
             <img src={file} className={'folder__icon'}/>
            <p className={'file__text'}>{title}</p>
        </div>
    )
}

export default File