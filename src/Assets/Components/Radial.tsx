import React, { SetStateAction, useState } from 'react';
import "../../RadialMenu.css"
interface props {
    setChat: React.Dispatch<SetStateAction<boolean>>;
    setNot: React.Dispatch<SetStateAction<boolean>>;
}
const RadialMenuComponent: React.FC<props> = ({ setChat, setNot }) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActive(!active);
    };

    return (
        <div className={`radial ${active ? 'active font-semibold' : ''}`}>
            <button className="triggerButton" onClick={handleClick}>
                <i className="fa fa-comment faOpen"></i>
                <i className="fa fa-bell faOpen"></i>
                <i className="fa fa-sign-out faOpen"></i>
                <i className="fa fa-times faClose"></i>
            </button>
            <ul className={`radialMenu ${active ? 'active' : ''}`}>
                <li id="fa-1" className="radialItem">
                    <a href="#" onClick={() => setChat(true)}>
                        <i className="fa fa-comment"></i>
                        <span>Chat Now</span>
                    </a>
                </li>
                <li id="fa-2" className="radialItem">
                    <a href="#" onClick={() => setNot(true)}>
                        <i className="fa fa-bell"></i>
                        <span>Notifications</span>
                    </a>
                </li>
                <li id="fa-3" className="radialItem">
                    <a href="#">
                        <i className="fa fa-sign-out"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default RadialMenuComponent;
