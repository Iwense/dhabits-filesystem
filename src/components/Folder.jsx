import React, {useState, useEffect} from 'react'
import File from './File'
import folderOpen from '../assets/images/folderOpen.svg'
import folder from '../assets/images/folder.svg'

const Folder = ({title , id }) => {
    const [send, setSend] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (!send) return
        fetch(`http://164.90.161.80:3000/api/content?dirId=${id}`)
            .then(res => res.json())
            .then(res=> {
                setData(res?.children)
            })
    }, [send])

    const handleClick = () => {
        if(!data.length){
            setSend(true)
        }
        setShow(prev => !prev)
    }

    return (
        <div className={'folder'} >
            <div className={'folder__item'} onClick={handleClick}>
                <img src={show ? folderOpen : folder} className={'folder__icon'}/>
                <h4>{title}</h4>
            </div>
            {show && (
                <div className={'subfolder'}>
                    {!!data.length && data.map((item, index) => {    
                        if(item.hasOwnProperty('children')){
                            return (
                                <Folder 
                                    key={`file-${item?.id} - ${index}`} 
                                    title={item?.title} 
                                    id={item?.id}
                                />
                            )
                        }
                        return (    
                            <File 
                                key={`file-${item?.id} - ${index}`} 
                                title={item?.title}
                            /> 
                        ) 
                    })}
                </div>
            )}
        </div>
    )
}

export default Folder