import style from './style'
import Modal from 'react-modal';
import { useState } from 'react'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

interface Device {
    Id: number;
    TypeId: number;
    BrandId: string;
    Name: string;
    Comment: string;
    Description: string;
}

const customStyles = {
    overlay: {
        backgroundColor: 'grey',
    },
    content: {
        width: '50vw',
        height: 'auto',
        top: '50%',
        left: '50%',
        righ: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root')
const ModelData = ({Id, TypeId, BrandId, Name, Comment, Description}:Device) => {
    const classes = style()
    const history = useHistory()
    const [showModal, setShowModal] = useState<boolean>(false)

    const closeModal = () => {
        setShowModal(false)
    }
    const OpenModal = () => {
        setShowModal(true)
    }

    const getData = async() =>{
        history.push(`/modelData/${BrandId}/${Name}`)
    }

    return (
        <>
            <div className={classes.container} onClick={OpenModal}>
                <h5 style={{textOverflow: 'ellipsis'}}> {Name} </h5>
            </div>

            <Modal
                isOpen={showModal}
                style={customStyles}
                onRequestClose={closeModal}
            > 
                <h3 className={classes.title}> Model Details </h3>
                <h5>Name:  {Name} </h5> 
                <h5>Comment: {Comment ? Comment : <span className={classes.span}> Yet to be Added</span> } </h5> 
                <h5>Description: {Description ? Description :<span className={classes.span}> Yet to be Added</span>} </h5> 
                <h5>BrandId: {BrandId}</h5>
                <h5>TypeId: {TypeId}</h5>
                <Button
                    variant="contained" 
                    onClick={getData}
                    style={{marginRight: 8, marginBottom: 8}}
                >
                    Get Model's Data
                </Button>
                <Button
                    variant="contained" 
                    onClick={closeModal}
                    style={{marginBottom: 8}}
                >
                    Close
                </Button>
            </Modal>

        </>


    )
}
export default ModelData