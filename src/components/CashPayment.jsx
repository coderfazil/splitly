import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/CashPayment.module.css';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GroupActions } from '../store/GroupSlice';
import { friendActions } from '../store/FriendSlice';
import { ExpenseActions } from '../store/ExpenseSlice';
const CashPayment=()=>{
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [settleAmount, setSettleAmount] = useState("");
  const [searchParams]=useSearchParams();
  const selectedList=searchParams.get('selectedList');
  const {id}=useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const now = new Date();
  const months=['Jan','Feb','Mar','Apr','May','Jan','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Fetch groups and friends from Redux


  // Select members based on tab

  const groups = useSelector((store) => store.group.groups);
  const friends = useSelector((store) => store.friend.friends);

  console.log("Redux Groups:", groups); // Debugging ke liye

  // Select members based on tab
  let members = [];

  if (selectedList === "groups") {
    const group = groups.find((g) => g._id == id);
    console.log("in the cas",group)
    if (group) {
      members = group.members || [];
    }
  } else {
    const friend = friends.find((f) => f._id == id);
    if (friend) {
      members = [friend]; // Friends list me single friend hoga
    }
  }

  console.log("Filtered Members:", members); // Debugging ke liye

   

  // Handle settlement
  const handleSettle = (e) => {
    e.preventDefault();
   
    if (!selectedPerson || settleAmount === "") return;

    const amount = Number(settleAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount");
    const settleData = {
      id: new Date().getTime(), // Unique ID for sorting
      expId:id,
      payer: selectedPerson.name,
      payee: "You",
      amount: amount, // Input se bhi le sakte ho
      date: {
        fullDate: now.toISOString(), // Original Date
        day: now.getDate(),
        month: months[now.getMonth()],
        year: now.getFullYear(),
      },
    };

    dispatch(ExpenseActions.settleUp(settleData));

   
      dispatch(friendActions.settleFriendBalance({ id: selectedPerson.id, amount }));
   
      dispatch(GroupActions.settleGroupMemberBalance({ id: selectedPerson.id, amount }));
    

    setSettleAmount("");
    setSelectedPerson(null);
    navigate(`/${selectedList}/${id}?selectedList=${selectedList}`);

  };

return(
<div className={styles["settle-up-container"]}>
  <h3 className={styles["settle-up-header"]}>Settle Up</h3>
  
  <select className={styles["select-member"]} onChange={(e) => setSelectedPerson(JSON.parse(e.target.value))}>
    <option value="">Select {selectedList === "groups" ? "Group Member" : "Friend"}</option>
    {members.map((member) => (
      <option key={member.id} value={JSON.stringify(member)}>
        {member.name} - Balance: Rs {member.balance+member.mbalance}
      </option>
    ))}
  </select>

  {selectedPerson && (
    <>
      <p className={styles["balance-info"]}>{selectedPerson.name}'s Balance: Rs {selectedPerson.balance + selectedPerson.mbalance}</p>
      <input
        type="number"
        placeholder="Enter amount"
        value={settleAmount}
        onChange={(e) => setSettleAmount(e.target.value)}
        className={styles["amount-input"]}
      />
      <button onClick={handleSettle} className={styles["settle-button"]}>Settle Up</button>
    </>
  )}
</div>
)
}
export default CashPayment;