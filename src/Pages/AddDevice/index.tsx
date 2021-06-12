import { useState } from 'react'
import Navbar from './../../Layout/Navbar'
import style from './style'
import Modal from 'react-modal';
import {Input} from './../../Components'
import { useForm , SubmitHandler} from "react-hook-form";
import { Grid, Button, Typography } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const customStyles = {
    overlay: {
        backgroundColor: 'grey',
    },
    content: {
        width: '80vw',
        height: 'auto',
        top: '50%',
        left: '50%',
        righ: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

type Inputs = {
    example: string,
    exampleRequired: string,
};

const schema = yup.object().shape({
    BrandId: yup.string().required("BrandId is a required field"),
    Name: yup.string().required('Name is a required field'),
    TypeId: yup.number().required('TypeId is a required field'),
    Comment: yup.string().required('Comment is a required field'),
});

Modal.setAppElement('#root')
const AddDevice = () => {
    const classes = style()
    const [show, setShow] = useState<boolean>(false)
    const [submitText, setSubmitText] = useState<string>("")
    const { register, handleSubmit, formState: {errors}  } = useForm({resolver: yupResolver(schema)});


    const closeModal = () => {
        setShow(false)
    }
    const OpenModal = () => {
        setShow(true)
    }


    const onSubmit: SubmitHandler<Inputs> = async data => { 
        try{
            const header = JSON.parse(localStorage.getItem("user-credentials") || '{}')
            const response = await axios.post("http://163.47.115.230:30000/api/devicemodel", data, {
                headers:{
                    authorization: header.access_token
                }
            })
            
            setSubmitText('Device Added Successfully.')
            setShow(false)
            console.log(response)
        }catch(err){
            setSubmitText('SomeThing went Wrong.')
            setShow(false)
        }
    }
    return (
        <>
            <Navbar login={true} />
            <div className={classes.btnContainer}>
                <Button
                    variant="contained"
                    className={classes.addButton}
                    onClick={OpenModal}
                >
                    Add Devices
                </Button>
            </div>
            <Typography
                align='center'
                variant='h5'
            >
                    {submitText}
            </Typography>

            <Modal
                isOpen={show}
                style={customStyles}
                onRequestClose={closeModal}
            > 

                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.BrandId?.message}
                            label="BrandId"
                            {...register('BrandId')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.BrandId?.message && <p>{errors.BrandId?.message}</p>}
                        </div>
                    </Grid>
                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.Name?.message}
                            label="Name" 
                            {...register('Name')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.Name?.message && <p>{errors.Name?.message}</p>}
                        </div>
                    </Grid>


                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.TypeId?.message}
                            label="TypeId" 
                            {...register('TypeId')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.TypeId?.message && <p>{errors.TypeId?.message}</p>}
                        </div>
                    </Grid>
                    <Grid item sm={12} md={8} className={classes.gridItems}>
                        <Input 
                            error={errors.Comment?.message}
                            label="Comment" 
                            {...register('Comment')}  
                        />
                        <div className={classes.menualErrorFix}>
                            {errors.Comment?.message && <p>{errors.Comment?.message}</p>}
                        </div>
                    </Grid>

                    <div className={classes.modalBtns}>
                        <Button
                            variant="contained" 
                            type="submit"
                            className={classes.submitBtn}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained" 
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                    </div>

                </form>



            </Modal>


        </>
    )
}
export default AddDevice