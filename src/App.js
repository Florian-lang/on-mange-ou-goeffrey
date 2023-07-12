import './App.css';
import { useState } from 'react';
import MapComponent from './Component/MapComponent';
import HomeComponent from './Component/HomeComponent';

function App() {
  const [showMap, setShowMap] = useState(false);

  const handleEnterClick = () => {
      setShowMap(true);
  }

  return (
      <div className="home-container">
          {showMap ? 
          (
              <MapComponent/>
          ) : 
          ( 
              <HomeComponent
                  enterClick={handleEnterClick}
              />
          )}
      </div> 
  );
}

export default App;
