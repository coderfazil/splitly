import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from "../store/AuthSlice"; 
import defaultAvatars from "../utils/avatarImages"; 
const Header=()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get logged-in user
  const handleLogout = () => {
    dispatch(AuthActions.logout());
    navigate("/login");
  };
  const handleSelectChange = (event) => {
    if (event.target.value === "logout") {
      handleLogout();
    }
  };
  
return(
  <div className={styles['head']}>
    <div className={styles['logo-name']}>
    <h3>Splitly</h3>
    </div>
   
    <div className={styles['user']}>
      <div className={styles['user-image']}>
      <img src={user?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} alt="User Avatar" />
      </div>
      <div className={styles['user-name']}>
        <h4>{user ? user.name : "Guest"}</h4>
      </div>
      <div className={styles['user-details']}>
        <select name="" id=""  onChange={handleSelectChange}>
          <option value=""></option>
          <option value="details">
            details</option>
            <option value="details">
            Your account</option>
            <option value="logout">
            Logout
            </option>
        </select>
      </div>
    </div>
  </div>
)
}
export default Header;