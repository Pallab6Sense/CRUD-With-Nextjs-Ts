import axios from 'axios';
import { useState } from 'react';

interface propsType  {
  open: boolean;
  setmodal:any
  id: number;
  userName: string;
  userAddress: string;
  userPhone: string;
};

export default function UpdateModal(props: propsType) {
  const { open,setmodal, id, userName, userAddress, userPhone } = props;

  console.log(id);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    axios
      .post('http://localhost:8000/user', {
        Name: name,
        Address: address,
        Phone: phone,
      })
      .then((response) => {
        alert('Data Saved Successfully');
        console.log(response.data);
      });
  };

  if (!open) return null;

  return (
    <div className="container">
    <div className="modal">
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <div className="">
            <label className="">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="">
            <label className="">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div className="">
            <label className="">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
          </div>
          <div className="">
            <button className="submit" type="submit">
              Update
            </button>
          </div>
          <div className="">
            <button
              className="close"
              onClick={() => {
                setmodal(!open)
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
