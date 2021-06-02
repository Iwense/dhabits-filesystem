import React, {useState, useEffect} from 'react'
import Folder from './components/Folder'

const App = () => {
    const [folders, setFolders] = useState([])

    useEffect(() => {
        fetch('http://164.90.161.80:3000/api/content')
            .then(res => res.json())
            .then(res=> {
                setFolders(res?.children)
            })
            
    }, [])

    return (
        <div className='app'>
            <header className='header'>
                <h1 className='header__text'>Test for D-Habits</h1>
            </header>
            <main className='main'>
                {!!folders.length && folders.map((item, index) => (
                    <Folder 
                        key={`Folders-${index}-${item?.id}`} 
                        title={item?.title} 
                        id={item?.id}
                    />
                ))}
            </main>
            <section className={'extract'}>
                <h3>Extract webpack config functional : </h3>
                <div>
                    <p>git version  - {VERSION} </p>
                </div>
                <div>
                    <p>commit hash  -  {COMMITHASH} </p>
                </div>
                <div>
                    <p>git branch  -   {BRANCH} </p>
                </div>
            </section>
        </div>
    )
}

export default App
