import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {ModelData, CustomLoader} from './../../Components'
import {Button, Container, Grid, Typography} from '@material-ui/core'
import Navbar from './../../Layout/Navbar'
import style from './style'

interface Model {
    Id: number;
    TypeId: number;
    BrandId: string;
    Name: string;
    Comment: string;
    Description: string;
    numberOfPages: number | undefined;
}


const Home = () => {
    const history = useHistory();
    const [models, setModels] = useState<Model[]>()
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

    useEffect(()=>{
        if(!localStorage.getItem("user-credentials")){
            history.push('/login')
        }
        getData()
       // eslint-disable-next-line
    }, [])
    const getData = async() =>{
        const header = JSON.parse(localStorage.getItem("user-credentials") || '{}')
        setLoader(true)
        try{
            const {data} = await axios.get("http://163.47.115.230:30000/api/overview/modeltype",{
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
            <Navbar login={true}/>
            {dataError &&  <h1 style={{textAlign: 'center'}}> Network Error, Couldn't fetch any data from the server </h1> }
            {!dataError &&<Typography
                align='center'
                variant='h2'
                style={{margin: '2rem'}}
            > Model Types </Typography>}
            <Container maxWidth="lg">
                {/* Showing all the models */}
                <Grid container justify='center'>
                    {models && models.length > 0 && models.slice(startingPoinnt, startingPoinnt+modelPerPage).map((model, id) => (
                        <Grid item xs={8} sm={4} md={3} key={id}>
                            <ModelData 
                                Id={model.Id}
                                TypeId={model.TypeId}
                                BrandId={model.BrandId}
                                Name={model.Name}
                                Comment={model.Comment}
                                Description={model.Description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>


            {/* Taking care of the pagination */}
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
        </>
    )
}
export default Home