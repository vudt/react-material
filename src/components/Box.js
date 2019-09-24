import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class BoxComponent extends React.Component {
    
   
    render() {
        return (
            <Box>
                <Container>
                    <h1>Hello Box</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper>
                                <h3>Typography</h3>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <h3>Grid</h3>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <h3>Grid</h3>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    }
}

export default BoxComponent;