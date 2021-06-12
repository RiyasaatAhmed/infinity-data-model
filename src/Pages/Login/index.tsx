
import { useForm , SubmitHandler} from "react-hook-form";
import { Grid, Container, Button, Typography } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Input, CustomLoader} from './../../Components'
import style from './style'
import axios from 'axios'
import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import Navbar from './../../Layout/Navbar'


const schema = yup.object().shape({
    email: yup.string().email("Please provide a valid Email.").required("Email is a required field"),
    password: yup.string().required('Password is a required field'),
});
type Inputs = {
    example: string,
    exampleRequired: string,
};

const Login = () => {
    const classes = style()
    const history = useHistory();
    const [loader, setLoader] = useState<boolean>(false)
    const [wrongCredentials, setWrongCredentials] = useState<boolean> (false)

    const { register, handleSubmit, formState: {errors}  } = useForm({resolver: yupResolver(schema)});

    useEffect(() => {
        const timeout = setTimeout(() => {
            setWrongCredentials(false)
         }, 3000);
        if(localStorage.getItem("user-credentials")){
             history.push('/modeltype')
        }
        return () => clearTimeout(timeout);
            
        // eslint-disable-next-line
    },[wrongCredentials]);

    const onSubmit: SubmitHandler<Inputs> = async data => { 
        setLoader(true);
        try{

            const response = await axios.post("http://163.47.115.230:30000/api/login", data)
            setLoader(false);
            localStorage.setItem("user-credentials", JSON.stringify(response.data))
            history.push('/modeltype')
        }catch(err){
            console.log(err)
            setLoader(false);
            setWrongCredentials(true)
        }
    }
        
    return(
        <>
            {loader && <CustomLoader />}
            <Navbar login={false}/>
            <Typography
                variant='h2'
                className={classes.pageTitle}
            >
                {`Login page`}
            </Typography>
            <Container maxWidth="lg" className={classes.container} >

                { wrongCredentials && 
                <div>
                    <Typography
                        variant='h5'
                        className={classes.wrongCredentials}
                    > {'Invalid Credentials'} </Typography>
                </div>
                }
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.email?.message}
                            label="email"
                            {...register('email')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.email?.message && <p>{errors.email?.message}</p>}
                        </div>
                    </Grid>
                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.password?.message}
                            type="password" 
                            label="password" 
                            {...register('password')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.password?.message && <p>{errors.password?.message}</p>}
                        </div>
                    </Grid>
                    <Grid container justify='center'>
                        <Button 
                            variant="contained" 
                            type="submit"
                            className={classes.loginButton}
                        >
                            Login
                        </Button>
                    </Grid>

                </form>
            </Container>
        </>

    )
}

export default Login;