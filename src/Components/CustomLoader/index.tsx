import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import style from './style'

const CustomLoader = () => {
    const classes = style()
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.loader}>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={30000000} //3 secs
                />
            </div>
         </div>
    )
}
export default CustomLoader