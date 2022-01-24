import DogProfile from "./dog-profile.component"
import Popup from "./popup.component"
import { useState } from 'react'
import "./style.css"

const Dogs = ({dogs}) => {

    const showDogProfile = ({dog}) => {
        {isOpen && <Popup 
            content={<>
                <DogProfile dog={dog}/>
            </>}
            handleClose={togglePopup}
        />}
    }

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {dogs.map((dog) => (
                <div>
                    {isOpen && 
                        <DogProfile dog={dog}/>
                    }
                </div> 
            ))}
        </>        
    )
}

export default Dogs;


