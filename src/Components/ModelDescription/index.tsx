import style from './style'
import Modal from 'react-modal';
import { useState } from 'react'
import {Button} from '@material-ui/core'

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

interface ModelData {
    id: number;
    dataType: string;
    description: string;
    displayName: string;
    groupId: number|null;
    model: string;
    name: string;
    protocolOrder: number | null;
    status: any 
}
Modal.setAppElement('#root')
const ModelDescription = ({id, dataType, description, displayName, groupId, model, name, protocolOrder, status}: ModelData) => {
    const classes = style()

    const [showModal, setShowModal] = useState<boolean>(false)

    const closeModal = () => {
        setShowModal(false)
    }
    const OpenModal = () => {
        setShowModal(true)
    }

    return (

        <>
            <div className={classes.container} onClick={OpenModal}>
                <h5 style={{textOverflow: 'ellipsis'}}> {displayName} </h5>
            </div>

            <Modal
                isOpen={showModal}
                style={customStyles}
                onRequestClose={closeModal}
            > 
                <h3 className={classes.title}> Model Details </h3>
                <h5>Name:  {name} </h5> 
                <h5>Data Type: {dataType ? dataType : <span className={classes.span}> Yet to be Added</span> } </h5> 
                <h5>Description: {description ? description :<span className={classes.span}> Yet to be Added</span>} </h5> 
                <h5>Display Name: {displayName ? displayName :<span className={classes.span}> Yet to be Added</span>} </h5> 
                <h5>Group Id: {groupId ? groupId :<span className={classes.span}> Yet to be Added</span>} </h5>
                <h5>Model:  {model ? model : <span className={classes.span}> Yet to be Added</span> } </h5>
                <h5>Protocol Order: {protocolOrder ? protocolOrder : <span className={classes.span}> Yet to be Added</span> }</h5>
                <h5>status: {status ? status : <span className={classes.span}> Yet to be Added</span> }</h5>

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
export default ModelDescription