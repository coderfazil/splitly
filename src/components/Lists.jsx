import styles from '../styles/Lists.module.css';
import {Link,useSearchParams} from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
const Lists=({list})=>{
  const [searchParams]=useSearchParams();
  const selected=searchParams.get('selected')
return(
  <>
  {list.map((friend)=>(
    <Link to={`/${selected}/${friend._id}?selectedList=${selected}`} className={styles['link-tag']}>
    <div className={styles['group-div']}>
   
    <div className={styles['group-name']}>
      <span>{friend.name}</span>
    </div>
    <div className={styles['edit-link']}>
    <Link to={`edit/${friend.id}`}>
    
      <span className={styles['edit']}><CiEdit /></span>
    </Link>
    </div>
  </div>
  </Link>
  
)
)}
</>
)
}
export default Lists;