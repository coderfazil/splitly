import styles from '../styles/AllExpenses.module.css';
import MainHeader from './MainHeader';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseList from './ExpenseList';
import { fetchAllExpenses } from '../store/ExpenseSlice';
import { useEffect } from 'react';

const AllExpenses = () => {
  // Get all expenses from Redux store
  const dispatch = useDispatch();
  const { allExpenses, loading, error } = useSelector((state) => state.expense);
  useEffect(() => {
    dispatch(fetchAllExpenses()); // Fetch all expenses on component mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Sort expenses by date (latest first)
 // Filter expenses to exclude "group-expense"
 const filteredExpenses = [...allExpenses].sort((a, b) => new Date(b?.date?.fullDate) - new Date(a?.date?.fullDate)); // Sort latest first
console.log("filtered expenses",filteredExpenses);
  let lastMonthYear = ""; // To track last shown month

  return (
    <div>
      <MainHeader />
      <div className={styles['expenses-container']}>
        <h2>All Expenses</h2>
        <div className={styles['expense-box']}>
          {filteredExpenses.length > 0 ? (
           filteredExpenses.map((exp, index) => {
              const currentMonthYear = `${exp.date.month} ${exp.date.year}`;
              const showDivider = currentMonthYear !== lastMonthYear;
              
              lastMonthYear = currentMonthYear; // Update for next iteration

              return (
                <div key={index}>
                  {/* Step 1: Show Month-Year Divider */}
                  {showDivider && (
                    <div className={styles["time-divider"]}>
                      <span>{currentMonthYear}</span>
                    </div>
                  )}
                  {/* Step 2: Show expenses for this month */}
                  <ExpenseList exp={exp} />
                </div>
              );
            })
          ) : (
            <p>No expenses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
