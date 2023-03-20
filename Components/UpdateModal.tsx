import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface propsType {
  open: boolean;
  setmodal: (open: boolean) => void;
  id: number;
  userName: string;
  userAddress: string;
  userPhone: string;
}

export default function UpdateModal(props: propsType) {
  const { open, setmodal, id, userName, userAddress, userPhone } = props;

  const [name, setName] = useState(userName);
  const [address, setAddress] = useState(userAddress);
  const [phone, setPhone] = useState(userPhone);

  const handleSubmit = () => {
    axios
      .put(`http://localhost:8000/user/${id}`, {
        Name: name,
        Address: address,
        Phone: phone,
      })
      .then((response) => {
        alert('Data Updated Successfully');
      });
  };

  // if (!open) return null;
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = open ? (
    <div className="container">
      <div className="overlay">
        <div className="update-user-modal">
          <div className="form">
            <form action="" onSubmit={handleSubmit}>
              <div className="">
                <label className="">Name</label>
                <input
                  type="text"
                  defaultValue={userName}
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
                  defaultValue={userAddress}
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
                  defaultValue={userPhone}
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
                    setmodal(!open);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root-update')!
    );
  } else {
    return null;
  }
}
