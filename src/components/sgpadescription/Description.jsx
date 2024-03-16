import React, { useEffect, useState, } from 'react';


import { gettextData } from '../../services/Index';

const Description = () => {

    const [textdata, setTextData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            gettextData()
                .then(data => setTextData(data))
                .catch(error => console.error("Error fetching data:", error));
        };

        fetchData();
    }, []);
    return (
        <div>
            {
                textdata && textdata.map((data, Index) => (
                    <div className='px-2' key={Index}>
                        <h3 className='fw-bold my-2'>{data.title}</h3>
                        <h6 className='lh-2 font-monospace font-weight-light my-3'>{data.description}</h6>
                    </div>
                ))
            }
            
        </div>
    )
}

export default Description