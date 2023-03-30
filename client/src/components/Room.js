import React from "react";

export default function Card() {
    return (
        <div className="card">
            <img src="../images/phong.jpg" className="card--image" />
            <div className="card--stats">
                <img />
                <span>5.0</span>
                <span>(6) • </span>
                <span>USA</span>
            </div>
        </div>
    )
}