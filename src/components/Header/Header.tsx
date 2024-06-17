import React from "react";
import {useUserInfo} from "../../contexts/UserContext";


const Header: React.FC = () => {
    const {selectedRoom} = useUserInfo()
   return <header className="header">
        <div>
            <img src="header-logo.png" alt="Header Logo"/>
        </div>
        <div>
            <h3>Playing with {selectedRoom.replace("Room", "")}</h3>
            <p>Win the game or win the job</p>
        </div>
    </header>
};

export default Header;
