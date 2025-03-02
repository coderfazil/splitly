import { Navigate, useNavigate, useSearchParams,useParams } from 'react-router-dom';
import styles from '../styles/MainHeader.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
const MainHeader=()=>{
  const [searchParams]=useSearchParams();
  const selected=searchParams.get('selected');
  const selectedList=searchParams.get('selectedList');
  const [clicked,setClicked]=useState(true);
  const {id}=useParams();
  const handleSettleBtn=()=>{
setClicked(false);
  }
  const handleHideBtn=()=>{
    setClicked(true);
  }

  let name;
  
  
  if(id){
    console.log("in id");
if(selectedList==='groups'){
  const {groups}=useSelector(store=>store.group);
  groups.map(group=>{
    group._id==(id)? name=group.name:''
  })
}
else{
  const {friends}=useSelector(store=>store.friend);
  friends.map(friend=>{
    friend._id==(id)? name=friend.name:''
  })
}
  }
  const navigate=useNavigate();
  let content;
  const handleOnClick=()=>{
    navigate(`/create/${selected}`);
  }
  const handleAddExpense=()=>{
    navigate(`/add-expense/${id}?selectedTab=${selectedList}`);
  }
  const handleCashPayment = () => {
    navigate(`/cash-payment/${id}?selectedList=${selectedList}`);
  };
  if(selected==='groups' || selected==='friends'){
     content=<div className={styles['dash-buttons']}>
    <button className={styles['dash-btn-1']} onClick={()=>handleOnClick()}>Add {selected}</button>
  </div>
  }else{
    
    content= <div className={styles['dashboard-btns-div']}><div className={styles['dash-buttons']}>
    <button className={styles['dash-btn-1']} onClick={()=>handleAddExpense()}>Add an Expense</button>
    <button className={styles['dash-btn-2']} onClick={handleSettleBtn}>Settle Up</button>
    </div>
    <div className={`${styles['payment-details']} ${clicked==true && styles['hidden'] }`}>
      <div className={styles['hide-list']}><button onClick={handleHideBtn}><RxCross2 /></button></div>
      <ul className={styles['payment-list']}>
        <li className={styles['list-items']}><button onClick={handleCashPayment}>Record a cash Payment</button></li>

        <li className={styles['list-items']}><a href="">Online payment</a></li>
        <li className={styles['list-items']}><a href="">Online payment</a></li>
        <li className={styles['list-items']}><a href="">Online payment</a></li>
      </ul>
    </div>
    </div>
   
    
    
   
  }
   
 
  return(
    
<div className={styles['dash-header']}>
<h1 className={styles['dash-heading']}>{name? name:selected}</h1>
{content}

  </div>

  );
}
export default MainHeader;