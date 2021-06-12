import { useParams, useHistory } from "react-router";
import axios from 'axios'
import { useEffect, useState } from "react";
import Navbar from './../../Layout/Navbar'
import {CustomLoader, ModelDescription} from './../../Components'
import {Button, Container, Grid, Typography} from '@material-ui/core'
import style from './style'


interface Params {
    brandId: string;
    name: string;
}
interface ModelDataDescription {
    Id: number;
    DataType: string;
    Description: string;
    DisplayName: string;
    GroupId: number|null;
    Model: string;
    Name: string;
    ProtocolOrder: number | null;
    Status: any 
}
const ModelData = () => {
    const {brandId, name}:Params = useParams()


    const history = useHistory();
    const [models, setModels] = useState<ModelDataDescription[]>()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [multiplier, setMultiplier] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(false)
    const [dataError, setDataError] = useState<boolean>(false)
    const classes = style()

    const modelPerPage = 40;
    const startingPoinnt = currentPage * modelPerPage;
    const numberOfPages = models && Math.ceil(models?.length / modelPerPage)
    const totalPages = [];

    for(let i = 0; i < 3; i++){
        totalPages.push(i+1)
    }
    useEffect(()=> {
        if(!localStorage.getItem("user-credentials")){
            history.push('/login')
        }
        getData()
       // eslint-disable-next-line
    }, [])
    const getData = async() => {
        try{
            const header = JSON.parse(localStorage.getItem("user-credentials") || '{}')
            setLoader(true)
            const {data} = await axios.get(`http://163.47.115.230:30000/api/overview/modeldata/${brandId}/${name}`,{
                headers:{
                    authorization: header.access_token
                }
            })
            setModels(data)
            setLoader(false)
            setDataError(false)  

        }catch(err){
            console.log(err)
            setLoader(false)
            setDataError(true)
        }
    }

    const jumpFromPage = (id:number) => {
        setCurrentPage(id-1)
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            {loader && <CustomLoader />}
            <Navbar login={true} />
            {dataError &&  <h1 style={{textAlign: 'center'}}> Network Error, Couldn't fetch any data from the server </h1> }
            {!dataError && <Typography
                align='center'
                variant='h4'
                style={{margin: '2rem'}}
            > {`Model Data of ${brandId}'s ${name} model. `} </Typography>}
            <Container maxWidth="lg">
                {/* Showing all the models */}
                <Grid container justify='center'>
                    {models && models.length === 0 && <h1> No devices are found under this device type </h1>}
                    {models && models.length > 0 && models.slice(startingPoinnt, startingPoinnt+modelPerPage).map((model, id) => (
                        <Grid item xs={8} sm={4} md={3} key={id}>
                            <ModelDescription
                                id = {model.Id}
                                dataType= {model.DataType}
                                description= {model.Description}
                                displayName= {model.DisplayName}
                                groupId= {model.GroupId}
                                model= {model.Model}
                                name= {model.Name}
                                protocolOrder= {model.ProtocolOrder}
                                status= {model.Status}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {models && models.length !== 0 &&
                <div className={classes.btnContaiter}>
                    {multiplier > 0 && <Button
                        className={classes.normal}
                        variant="contained" 
                        color={'default'}
                        onClick= {() => setMultiplier(multiplier - 1)}
                    > {'Previous'} </Button>}
                    {
                        numberOfPages &&  totalPages.map((item, id) => (
                            item + (multiplier*3) <= numberOfPages &&    
                                <Button
                                    key={id}
                                    className={item +(multiplier*3)-1 === currentPage ? classes.active : classes.normal}
                                    variant="contained" 
                                    color={item + (multiplier*3)-1 === currentPage ? "primary" : 'default'}
                                    onClick= {() => jumpFromPage(item + (multiplier*3)) }
                                > {item + (multiplier*3)} </Button>
                        ))
                    }
                    {numberOfPages && (multiplier*3)+3 <= numberOfPages && 
                    <Button
                        className={classes.normal}
                        variant="contained" 
                        color={'default'}
                        onClick= {() => setMultiplier(multiplier + 1)}
                    > {'Next'} </Button>}
                </div>  
            }
        </>
    )
} 
export default ModelData;