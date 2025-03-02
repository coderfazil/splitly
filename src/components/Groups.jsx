import MainHeader from "./MainHeader";
import styles from '../styles/Groups.module.css';
import { useDispatch, useSelector } from "react-redux";
import Lists from "./Lists";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchGroups } from "../actions/groupActions";
import { fetchFriends } from "../store/FriendSlice";

const Groups = () => {
  const dispatch = useDispatch();
  const { groups, isLoading, error } = useSelector((state) => state.group);
  const { friends } = useSelector((store) => store.friend);  

  const [searchParams] = useSearchParams();
  const selected = searchParams.get('selected');

  // ✅ Ensure initial state is an empty array
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("Dispatching fetchGroups...");
    dispatch(fetchGroups());
    dispatch(fetchFriends());
  }, [dispatch]);
  


  useEffect(() => {
    if (selected === "groups" && Array.isArray(groups)) {
      setList(groups);
    } else if (Array.isArray(friends)) {
      setList(friends);
    } else {
      setList([]); // ✅ Ensure it's always an array
    }
  }, [selected, groups, friends]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <MainHeader />
      {/* ✅ Check before passing to Lists */}
      <Lists list={Array.isArray(list) ? list : []} />
    </>
  );
};

export default Groups;
