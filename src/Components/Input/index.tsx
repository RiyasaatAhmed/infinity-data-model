import { TextField } from '@material-ui/core';
import style from './style'

const Input = ({...rest}) => {
    const classes = style();
    return(
        <>
            <TextField 
                fullWidth={true} 
                {...rest}
                className={classes.inputStyle}
            />
        </>
    )
}
export default Input;