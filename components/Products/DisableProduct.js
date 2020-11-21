import React, {
    useState
} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    getCookie
} from '../../utils/cookie';
import { API } from '../../config';
const useStyles = makeStyles((theme) => ({
    disabledInput: {
        'input': {
            color: 'black',
        },
        'label': {
            borderColor: '#3f51b5',
        }
    },
}));

const DisabledProduct = ({
        product
    }) => {
        const classes = useStyles();
        const [modal, setModal] = React.useState(false)
        const [token] = useState(getCookie('token'))


        const toggle = () => {
            setModal(!modal)
        }
        const unable = async () => {
            try {
                var headers = {
                    'Authorization': 'Bearer ' + token
                }
                console.log(!product.active)
                var data = {
                    active: !product.active,
                }
                console.log("unable -> data", data)
                let dataToSend = new FormData();
                 Object.keys(data).forEach(key => {
                    console.log('Key->', key)
                    
                        dataToSend.append(key, data[key]);
                });
                // Where we're fetching data from
                await fetch(`${API}/product/${product._id}`, {
                        method: 'PUT',
                        headers: headers,
                        body: dataToSend
                    })
                    // We get the API response and receive data in JSON format...
                    .then(response => response.json())
                    // ...then we update the users state
                    .then(data => {
                        console.log(data);
                        window.location.reload();
                    })
            } catch (error) {
             console.log("unable -> error", error)
            }
        }

  return (
    <React.Fragment>
        <Button 
            color={product && product.active != true ? 'success' : 'danger'}  
            onClick={() => toggle()} 
        >
            {
                product && product.active == true ?
                'Desactivar' :
                'Activar'
            }
        </Button>
        <Modal isOpen={modal} toggle={toggle} style={{marginTop:"90px"}}>
        <ModalHeader toggle={toggle}>
            {
                product && product.active == true ?
                '¿Desea desactivar este producto?' : 
                '¿Desea activar este producto?'
            }
        </ModalHeader>
        <ModalBody className='text-center'>
                {
                    product ? 
                    <h4>
                        Nombre: {product.name} <br />
                        Marca: {product.brand}
                    </h4> : null
                }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => unable()}>Confirmar</Button>
          <Button color="secondary" onClick={() => toggle()}>Cerrar</Button>
        </ModalFooter>
      </Modal>
        
    </React.Fragment>
);
}

export default DisabledProduct;