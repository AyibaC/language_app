import {
    NavLink
} from 'react-router-dom';
import './Header.css';
import LogoutButton from './../../components/LogoutButton/LogoutButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));


export default function Header(){
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="page-header">
            <div className="title">
                <span className="logo">linguini<PublicIcon style={{ fontSize: 50 }} /></span>
            </div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu" 
                    aria-controls="my-menu" 
                    onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="my-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><NavLink to="/">Home</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/words">Words</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/words/add">Add Word</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to="/account" >Account</NavLink></MenuItem>
                    </Menu>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
        </header>
    )
}