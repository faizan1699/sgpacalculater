import React, { useRef, useState } from 'react';

function MarksSgpa() {

    const buttonrefForm = useRef(null);

    const [sgpa, setSgpa] = useState();
    const [inputs, setInputs] = useState([{ marks: "", totalmarks: "", credithours: "" }])
    const getQualityPoints = (marks) => {
        if (marks >= 84) {
            return 4.0;
        }
        else if (marks === 82 || 83) {
            return 3.9;
        }
        else if (marks === 80 || 81) {
            return 3.8;
        }
        else if (marks === 79) {
            return 3.7;
        }
        else if (marks === 77 || 78) {
            return 3.6;
        }
        else if (marks === 76) {
            return 3.5;
        }
        else if (marks === 74 || 75) {
            return 3.4;
        }
        else if (marks === 73) {
            return 3.2;
        }
        else if (marks === 71 || 72) {
            return 3.1;
        }
        else if (marks === 70) {
            return 3.0;
        }
        else if (marks === 69) {
            return 2.9;
        }
        else if (marks === 68) {
            return 2.8;
        }
        else if (marks === 67) {
            return 2.7;
        }
        else if (marks === 66) {
            return 2.6;
        }
        else if (marks === 65) {
            return 2.5;
        }
        else if (marks === 64) {
            return 2.4;
        }
        else if (marks === 63) {
            return 2.3;
        }
        else if (marks === 62) {
            return 2.2; // C+
        }
        else if (marks === 61) {
            return 2.1; // C
        }
        else if (marks === 60) {
            return 2.0; // C-
        }
        else if (marks === 59) {
            return 1.9;
        }
        else if (marks === 58) {
            return 1.8;
        }
        else if (marks === 57) {
            return 1.7;
        }
        else if (marks >= 56) {
            return 1.6;
        }
        else if (marks === 55) {
            return 1.5;
        }
        else if (marks === 54) {
            return 1.4;
        }
        else if (marks === 53) {
            return 1.3;
        }
        else if (marks === 52) {
            return 1.2;
        }
        else if (marks === 51) {
            return 1.1;
        }
        else if (marks === 50) {
            return 1.0;
        }
        else if (marks < 50) {
            return 0.0;
        }
        else {
            return 0.0;
        }
    };

    const calculateSGPA = () => {
        const totalCredits = inputs.reduce((total, input) => total + parseFloat(input.credithours), 0);
        const weightedQualityPoints = inputs.reduce((total, input) => {
            const qualityPoints = getQualityPoints(parseFloat(input.marks));
            return total + (qualityPoints * parseFloat(input.credithours));
        }, 0);
        const result = weightedQualityPoints / totalCredits;
        setSgpa(result.toFixed(2));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateSGPA();
    }

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    }

    const handleClickHiddenButton = () => {
        if (buttonrefForm.current) {
            buttonrefForm.current.click();
        }
    }

    const AddNewInput = () => {
        setInputs([...inputs, { marks: "", totalmarks: "", credithours: "" }])
    }

    const ClearInputs = () => {
        setInputs([{ marks: "", totalmarks: "", credithours: "" }])
    }

    return (
        <div className='input_form_container'>

            <div className=''>
                <h1 className='fw-bold text_form_heading'>SGPA Calculator <sup className='' style={{ fontSize: "18px" }}>( By using marks and qp  )</sup></h1>
            </div>

            <form onSubmit={handleSubmit}>
                {
                    inputs.map((data, Index) => (
                        <div key={Index}>

                            <div className="row g-2 mt-2">

                                <div className="fw-bold text_form_heading">Subject: ( {Index + 1} )</div>

                                <div className="col-md-4">
                                    <input className='input_field w-100 me-3' name='marks' value={data.marks} onChange={(e) => handleInputChange(Index, `marks`, e.target.value)} type="number" required placeholder='Obtained Marks' />
                                </div>

                                <div className="col-md-4">
                                    <input className='input_field w-100 me-3' name='totalmarks' value={data.totalmarks} onChange={(e) => handleInputChange(Index, `totalmarks`, e.target.value)} type="number" required placeholder='Total marks' />
                                </div>

                                {/* <div className="col-md-4">
                                    <input className='input_field w-100' name='credithours' value={data.credithours} onChange={(e) => handleInputChange(Index, `credithours`, e.target.value)} type="number" required placeholder="Credit Hours" />
                                </div> */}


                            </div>

                        </div>
                    ))
                }

                <div className="mt-4 ">
                    {sgpa && <h4 className="text_form_heading fw-bold text-uppercase">result : {sgpa ? sgpa : ""}</h4>}
                    <button className='btn d-none form_button border-0 rounded-1 me-3' ref={buttonrefForm} type='submit' >Calculate SGPA</button>
                </div>

            </form>

            <div className="my-2" id='formBtn'>
                <button className='btn form_button border-0 rounded-1' onClick={handleClickHiddenButton} type='submit' >Calculate SGPA</button>
                <button className='btn form_button rounded-1 mx-md-2' onClick={AddNewInput}>Add New Field</button>
                <button className='btn form_button rounded-1' onClick={ClearInputs}>Clear</button>
            </div>
        </div>

    )
}

export default MarksSgpa
