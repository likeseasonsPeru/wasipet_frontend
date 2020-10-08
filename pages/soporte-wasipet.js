import React from 'react'
import Container from '@material-ui/core/Container';
const Privacidad = () => {

    return (
        <React.Fragment>
            <Container justify="flex-start"
                    alignItems="center">
            <h1>Soporte Wasipet</h1>
            <p>
                Para cualquier consulta, duda o problema con alguno de nuestros productos porfavor envié un correo a 
                <b> atencionalcliente@bioetis.com</b> <br/> detallando de la siguiente manera:
                <li>
                    Explicación de la consulta, duda o problema con imagenes referenciales.
                </li>
                <li>
                    Datos personales del remitente: celular, correo de la cuenta registrada.
                </li>
                <p>
                    Muchas gracias por elegirnos. BIOETIS S.A.C
                </p>

            </p>
            </Container>
        </React.Fragment>
    )
}

export default Privacidad;