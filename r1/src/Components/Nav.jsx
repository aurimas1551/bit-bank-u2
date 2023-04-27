import { useContext } from "react";
import { Global } from "./Global";

function Nav() {

    const { route, setRoute, authName, logOut } = useContext(Global);

    return (

        <header className="header">
            {
                authName ? <div className="nav-name">{authName}</div> : <div className="nav-name">Bank</div>
            }
            <nav className="navbar">
                <span onClick={_ => setRoute('home')} className={'nav-link' + (route === 'home' ? ' active' : '')}>Home</span>
                {
                    authName ? <span onClick={_ => setRoute('accounts')} className={'nav-link' + (route === 'accounts' ? ' active' : '')}>Accounts</span> : null
                }
                {
                    authName ? <span className="nav-link" onClick={logOut}>Logout</span> : <span onClick={_ => setRoute('login')} className="nav-link">Login</span>
                }
            </nav>
        </header>
    );

}

export default Nav;