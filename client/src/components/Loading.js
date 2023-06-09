import React from 'react'
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loading() {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '150px' }}>
            <div className="sweet-loading text-center">
                <RingLoader
                    color="#36d7b7"
                    loading={loading}
                    css=''
                    size={80}
                />
            </div>
        </div>
    )
}

export default Loading
