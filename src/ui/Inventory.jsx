import { useContext, useState, useEffect } from "react";
import { Context } from "../App";
import { ItemsList } from '../ItemsList';
import InvInteractionBox from './InvInteractionBox';

function Inventory({ setInventoryVisible }) {
    const { playerItems } = useContext(Context);
    const [selectedItem, setSelectedItem] = useState(null);


    {/*The following code makes it so when you click outside the inventory or interaction boxes, the inventory ui closes. I don't know how it works, I don't wanna know how it works, but just don't touch it since it will break.*/ }
    const inventoryButtonElement = document.querySelector('.inventoryButton');
    const handleClickOutside = (event) => {
        if (!event.target.closest('.inventoryUi') &&
            inventoryButtonElement &&
            !inventoryButtonElement.contains(event.target)) {
            setInventoryVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <div className="inventoryUi">
        <div className="inventoryBox">
            {playerItems.map((itemId) => {
                const item = ItemsList[itemId]
                return (
                    <button className="inventoryItem" onClick={() => setSelectedItem(itemId)}>
                        {item.name}
                    </button>
                )
            })}
        </div>

        {selectedItem && <InvInteractionBox selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
    </div>
};

export default Inventory;