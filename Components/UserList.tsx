import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal';
import UserDelete from './UserDelete';
import User from './User';
import {itemsInterface } from './UserListInterface';

export default function EmployeeList() {
  const [user, setUser] = useState<[]>([]);
  const [isChecked, setIsChecked] = useState<number[]>([]);
  // console.log('checkbox', isChecked);

  useEffect(() => {
    axios
      .get('http://localhost:8000/user')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="user-list">
          <UserDelete isChecked={isChecked} />
          {user &&
            user.map(
              (items: itemsInterface) => {
                const { id, Name, Address, Phone } = items;
                return (
                  <User
                    key={id}
                    id={id}
                    Name={Name}
                    Address={Address}
                    Phone={Phone}
                    items={items}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                  />
                );
              }
            )}
        </div>
      </div>
    </>
  );
}
