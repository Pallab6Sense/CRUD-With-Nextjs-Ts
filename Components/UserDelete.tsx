import axios from 'axios';
import { useCallback } from 'react';

interface propsTypes {
  isChecked: number[];
}
export default function UserDelete(props: propsTypes) {
  const { isChecked } = props;

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete?')) {
      isChecked.forEach((id) => {
        axios.delete(`http://localhost:8000/user/${id}`);
      });
      alert('Removed Successfully');
      window.location.reload();
    }
  }, [isChecked]);
  return (
    <>
      <div className="dlt-container">
        <button className="dltBtn" onClick={handleDelete}>
          Delete User
        </button>
      </div>
    </>
  );
}
