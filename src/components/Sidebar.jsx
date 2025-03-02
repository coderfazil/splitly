import { Link, useParams, useSearchParams } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';
import { useState } from 'react';

const Sidebar=()=>{
  const [selectedTab,setSelectedTab]=useState('dashboard');
  const handleOnClick=(tab)=>{
    setSelectedTab(tab);
  }

return(
  <div>
    
  <div className={styles['sideBar']}>
<ul className={styles['sideBar-options']}>
  <li className={styles['list-items']}>
    <Link to={`/dashboard?selected=dashboard`} className={` ${styles['items-link']} ${selectedTab==='dashboard'&&styles.active} `} onClick={()=>handleOnClick('dashboard')}>Dashboard</Link>
    
  </li>
  <li className={styles['list-items']}>
  <Link to={"/all-expenses?selected=All-expense"} className={` ${styles['items-link']} ${selectedTab==='expenses'&&styles.active} `} onClick={()=>handleOnClick('expenses')}>All Expenses</Link>
    
  </li>
  <li className={styles['list-items']}>
    <Link to={"/groups?selected=groups"} className={`${styles['items-link']} ${selectedTab==='groups'&&styles.active}`} onClick={()=>handleOnClick('groups')}>Groups</Link>
  </li>
  <li className={styles['list-items']}>
  <Link to={"/friends?selected=friends"} className={` ${styles['items-link']} ${selectedTab==='friends'&&styles.active} `} onClick={()=>handleOnClick('friends')}>Friends</Link>
    
  </li>
  
</ul>
  </div>
  </div>
)
}
export default Sidebar;