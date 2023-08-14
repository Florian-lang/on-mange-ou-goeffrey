import React from "react";

const PerimeterSelect = (props) => {
    console.log("PerimeterSelect props:", props);
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

            <div className="left-5 top-1 relative" onClick={props.randomLocation}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path 
                        fillRule="evenodd" 
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" 
                        clipRule="evenodd" 
                    />
                </svg>
            </div>

        </div>
    );
};

export default PerimeterSelect;
