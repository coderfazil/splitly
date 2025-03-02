import styles from '../styles/Dashboard.module.css';
import MainHeader from './MainHeader';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  // Get friends and group data from Redux
  const friends = useSelector((state) => state.friend.friends);
  const groups = useSelector((state) => state.group.groups);

  // Calculation variables
  let totalOwe = 0;
  let totalOwed = 0;

  // Friends Calculation (Using both balance & mbalance)
  friends.forEach(friend => {
    const totalFriendBalance = Number(friend.balance) + Number(friend.mbalance); 

    if (totalFriendBalance < 0) {
      totalOwe += Math.abs(totalFriendBalance); // You owe this amount
    } else {
      totalOwed += totalFriendBalance; // Others owe you this amount
    }
  });



  // Total Balance = What others owe you - What you owe others
  const totalBalance = totalOwed - totalOwe;

  return (
    <div>
      <MainHeader />
      <div className={styles['dash-data']}>
        <div className={styles['data']}>
          <h4 className={styles['data-heading']}>Total Balance</h4>
          <span className={styles['data-value']}>
            {totalBalance >= 0 ? `+Rs${totalBalance}` : `-Rs${Math.abs(totalBalance)}`}
          </span>
        </div>
        <div className={styles['data']}>
          <h4 className={styles['data-heading']}>You Owe</h4>
          <span className={styles['data-value']}>-Rs{totalOwe}</span>
        </div>
        <div className={styles['data']}>
          <h4 className={styles['data-heading']}>You Are Owed</h4>
          <span className={styles['data-value']}>+Rs{totalOwed}</span>
        </div>
      </div>

      {/* List of people you owe money to */}
      <div className={styles['dash-main-content']}>
        <div className={styles['check']}>
          <div className={styles['owe']}>
            <h2>You Owe</h2>
            {friends
              .filter(friend => (friend.balance + friend.mbalance) < 0)
              .map(friend => (
                <div key={friend.id} className={styles['owe-person']}>
                  <div className={styles['person-img']}>
                    <img src={friend.imgUrl} alt="" />
                  </div>
                  <div className={styles['person-details']}>
                    <h4 className={styles['person-name']}>{friend.name}</h4>
                    <span className={styles['person-owe-details']}>
                      You Owe Rs{Math.abs(friend.balance + friend.mbalance)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* List of people who owe you money */}
        <div className={styles['check']}>
          <div className={styles['owed']}>
            <h2>You Are Owed</h2>
            {friends
              .filter(friend => (friend.balance + friend.mbalance) > 0)
              .map(friend => (
                <div key={friend.id} className={styles['owe-person']}>
                  
                  <div className={styles['person-details']}>
                    <h4 className={styles['person-name']}>{friend.name}</h4>
                    <span className={styles['person-owe-details']}>
                      {friend.name} Owes You Rs{friend.balance + friend.mbalance}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
