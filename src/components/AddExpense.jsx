import { useRef, useState } from 'react';
import styles from '../styles/AddExpense.module.css';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, ExpenseActions, fetchExpenses } from '../store/ExpenseSlice';
import { GroupActions } from '../store/GroupSlice';
import { friendActions } from '../store/FriendSlice';

const AddExpense=()=>{
  

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const desc=useRef();
  const [expCost,setExpCost]=useState('');
  const [selectedValue,setSelectedValue]=useState('');
  const {id}=useParams();
  const [searchParams]=useSearchParams();
  const user = useSelector((state) => state.auth.user);
  const selectedTab=searchParams.get('selectedTab');
  const now=new Date();
  const months=['Jan','Feb','Mar','Apr','May','Jan','Jul','Aug','Sep','Oct','Nov','Dec'];
  let totalMembers=2;
  let giveName="";
  let group;
  if(selectedTab==="groups"){
    const {groups}=useSelector(store=>store.group);
     group=groups.filter((gr)=>{
      if(gr._id==id){
        totalMembers=gr.totalMembers;
        return gr;
      }
    
    });
    giveName=group[0].name;
   
    
  }else{
    const {friends}=useSelector(store=>store.friend);
    friends.forEach(fr=>{
      if(fr._id==id){
        giveName=fr.name;
      }
    })
    

  }
 
  const [costDistribution,setCostDistribution]=useState(0);
 


 
 
  const handleOnChange=(event)=>{
    setExpCost(event.target.value);
    let temp=(Number(event.target.value)/totalMembers).toFixed(2);
    setCostDistribution(temp);
  
  }
  const handleSelectedChange=(event)=>{
setSelectedValue(event.target.value);
  }
  const handleOnSubmit=(event)=>{
event.preventDefault();
const expense={
expType:selectedTab,
expId:id,
desc:desc.current.value,
paidBy:user?user.name:selectedValue,
date: {
  fullDate: now.toISOString(), // Original Date
  day: now.getDate(),
  month: months[now.getMonth()],
  year: now.getFullYear(),
},
expCost:expCost,
paid:'equally',
moneyLent:((Number(expCost)/totalMembers)*(totalMembers-1)).toFixed(2),

};

dispatch(addExpense(expense));

dispatch(fetchExpenses(id));

navigate(`/${selectedTab}/${id}?selectedList=${selectedTab}`);


  }
return (
<div className={styles['expense-box']}>
  <div className={styles['add-expense']}>
    <div className={styles['expense-header']}>
      <h3>Add an expense</h3>
    </div>
    <div className={styles['with-whom']}>
      <span>With <b>you</b> and: <b> {giveName}</b></span> 
    </div>
    <div className={styles['expense-form']}>
    <form action="" onSubmit={handleOnSubmit}>
    <div className={styles['expense-desc']}>
      <input type="text" className={styles['desc']} placeholder='Enter a description' ref={desc}/>
    </div>
    <div className={styles['expense-cost']}>
      <span><FaRupeeSign />
      </span>
      <div className={styles['cost-values']}>
      <input type="text" className={styles['cost']} placeholder='0.00' onChange={handleOnChange} />
      </div>
    </div>
    <div className={styles['paid-by']}>
      <span>Paid By</span>
      <div className={styles['paid-by-list']}>
      <select name="" id="" className={styles['select-list']} value={selectedValue} onChange={handleSelectedChange}>
      <option value="You" >You</option>
        <option value="Fazil" >Fazil</option>
        <option value="Ubaid">ubaid</option>
        <option value="Himayu">Himayu</option>
      </select>
      </div>
      <span>and split equally</span>
    </div>
    <div className={styles['cost-distributed']}>
      <span className={styles['money-icon']}><FaRupeeSign /></span>
      <span className={styles['cost-distribution']}>{costDistribution}/per person</span>
    </div>
    <div className={styles['expense-date']}>
      <span>16-dec-2024</span>
    </div>
    <div className={styles['save']}>
    <button type='submit'>save</button>
    </div>
   </form>
      
    </div>
   
  </div>
  
</div>
)
}
export default AddExpense;