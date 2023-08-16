import React from "react";

const PerimeterSelect = (props) => {
    return (
        <div className="z-400 relative">
            <select value={props.selectedPerimeter} onChange={props.onPerimeterChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500"
            >
                <option value={1000}>1 km</option>
                <option value={2000}>2 km</option>
                <option value={3000}>3 km</option>
                <option value={4000}>4 km</option>
                <option value={5000}>5 km</option>
            </select>
        </div>
    );
};

export default PerimeterSelect;
