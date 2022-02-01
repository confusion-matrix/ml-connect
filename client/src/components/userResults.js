import React from 'react';
import records from '';


export default function Records(){
    return(
        <div className="row">
            {records.map((record) => (
                <div key={record._id} className="col-lg-3 col-md-4 col-sm-6">
                    
                    <div> {record.name}</div>
                    <div> {record.result}</div>

                </div>
            ))}
        </div>
    )
}