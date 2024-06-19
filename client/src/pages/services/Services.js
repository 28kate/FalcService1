import { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Services() {
  const [services, setServices] = useState([]);


  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/service")
      .then((response) => {
        setServices(response.data.listOfServices);
       
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);



  return (
    <section id='services'>
      <br></br>
      <br></br>
      <h5 className='titleRate'>Rate Our Service Areas</h5>
      <br></br>
      <br></br>
      <div className='container services__container'>
        {services.map((value, key) => (
          <article  className='service' key={key}>
            <div className='service__head'>
              <div className='icon'>
                <img src={value.icon} alt='Innovation' />
              </div>
              <h4 id={value.color}>{value.title}</h4>
            </div>
            <div className='innerBody'>
              <p className='subtitle' onClick={() => { navigate(`/service/${value.id}`) }}>{value.body}</p>
             
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
