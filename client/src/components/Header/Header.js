import {
    NavLink
} from 'react-router-dom';
import './Header.css';
import LogoutButton from './../../components/LogoutButton/LogoutButton';

export default function Header(){
    return (
        <header className="page-header">
            <div className="title">
                <span className="logo">Language App</span>
                <LogoutButton />
            </div>
            <nav className="header-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/words">Words</NavLink>
                <NavLink to="/words/add">Add Word</NavLink>
                <NavLink to="/account" >Account</NavLink>
            </nav>
        </header>
    )
}