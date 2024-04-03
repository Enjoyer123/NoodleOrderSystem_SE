import styles from "../../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from 'sweetalert2';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Credentials!'
      });
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
