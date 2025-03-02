import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import MainHeader from "./MainHeader";
import styles from '../styles/ExpenseShow.module.css';
import ExpenseList from "./ExpenseList";
import { fetchExpenses } from "../store/ExpenseSlice";
import { useEffect } from "react";

const ExpenseShow = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedList = searchParams.get("selectedList");
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchExpenses(id)); // Fetch expenses from backend
  }, [id, dispatch]);
  
  const expense = useSelector((store) => store.expense.expense || []);


  
 
 
  const expenseList = [...expense].sort((a, b) => new Date(b?.date?.fullDate) - new Date(a?.date?.fullDate));


  console.log("Expense state after filter:", expenseList);


  let lastMonthYear = "";
  let groupLists = [];
  let membersList = [];
  let totalMembers = 2;

  if (selectedList === "groups") {
    const { groups } = useSelector((store) => store.group);
    
    // ✅ **Fix: Ensure `groupList` exists before accessing members**
    const groupList = groups.filter((group) => group._id === id);  // `_id` use karo agar backend se yahi aa raha ho
    console.log("Group List:", groupList);

    if (groupList.length > 0) {
      membersList = groupList[0].members || []; // ✅ **Ensure `members` exists**
      groupLists = groupList;
      totalMembers = groupLists[0]?.totalMembers || 2;
    } else {
      membersList = []; // ✅ **Ensure empty array if no group found**
    }
  } else {
    const { friends } = useSelector((store) => store.friend);
    
    const friendList = friends.filter((friend) => friend._id === id);
    membersList = friendList.length > 0 ? friendList : [];
  }

  console.log("Members List:", membersList);

  return (
    <>
      <MainHeader />
      <div className={styles["expense-container"]}>
        <div className={styles["expense-box"]}>
          {expenseList.length > 0 ? (
            expenseList.map((exp, index) => {
              const month = exp.date?.month || "Unknown Month";
              const year = exp.date?.year || "Unknown Year";
              const currentMonthYear = `${month}-${year}`;
              const showDivider = currentMonthYear !== lastMonthYear;
              lastMonthYear = currentMonthYear;

              return (
                <div key={index}>
                  {showDivider && (
                    <div className={styles["time-divider"]}>
                      <span>{exp.date.month} {exp.date.year}</span>
                    </div>
                  )}
                  <ExpenseList exp={exp} totalMembers={totalMembers} />
                </div>
              );
            })
          ) : (
            <div className={styles["no-expense-box"]}>
              <p className={styles["no-expense"]}>No Expense yet</p>
            </div>
          )}
        </div>

        <div className={styles["balances"]}>
          <h3>Balances</h3>
          <div className={styles["members-list"]}>
            <ul className={styles["list"]}>
              {membersList.map((member, index) => (
                <li key={index} className={styles["member"]}>
                  <div className={styles["member-img"]}>
                    <img src="../../public/coppper-2.jpg" alt="" />
                  </div>
                  <div className={styles["member-details"]}>
                    <span className={styles["member-name"]}>{member.name}</span>
                    <span className={styles["member-balance"]}>
                      Owes Rs {selectedList === "friends" ? member.mbalance + member.balance : member.balance}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseShow;
