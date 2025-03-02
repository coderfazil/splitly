import { useRef, useState, useEffect } from "react";
import styles from "../styles/CreateGroups.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../actions/groupActions"; // ✅ API call import karein
import { useParams, useNavigate } from "react-router-dom";


const CreateGroups = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector((store) => store.group.groups);

  // ✅ Prevents `find` error
  const existingGroup = id 
  ? groups.find((group) => String(group._id) === id) 
  : null;

  
  const user = useSelector((store) => store.auth.user); //  Redux store se user data lo

  const gname = useRef();
  const file = useRef();
  const [imgUrl, setImgUrl] = useState("");
  const [members, setMembers] = useState([
    {
      id: Math.random(),
    name: user?.name || "", // ✅ Redux se user ka naam
    email: user?.email || "",
    balance: 0,
    mbalance: 0,
    },
  ]);
  const [totalMembers, setTotalMembers] = useState(1);

  useEffect(() => {
    if (existingGroup) {
      gname.current.value = existingGroup.name;
      setImgUrl(existingGroup.imgUrl);
      setMembers(existingGroup.members);
      setTotalMembers(existingGroup.totalMembers);
    }
  }, [existingGroup]);

  const handleMemberChange = (value, index, field) => {
    const updatedMembers = members.map((member, i) =>
      index === i ? { ...member, [field]: value } : member
    );
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([
      ...members,
      { id: Math.random(), name: "", email: "", balance: "", mbalance: "" },
    ]);
    setTotalMembers(totalMembers + 1);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const image = file.current.files[0] ? file.current.files[0].name : imgUrl;

    const group = {
      name: gname.current.value,
    imgUrl: image,
    members: members.map((m) => ({ name: m.name, email: m.email })), // ✅ Members include ho
    };

    dispatch(createGroup(group,dispatch)); // ✅ API call backend pe jayegi

    navigate("/groups/?selected=groups");
  };

  return (
    <div className={styles["create-form"]}>
      <div className={styles["form"]}>
        <form className={styles["form-tag"]} onSubmit={handleSave}>
          <h3>{existingGroup ? "Edit Group" : "Start a new Group"}</h3>
          <div className={styles["name"]}>
            <label>My group should be called...</label>
            <input type="text" placeholder="Abc....etc" ref={gname} required />
          </div>
          <div className={styles["name"]}>
            <label>Choose an image...</label>
            <input type="file" ref={file} />
          </div>
          <div className={styles["group-members"]}>
            <h3> Group members</h3>
            {members.map((member, index) => (
              <div key={index} className={styles["member"]}>
                <input type="hidden" value={member.id} />
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  name="mname"
                  onChange={(e) => handleMemberChange(e.target.value, index, "name")}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={member.email}
                  name="memail"
                  onChange={(e) => handleMemberChange(e.target.value, index, "email")}
                />
              </div>
            ))}
            <button
              type="button"
              className={styles["add-person"]}
              onClick={handleAddMember}
            >
              Add a member
            </button>
          </div>
          <input type="submit" className={styles["save-members"]} value="Save" />
        </form>
      </div>
    </div>
  );
};

export default CreateGroups;
