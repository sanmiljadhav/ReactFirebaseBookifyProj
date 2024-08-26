import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    console.log('From login page')

    const firebase = useFirebase();
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
        const user = await firebase.signinUserWithEmailAndPassword( 
          email,
          password
        );
        if (user) {
          toast.success(`User with email ${email} has Logged In Successfully!`);
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

    const handleGoogleLogin = async (e) =>{
        e.preventDefault();
        try {
            const user = await firebase.signInWithGoogle();
            if (user) {
              toast.success(`User with email ${user.email} has Logged In Successfully!`);
            }
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code", errorCode)
            console.log("Error Message", errorMessage)
            return toast.error(error.message);
          }

    }


    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }else{
            navigate('/login')
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
        <p>Dont have an Account, Please Sign up yourself here
            <Link to = '/register'> Signup</Link>
        </p>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Signing User..." : "Sign In"}
        </Button>

        <h5 className="my-4">OR</h5>
        <Button variant="outline-primary" onClick={handleGoogleLogin}>SignIn With Google</Button>
      </Form>
    </div>
  );
}
