import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Signup.module.css"; // Import module CSS

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({ name, email, password })).then((res) => {
            if (!res.error) navigate("/login"); // ✅ Redirect to login after successful signup
        });
    };

    return (
        <div className={styles.signupContainer}>
            <h2>Signup</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className={styles.inputField} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className={styles.inputField} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className={styles.inputField} 
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className={styles.button}
                >
                    {isLoading ? "Signing up..." : "Signup"}
                </button>
            </form>
            <p className={styles.redirectText}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
