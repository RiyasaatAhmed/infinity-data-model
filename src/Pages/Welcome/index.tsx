import {Container, Typography, Button} from "@material-ui/core";
import Navbar from './../../Layout/Navbar'
import {useHistory} from 'react-router-dom'
import style from './style'
import { useEffect } from "react";
const Welcome = () => {
    const classes = style();
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem("user-credentials")){
            history.push('/modeltype')
       }
       // eslint-disable-next-line
    }, [])
    return (
        <>
            <Navbar login={false} />
            <Container maxWidth="md" className={classes.container}>
                <Typography
                    variant="h3"
                    align="center"
                    style={{marginBottom: '1.5rem'}}
                >
                    {`Welcome to Infinity Data Model`}
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                >
                    Click to  <Button  variant="contained" onClick={() => history.push('/login')} > Login </Button>
                </Typography>
            </Container>
        </>
    )
}
export default Welcome