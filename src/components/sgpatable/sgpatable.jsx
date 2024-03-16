import React from 'react';

import { doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firbase/Firebase';
import { getAuth } from 'firebase/auth';

function Sgpatable(props) {

    const { studentsgpa , setStudentSgpa} = props;

    const auth = getAuth();
    const user = auth.currentUser;

    const removeSgpa = async (index) => {
        if (!user) {
            console.log("User not authenticated");
            return;
        }
        try {
            const userId = user.uid;
            const sgpaDataRef = doc(db, `sgpa_data/${userId}`);
            const snapshot = await getDoc(sgpaDataRef);

            if (snapshot && snapshot.exists()) {
                const sgpaArray = snapshot.data().sgpaArray;
                // const sgpaToDelete = sgpaArray[index];
                const updatedArray = sgpaArray.filter((_, i) => i !== index);
            
                await deleteDoc(sgpaDataRef);
                await setDoc(sgpaDataRef, { sgpaArray: updatedArray });
                setStudentSgpa({ sgpaArray: updatedArray });
                alert('Successfully removed SGPA');
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error removing SGPA:", error.message);
            alert('Failed to remove SGPA. Please try again.');
        }
    };
    return (

        <>
            <div className="">
                <h2 className='text-center fw-bold' >sgpa data</h2>

                {studentsgpa && studentsgpa.sgpaArray && (

                    <div className='row g-2'>
                        {studentsgpa.sgpaArray.map((sgpaEntry, index) => (
                            <div className='col-md-4' key={index}>
                                <div className="card bg-dark  font-monospace rounded-2">

                                    <div className="card-header">
                                        <div className="text-danger fw-bold fs-5 d-flex justify-content-between align-items-center">Remove Sgpa<i className='fa-solid text-light fa-trash' onClick={() => removeSgpa(index)}></i></div>
                                    </div>

                                    <div className="card-body ">
                                        <div className='mb-2 '>
                                            <div className="text-primary "><span className='text-warning fw-bold '>SGPA: </span>{sgpaEntry.sgpa}</div>

                                            <div className="text-warning"><span className='text-danger fw-bold '>credit hours: </span>{sgpaEntry.cr}</div>
                                            <div className="text-primary"><span className='text-warning fw-bold '>quality points: </span>{sgpaEntry.qp}</div>

                                        </div>

                                    </div>
                                    <div className="card-footer">
                                        <span className='text-danger'>Result on:{" "}</span>
                                        <span className='text-secondary'> {new Date(
                                            sgpaEntry.timestamp.seconds * 1000
                                        ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div >
        </>

    )
}

export default Sgpatable