/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Login() {

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": inputs.username,
            "password": inputs.password,
            "expiresIn": 6000000
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://www.melivecode.com/api/login", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>{result.massage}</i>,
                        icon: 'success'
                    }).then((value) => {
                        localStorage.setItem('token', result.accessToken)
                        navigate('/profile')
                    })
                } else {
                    MySwal.fire({
                        html: <i>{result.massage}</i>,
                        icon: 'error'
                    })
                }
            })
            .catch((error) => console.error(error));
        alert(inputs);
    }

    return (

        <>
            <Nav/>
            <div className="max-w-sm mx-auto p-10">
                <div className="mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" onChange={handleChange} value={inputs.username || ""} name="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" value={inputs.password || ""} onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-5">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )


}

export default Login