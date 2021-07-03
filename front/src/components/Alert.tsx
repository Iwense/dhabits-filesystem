import React from 'react'

export interface IAlertItem {
    status: 'ok' | 'error' | 'warning';
    text: string; 
}

interface IProps {
    list: Array<IAlertItem>
}

const Alert:React.FC<IProps> = ({list}: IProps) => {
    
    const color = {
        'error': '#f00',
        'ok': '#0f0',
        'warning': '#0ff',
    }

    if(!list.length){
        return <></>
    }

    return (
        <div className={'alert__wrapper'}>
            {list.map((item:IAlertItem, index:number) => (
                <div key={`${item.text}-${index}`} className={'alert'} style={{background: color[item.status]}}>
                    <h3 className={'alert__text'}>{item.text}</h3>
                </div>
            ))}
        </div>
       
      
    )
}

export default Alert