import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal';

export default function EmployeeList() {
  const [user, setUser] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState<number[]>([]);

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

  const handleCheckBox = useCallback(
    (e: any): void => {
      const { value, checked } = e.target;
      console.log(value);
      if (checked) {
        setIsChecked([...isChecked, value]);
      } else {
        setIsChecked(isChecked.filter((e) => e !== value));
      }
    },
    [isChecked]
  );

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete?')) {
      isChecked.forEach((id) => {
        axios.delete(`http://localhost:8000/user/${id}`).then((res) => {
          alert('Removed Successfully');
          window.location.reload();
        });
      });
    }
  }, [isChecked]);

  return (
    <>
      <div className="container">
        <div className="user-list">
          <button className="dltBtn" onClick={handleDelete}>
            Delete User
          </button>
          {user &&
            user.map(
              (items: {
                id: number;
                Name: string;
                Address: string;
                Phone: string;
                isChecked: any;
              }) => {
                const { id, Name, Address, Phone } = items;
                return (
                  <>
                    <div className="list-item" key={id}>
                      <input
                        type="checkbox"
                        value={id}
                        checked={items.isChecked}
                        onChange={(e) => handleCheckBox(e)}
                      ></input>
                      <p>Name : {Name}</p>
                      <p>Address : {Address}</p>
                      <p>Phone : {Phone}</p>
                      <button
                        className="editBtn"
                        onClick={() => {
                          setModal(!modal);
                          // setIsUpdate(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <UpdateModal
                      open={modal}
                      setmodal={setModal}
                      id={id}
                      userName={Name}
                      userAddress={Address}
                      userPhone={Phone}
                    />
                  </>
                );
              }
            )}
        </div>
      </div>
    </>
  );
}
