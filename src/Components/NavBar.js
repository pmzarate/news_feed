import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import TermSearch from './TermSearch'
import DateSearch from './DateSearch'
import AuthorSearch from './AuthorSearch'

const NavBar = () => {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            My News Feed
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TermSearch/>
                <AuthorSearch/>
                <DateSearch/>
            </div>
        )
    
}

export default NavBar
