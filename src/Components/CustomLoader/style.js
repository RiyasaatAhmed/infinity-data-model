import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    loaderContainer:{
        position: 'absolute',
        top: 0,
        backgroundColor: '#f3f3f3',
        zIndex: 5,
        width: '100%',
        height: '100vh',
        opacity: 0.75
    },
    loader:{
        position: 'absolute',
        top: '45vh',
        left: '45vw',
    },
}))


export default useStyles