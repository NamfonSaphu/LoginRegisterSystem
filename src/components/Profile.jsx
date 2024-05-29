/* eslint-disable no-unused-vars */
import Navpage from "./Navpage";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";

function Profile() {

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://www.melivecode.com/api/auth/user", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    setUser(result.user)
                    setIsLoaded(false)
                } else if (result.status === 'forbidden') {
                    MySwal.fire({
                        html: <i>{result.massage}</i>,
                        icon: 'error'
                    }).then((value) => {
                        navigate('/')
                    })
                }
                console.log(result)
            })
            .catch((error) => console.error(error));
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    if (isLoaded) return (<div>Loading</div>)
    else {
        return (
            <div>
                <Navpage />
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello {user.fname}</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                            <button className="btn btn-primary" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile