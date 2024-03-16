import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav() {

    const navigate = useNavigate();

    const handleSgpaClick = () => {
        navigate('/byusingsgpa');
    }
    const handleMarksSgpaClick = () => {
        navigate('/markssgpa');
    }

    return (

        <div className='d-flex justify-content-center mt-4'>

            <div className=''>
                <button className='btn navigation_btn_1 btn-success' onClick={handleSgpaClick} >Using Sgpa</button>
            </div>
            <div className='pe-1 '></div>
            <div className=''>
                <button className='btn navigation_btn_2 btn-success' onClick={handleMarksSgpaClick} >Using Marks</button>
            </div>

        </div>

    )
}

export default Nav