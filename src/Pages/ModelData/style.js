import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    btnContaiter: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '5rem'
    },
    active:{
        color: 'white',
        margin: 4,
        [theme.breakpoints.down('xs')]:{
            margin: 1,
        }

    },
    normal:{
        margin: 4,
        [theme.breakpoints.down('xs')]:{
            margin: 1,
        }
    },
}))


export default useStyles