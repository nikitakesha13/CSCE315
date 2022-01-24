import Popup from "./popup.component"
import { useState } from 'react'
import "./style.css"

const DogProfile = ({dog}) => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <body>
            <div>
                <input type="button" class="dog-button" value={dog.name} onClick={togglePopup}/>&nbsp;&nbsp;&nbsp;
                {isOpen && <Popup 
                        content={<>
                            <h3>{dog.name}</h3>
                            <p className="dog-display">ID: {dog._id}</p>

                            <p className="dog-display">Breed: {dog.breed}</p>
                            <p className="dog-display">Age: {dog.age}</p>
                            <p className="dog-display">Size: {dog.size}</p>
                            <p className="dog-display">Activity: {dog.activity}</p>
                            <p className="dog-display">Aggression: {dog.aggression}</p>
                            <p className="dog-display">Potty Trained: {dog.potty}</p>
                            <p className="dog-display">UTD on vaccines: {dog.vaccine}</p>
                            <p className="dog-display">Bio: {dog.bio}</p>
                        </>}
                    handleClose={togglePopup}
                    />}
            </div>     
        </body>   
    );
}

export default DogProfile;
