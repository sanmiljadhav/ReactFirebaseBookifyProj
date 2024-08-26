import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate} from "react-router-dom";

export default function Register() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  console.log("Firebase has", firebase);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const user = await firebase.signupUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        toast.success(`User with email ${email} has registered Successfully!`);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return toast.error(error.message);
    } finally{
      setLoading(false);  // Ensure loading is reset regardless of success or failure

    }
  };

  
  useEffect(()=>{
    if(firebase.isLoggedIn){
        navigate('/')
    }else{
        navigate('/register')
    }

},[firebase, navigate])


  return (
    <div className="container mt-5">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <hr />
        <p>Already have an Account, Please Sign in yourself here
            <Link to = '/login'> Signin</Link>
        </p>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating User..." : "Create User"}
        </Button>
      </Form>
    </div>
  );
}
