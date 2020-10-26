import React , { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../styles/landing.css'
import lupa from '../assets/lupa.svg'
import { clear } from 'console'

interface User {
    name: string;
    bio: string;
    location: string;
    repos_url:string;
}

interface UserInput {
    user: string;
}

export default function Landing(){
    const { register, handleSubmit } = useForm()
    const [user, setUser] = useState<User>()

        async function onSubmit(data: UserInput){
            await axios.get(`https://api.github.com/users/${data.user}`)
            .then(res => {
                setUser(res.data)
                console.log(user)
            }) 

        }    


    return (

        <div className="main">
            <h1>Explorar usuários do GitHub</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <span>Usuário:</span>
                <div className="contInput">
                    <input type="text" name="user" ref={register()}/>
                    <button type="submit"><img src={lupa} alt="Pesquisa"/></button>
                </div>
            </form>

            </div>
        
    )
}