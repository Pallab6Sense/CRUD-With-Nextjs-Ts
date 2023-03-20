import { useCallback, useState } from 'react';
import UpdateModal from './UpdateModal';
import { itemsInterface } from './UserListInterface';

interface propsType {
  id: number;
  Name: string;
  Address: string;
  Phone: string;
  items: itemsInterface;
  isChecked: number[];
  setIsChecked: (isChecked: number[]) => void;
}
export default function User(props: propsType) {
  const { id, Name, Address, Phone, items, isChecked, setIsChecked } = props;

  const [isUpdateModal, setIsUpdateModal] = useState(false);
  

  const handleCheckBox = useCallback(
    (e: any): void => {
      const { value, checked } = e.target;
      checked
        ? setIsChecked([...isChecked, value])
        : setIsChecked(isChecked.filter((e) => e !== value));
    },
    [isChecked, setIsChecked]
  );

  return (
    <>
      <div className="list-item">
        <input
          type="checkbox"
          value={id}
          checked={items.isChecked}
          onChange={(e) => handleCheckBox(e)}
        />
        <p>Name : {Name}</p>
        <p>Address : {Address}</p>
        <p>Phone : {Phone}</p>
        <button
          className="editBtn"
          onClick={() => {
            setIsUpdateModal(true);
          }}
        >
          Edit
        </button>
        <UpdateModal
          open={isUpdateModal}
          setmodal={setIsUpdateModal}
          id={id}
          userName={Name}
          userAddress={Address}
          userPhone={Phone}
        ></UpdateModal>
      </div>
    </>
  );
}
