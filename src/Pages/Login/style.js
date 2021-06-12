import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({

    pageTitle:{
        marginTop: '10vh',
        marginBottom: '2rem',
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#f3f3f3', 
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderRadius: 15,
        width: '90%',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
        marginBottom: '7rem'
    },
    wrongCredentials: {
        textAlign: 'center',
        backgroundColor: '#d65151',
        padding: 8,
        width: '40%',
        margin: 'auto',
        borderRadius: 8,
        color: '#fff'
    },
    gridItems : {
        margin: 'auto'
    },
    loginButton:{
        marginTop: '1rem',
        textAlign: 'center'
    },
    menualErrorFix:{
        marginTop: -8,
        fontSize: 11,
        color: 'red',
        height: 8,
    }
}))


export default useStyles