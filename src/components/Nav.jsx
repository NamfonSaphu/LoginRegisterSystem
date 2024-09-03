import { Link } from "react-router-dom"
function Nav() {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Logo</a>
                </div>
               
                <div className="navbar-end">
                    <Link to="register" className="btn btn-ghost">Register</Link>
                </div>
            </div>
        </>
    )
}
export default Nav