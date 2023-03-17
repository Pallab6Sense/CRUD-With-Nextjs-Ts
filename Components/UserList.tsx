import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal';



export default function EmployeeList() {
  
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/user')
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (): void => {};

  return (
    <>
      <div className="container">
        <div className="user-list">
          {user &&
            user.map(
              (items: {
                id: number;
                Name: string;
                Address: string;
                Phone: string;
              }) => {
                const { id, Name, Address, Phone } = items;
                return (
                  <div className="list-item" key={id}>
                    <input
                      type="radio"
                      id="item"
                      name="user List"
                      value=""
                    ></input>
                    <p>Name : {Name}</p>
                    <p>Address : {Address}</p>
                    <p>Phone : {Phone}</p>
                    <button
                      className="editBtn"
                      onClick={() => {
                        setModal(!modal);
                        setIsUpdate(true);
                      }}
                    >
                      Edit
                    </button>
                    <UpdateModal
                      open={modal}
                      setmodal={setModal}
                      id={id}
                      userName={Name}
                      userAddress={Address}
                      userPhone={Phone}
                    />
                  </div>
                );
              }
            )}
        </div>
      </div>
    </>
  );
}
