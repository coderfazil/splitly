import { useRef, useState, useEffect } from 'react';
import styles from '../styles/AddFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { friendActions } from '../store/FriendSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend } from "../store/FriendSlice";

const AddFriend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const friends = useSelector(store => store.friend.friends);
  const existingFriend = id ? friends.find(friend => friend._id == id) : null;


  const fname = useRef();
  const femail = useRef();
  const file = useRef();
  const [imgUrl, setImgUrl] = useState('');
  const [balance,setBalance]=useState('');
  const [mbalance,setMbalance]=useState('');


  useEffect(() => {
    if (existingFriend) {
      fname.current.value = existingFriend.name;
      femail.current.value = existingFriend.email;
      setImgUrl(existingFriend.imgUrl);
      setBalance(existingFriend.balance);
     setMbalance(existingFriend.mbalance);
      console.log("ineffect",balance,mbalance);
    }
  }, [existingFriend]);

  const handleSave = (event) => {
    event.preventDefault();
    const image = file.current.files[0] ? file.current.files[0].name : imgUrl;
    const friend = {
      name: fname.current.value,
      id: existingFriend ? existingFriend._id : Math.random(),
      email: femail.current.value,
      imgUrl: image,
      mbalance:mbalance,
      balance:balance
    };

    if (existingFriend) {
      dispatch(friendActions.editFriend(friend));
    } else {
      dispatch(addFriend(friend));
    }
    navigate("/friends/?selected=friends");
  };

  return (
    <div className={styles['create-form']}>
      <div className={styles['form']}> 
        <form className={styles['form-tag']} onSubmit={handleSave}>
          <h3>{existingFriend ? 'Edit Friend' : 'Add a new friend'}</h3>
          <div className={styles['form-fields']}>
            <label>Enter the name</label>
            <input type="text" placeholder='Abc....etc' required ref={fname} />
          </div>
          <div className={styles['form-fields']}>
            <label>Enter the email</label>
            <input type="text" placeholder='Abc@gmail.com' required ref={femail} />
          </div>
          <div className={styles['form-fields']}>
            <label>Choose an image...</label>
            <input type="file" ref={file} />
          </div>
          <input type="submit" className={styles['save']} value="Save" />
        </form>
      </div>
    </div>
  );
};
export default AddFriend;
