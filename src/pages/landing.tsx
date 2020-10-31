import React, { useEffect, useState } from 'react'

import axios from 'axios'
import '../styles/landing.css'
import lupa from '../assets/lupa.svg'
import close from '../assets/close.svg'

interface User {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    html_url:string;
    blog: string;
    twitter_username: string;
    company: string;
    hireable: boolean;
}


export default function Landing(){
    const [ user, setUser ] = useState('')
    const [ url, setUrl ] = useState('https://api.github.com/users/octocat')
    const [ dataUser, setDataUser ] = useState<User>()
    const [ isLoading, setIsLoading ] = useState(false)
  
    useEffect(()=>{
      const fecthApiGitHub = async () =>{
            setIsLoading(true)
            await axios.get(url)
            .then( ({data}) => {
                setDataUser(data)  
                setIsLoading(false) 
            })
            .catch(error => {
               alert('Usuário não encontrado!')
                console.error("Erro na requisição", error)
            }) 
       }
       fecthApiGitHub()
    }, [url])
       

    return (
        <div className="main">
            <h1>Explorar usuários do GitHub</h1>

            <main >
                <span>Usuário:</span>
                <div className="contInput">
                    <input type="text"
                    value={user} 
                    onChange={ e => {
                        setUser(e.target.value)
                    }} 
                    />

                    <button 
                        onClick={()=> setUrl(`https://api.github.com/users/${user}`)}>
                        <img src={lupa} alt="Pesquisa"/>
                    </button>
                </div>
            </main>

            

            { isLoading ? (
                <div className="spinner"></div>
            ) : (
            <div className="contentUser">
            <img className="imgBio" src={dataUser?.avatar_url} alt={`Imagem de ${dataUser?.name}`}/>
            <h2>{dataUser?.name}</h2>
            <p>{dataUser?.bio}</p>
            <p>{dataUser?.location}</p>
            <a href={dataUser?.html_url} target="_blank" rel="noreferrer noopener">Visitar </a>
            <a href={dataUser?.blog} target="_blank" rel="noreferrer noopener">Blog</a>
            <a href={dataUser?.twitter_username} target="_blank" rel="noreferrer noopener">Twitter</a>
            <p>{dataUser?.company}</p>
            
            </div>    
            ) }
            
    </div>
    )
}