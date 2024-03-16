import React, { useCallback, useEffect, useRef, useState } from "react";
import Sgpatable from "../components/sgpatable/sgpatable";
import { Link } from "react-router-dom";
import { db } from "../components/firbase/Firebase";
import { setDoc, doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Index({ userdata, isuserlogin }) {
    const auth = getAuth();
    const buttonrefForm = useRef(null);
    const [sgpa, setSgpa] = useState();
    const [message, setMessage] = useState(null);
    const [studentsgpa, setStudentSgpa] = useState([]);
    const [inputs, setInputs] = useState([{ qualitypoints: "", credits: "" }]);

    const AddNewInput = () => {
        setInputs([...inputs, { qualitypoints: "", credits: "" }]);
    };

    const handleInputChange = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const ClearInputs = () => {
        setInputs([{ qualitypoints: "", credits: "" }]);
    };

    const fetchData = useCallback(async () => {
        const user = auth.currentUser;
        if (!user) {
            console.log("User not authenticated");
            return;
        }
        try {
            const sgpaDataRef = doc(collection(db, "sgpa_data"), `${user.uid}`);
            const snapshot = await getDoc(sgpaDataRef);

            if (snapshot.exists()) {
                const currentData = snapshot.data();
                setStudentSgpa(currentData);
            } else {
                console.log("Data not found");
            }
        } catch (err) {
            setMessage("Error Data Not show");
            setTimeout(() => {
                setMessage(null);
            }, 5000);
            console.log("Error fetching data:", err.message);
        }
    }, [auth.currentUser]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalQualityPoints = inputs.reduce((total, input) => total + parseFloat(input.qualitypoints), 0);
        const totalCredits = inputs.reduce((total, input) => total + parseFloat(input.credits), 0);
        const result = totalQualityPoints / totalCredits || 0;

        const finalResult = result.toFixed(2);
        setSgpa(finalResult);

        const user = auth.currentUser;
        if (!user) {
            alert("User not authenticated");
            return;
        }

        try {
            const sgpaDataRef = doc(collection(db, "sgpa_data"), `${user.uid}`);
            const snapshot = await getDoc(sgpaDataRef);

            let updatedArray = [];
            if (snapshot.exists()) {
                const currentData = snapshot.data();
                updatedArray = [
                    ...currentData.sgpaArray,
                    {
                        qp: parseFloat(totalQualityPoints),
                        cr: parseFloat(totalCredits),
                        sgpa: finalResult,
                        timestamp: new Date(),
                    },
                ];
                await updateDoc(sgpaDataRef, { sgpaArray: updatedArray });
                setInputs([{ qualitypoints: "", credits: "" }]);
            } else {
                await setDoc(sgpaDataRef, {
                    userName: user.displayName,
                    userId: user.uid,
                    sgpaArray: [
                        {
                            qp: parseFloat(totalQualityPoints),
                            cr: parseFloat(totalCredits),
                            sgpa: finalResult,
                            timestamp: new Date(),
                        },
                    ],
                });
            
            }
            setMessage("Data stored successfully");
            setTimeout(() => {
                setMessage(null);
            }, 5000);
            setInputs([{ qualitypoints: "", credits: "" }]);
        } catch (error) {
            console.error("Error updating SGPA data:", error);
        }
        fetchData();
    };

    const handleClickHiddenButton = () => {
        if (buttonrefForm.current) {
            buttonrefForm.current.click();
        }
    };

    return (
        <>
            <div className="input_form_container">
                <div className="text-center">
                    <h1 className="fw-bold text_form_heading">
                        SGPA Calculator{" "}
                        <sup className="" style={{ fontSize: "18px" }}>
                            ( By using quality points )
                        </sup>
                    </h1>
                    <div className="text-danger fs-5 font-monospace fw-bold">
                        <u>{message}</u>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    {inputs.map((data, index) => (
                        <div key={index}>
                            <div className="row g-2 mt-2">
                                <div className="fw-bold text_form_heading">
                                    Subject: ( {index + 1} )
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="input_field w-100 me-3"
                                        min="1"
                                        value={data.qualitypoints}
                                        onChange={(e) =>
                                            handleInputChange(index, `qualitypoints`, e.target.value)
                                        }
                                        type="number"
                                        required
                                        placeholder="Quality Points"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="input_field w-100"
                                        value={data.credits}
                                        onChange={(e) =>
                                            handleInputChange(index, "credits", e.target.value)
                                        }
                                        type="number"
                                        required
                                        placeholder="Credit hour's"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 ">
                        {sgpa && (
                            <h4 className="text_form_heading fw-bold text-uppercase">
                                result : {sgpa ? sgpa : ""}
                            </h4>
                        )}
                        <button
                            className="btn d-none form_button border-0 rounded-1 me-3"
                            ref={buttonrefForm}
                            type="submit"
                        >
                            Calculate SGPA
                        </button>
                    </div>
                </form>

                <div className="my-2" id="formBtn">
                    <button
                        className="btn form_button border-0 rounded-1"
                        onClick={handleClickHiddenButton}
                        type="submit"
                    >
                        Calculate SGPA
                    </button>
                    <button
                        className="btn form_button rounded-1 mx-md-2"
                        onClick={AddNewInput}
                    >
                        Add New Field
                    </button>
                    <button className="btn form_button rounded-1" onClick={ClearInputs}>
                        Clear
                    </button>
                </div>
                {isuserlogin ? (
                    <div className=" fw-bold text-primary rounded text-capitalize">
                        <span>You have successfully logged in as </span>
                        <span className="text-danger">( {userdata.displayName} )</span>
                    </div>
                ) : (
                    <div className="small">
                        Wants to save your data? <Link to="/login">Login Pls</Link>
                    </div>
                )}
            </div>

            {studentsgpa ? (
                <div className="sgpa_container">
                    <Sgpatable studentsgpa={studentsgpa} setStudentSgpa={setStudentSgpa} />
                </div>
            ) : null}
        </>
    );
}

export default Index;
