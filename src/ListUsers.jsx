import React, { useEffect, useState } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import { useHistory  } from 'react-router-dom';
import 'firebase/firestore';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';


export default (props) => {
    const [lista, setLista] = useState([]);
    const history = useHistory();
    const logOut = async () => {
        await firebase.auth().signOut();
        history.push("/");
    }
    
    const firebase = useFirebaseApp();
    const user = useUser();

    useEffect(() => {
        list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    //list firebase data
    const  list = async () => {
    let vector = [];
    try {
      const snapshot =  await firebase.firestore().collection('users').get(); 
      await snapshot.forEach((doc) => {
        let obj = {id:doc.id, user:doc.data().user, email:doc.data().email, password:doc.data().password};
            vector.push(obj) 
        }); 
        setLista(vector); 
       } catch (error) {   }
   }

   const clear = async (id) => {
       console.log(id)
    try {
         await firebase.firestore().collection('users').doc(id).delete();  
    } catch (error) {  }
      list();
  }

  
  

    return(
        <>
        <Container>
         {
            !user &&
            <>
                <h1>Para acceder a esta ruta debes iniciar sesión</h1> 
            </>
        }
        {
            user &&
            <>
                <p>Bienvenido {user.email}</p>
                {lista.map(item => (                    
                     <Table striped bordered hover responsive key={item.email}>
                     <thead>
                       <tr>
                         <th>Usuario</th>
                         <th>Correo</th>  
                         <th>Contraseña</th> 
                         <th>Acción</th>                              
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td>{item.user}</td>
                         <td>{item.email}</td>
                         <td>{item.password}</td>
                         <td><button onClick={() => clear(item.id)}>Eliminar</button></td>
                       </tr>                                            
                     </tbody>
                   </Table>
                ))
                
                }

                <button onClick={logOut}>Cerrar sesión</button>
            </>
        }
        </Container>
        </>
    )
}