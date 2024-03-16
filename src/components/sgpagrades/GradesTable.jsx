import React from 'react'

const GradesTable = () => {
    return (
        <div className="border rounded px-2">
            <h1 className='fw-bold mt-3 border-bottom mb-3' style={{ color: "#111633" }}>Grades Table </h1>
            <table className="table table-striped table-hover">
                <thead className='text-center'>
                    <tr>
                        <th scope="col">Letter Grader</th>
                        <th scope="col">Grade Points</th>
                    </tr>
                </thead>
                <tbody className='fw-bold text-center'>
                    <tr>
                        <td>A</td>
                        <td>4.0</td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td>3.0</td>
                    </tr>
                    <tr>
                        <td>C</td>
                        <td>2.0</td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>1.0</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default GradesTable