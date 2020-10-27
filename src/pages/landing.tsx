import React , { FormEvent, FormEventHandler, useState } from 'react'

import axios from 'axios'
import '../styles/landing.css'
import lupa from '../assets/lupa.svg'
import { cleanup } from '@testing-library/react'


interface User {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    html_url:string;
}

export default function Landing(){
    const [ user, setUser ] = useState('')
    const [ dataUser, setDataUser ] = useState<User>()

   
       async function fecthApiGitHub(){
            await axios.get(`https://api.github.com/users/${user}`)
             .then( res => {
                 setDataUser(res.data)
             })
             .catch(error => console.error("Erro na requisição", error))
        }

       function clean(){
           setUser("")
       }


    return (
        <div className="main">
            <h1>Explorar usuários do GitHub</h1>

            <main >
                <span>Usuário:</span>
                <div className="contInput">
                    <input type="text" name={user} onChange={ e => setUser(e.target.value)} 
                    onClick={clean}/>
                    <button onClick={fecthApiGitHub}><img src={lupa} alt="Pesquisa"/></button>
                </div>
            </main>

        { !dataUser ? null : (
             <div className="contentUser">
             <img className="imgBio" src={dataUser!.avatar_url} alt={`Imagem de ${dataUser!.name}`}/>
             <h2>{dataUser!.name}</h2>
             <p>{dataUser!.bio}</p>
             <p>{dataUser!.location}</p>
             <a href={dataUser!.html_url} target="_blank" rel="noreferrer noopener">Visitar </a>
         </div>
         ) }
           
        </div>
        
    )
}