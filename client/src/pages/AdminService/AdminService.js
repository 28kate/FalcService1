import { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

import { CiTrash } from "react-icons/ci";

function Services() {
  const [services, setServices] = useState([]);
  let navigate=useNavigate()


  useEffect(() => {
    axios.get("http://localhost:3001/service")
      .then((response) => {
        setServices(response.data.listOfServices);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);


   const deleteService = (id) => {
    axios.delete(`http://localhost:3001/service/${id}`)
        .then((response) => {
       
            setServices(services.filter(service => service.id !== id));
            navigate('/addservice')
            console.log(response)
        })
        .catch((error) => {
            console.error("Error deleting service:", error);
        });
};


  return (
    <section id='services'>
 <br></br>
 <br></br>
 <br></br>
 <br></br>
      <br></br>
      <br></br>
      <div className='container services__container'>
        {services.map((value, key) => (
          <article className='service' key={key}>
            <div className='service__head'>
              <div className='icon'>
          
              <CiTrash size={40} className='iconic1' onClick={() => deleteService(value.id)} />
                
              </div>
              <h4 id={value.color}>{value.title}</h4>
           
            </div>
            <div className='innerBody'>
              <p className='subtitle'>{value.body}</p>
              
            </div>
           
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
