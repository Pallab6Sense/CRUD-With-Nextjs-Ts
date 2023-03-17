import { useState } from 'react';
import AddUserModal from './AddUserModal';
import UserList from './UserList';

export default function Button() {
  const [modal, setModal] = useState(false);
  const [userList, setuserList] = useState(false);

  return (
      <div className="container">
      <div className="btnContainer">

        <div className="btnDiv">
          <button
            className="addBtn"
            onClick={() => {
              setModal(!modal);
              setuserList(!userList);
            }}
          >
            Add User
          </button>
          <div>
            <AddUserModal open={modal} setmodal={setModal} />
            {/* <UserList open={userList}></UserList> */}
          </div>
        </div>

      </div>
      </div>
  );
}
