import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#f3f3f3',
        padding: '1rem',
        margin: '1rem',
        textAlign: 'center',
        borderRadius: 8,
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
        transition: 'all east-in',
        transitionDuration: '0.5s',
        "&:hover":{
            backgroundColor: '#f9f9f9',
            cursor: 'pointer'
        }
    },
    span:{
        color: 'gray'
    },
    title: {
        textAlign: 'center'
    }


}))


export default useStyles