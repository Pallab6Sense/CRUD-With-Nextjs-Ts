import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface propsType {
  open: boolean;
  setmodal: (open: boolean) => void;
}
export default function AddUserModal(props: propsType) {
  const { open, setmodal } = props;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/user', {
        Name: name,
        Address: address,
        Phone: phone,
      })
      .then((response) => {
        alert('Data Saved Successfully');
      });
  };
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = open ? (
    <div className="container">
      <div className="overlay">
      <div className="add-user-modal">
        
          <div className="form">
            <form action="" onSubmit={handleSubmit} >
              <div className="">
                <label className="">Name</label>
                <input
                  type="text"
                  value={name}
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
                <button className="submit" type="submit" >
                  Add
                </button>
              </div>
              <div className="">
                <button className="close" onClick={() => setmodal(!open)}>
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
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}
