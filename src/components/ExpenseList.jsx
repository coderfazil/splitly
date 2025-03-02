import { useSearchParams } from 'react-router-dom';
import styles from '../styles/ExpenseList.module.css';
import { FaDollarSign } from "react-icons/fa";
import { useSelector } from 'react-redux';
const ExpenseList=({exp,totalMembers})=>{

 
 // const moneyLent=((Number(exp.expCost)/totalMembers)*(totalMembers-1)).toFixed(2);
  const [searchParams]=useSearchParams();
  const selectedList=searchParams.get('selectedList');
  const {friends}=useSelector(store=>store.friend);
const friend=friends.filter((fr)=>{
  if(exp.expId==fr._id)
    return fr;
})
console.log(friend);


  return(
    
<div className={styles['expense-list']}>
            {(exp.expType==="groups" || exp.expType==="friends") && (
            <div className={styles['expense']}>
              <div className={styles['expense-date']}>
              <span className={styles['expense-month']}>{exp.date.month}</span>
              <span className={styles['expense-day']}>{exp.date.day}</span>
              
              </div>
              <div className={styles['expense-desc']}>
                <span>{exp.desc}</span>
              </div>
          
              {selectedList=="friends"&&exp.expType=="group-expense"?<div className={styles['lent-friend']}>
                <span className={styles['you-lent']}>{friend[0].name} owes You</span>
                <span className={styles['lent-cost']}>Rs {Number(exp.expCost)}</span>
              </div>:<><div className={styles['paid-by']}>
                <span className={styles['you-paid']}>{exp.paidBy} paid</span>
                <span className={styles['cost']}>Rs{Number(exp.expCost)}</span>
              </div>
              <div className={styles['lent']}>
                <span className={styles['you-lent']}>{exp.paidBy} lent</span>
                <span className={styles['lent-cost']}>Rs {exp.moneyLent}</span>
              </div>
              </>
              
              
              }
           
              
            </div>)}
           {exp.type==="settleUp" && (         
            <div className={styles['settle-up']}>
              <div className={styles['money-icon']}>
                <span> <FaDollarSign /></span>
             
              </div>
              <div className={styles['settle-up-details']}>
                <span>
                  {exp.payer} Paid {exp.payee} Rs{exp.amount}
                </span>
              </div>
              <div className={styles['money-received']}>
                <span>You Received</span>
              </div>
              <div className={styles['received-cost']}>
                <span>Rs{exp.amount}</span>
        
              </div>
            </div>
              )}
              </div>

            
  )
}
export default ExpenseList;