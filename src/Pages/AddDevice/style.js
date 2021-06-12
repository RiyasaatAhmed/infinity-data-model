import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({

    addButton: {
        marginTop: '30vh',
        marginBottom: '30vh',
    },
    btnContainer:{
        display: 'flex', 
        justifyContent: 'center'
    },
    modalBtns:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem'
    },
    submitBtn:{
        marginRight: 8, 
        backgroundColor: '#1976D2', 
        color: 'white',
        transition: 'all ease-in',
        transitionDuration: '0.25s',
        "&:hover":{
            backgroundColor: '#2274c1',
            boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)'
        }
    },
    gridItems : {
        margin: 'auto'
    },
    menualErrorFix:{
        marginTop: -8,
        fontSize: 11,
        color: 'red',
        height: 8,
    }
}))


export default useStyles