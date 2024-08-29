import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListingPage() {
  const firebase = useFirebase();

  const [book, setBook] = useState({
    name: "",
    isbnNumber: "",
    price: "",
    coverPic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverPic") {
      setBook((prevState) => ({
        ...prevState,
        coverPic: files[0], // Store the first selected file
      }));
    } else {
      setBook((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate random 5 digits
      const randomDigits = Math.floor(10000 + Math.random() * 90000);

      // Append random digits to the isbnNumber
      const updatedIsbnNumber = book.isbnNumber + randomDigits;

      // Update the book state with the new isbnNumber
      // setBook((prevState) => ({
      //   ...prevState,
      //   isbnNumber: updatedIsbnNumber,
      // }));

      await firebase.handleCreateNewListing(
        book.name,
        updatedIsbnNumber,
        book.price,
        book.coverPic
      );

      toast.success(`Book with ${book.name} has been created Successfully!`);

      setBook({
        name: "",
        isbnNumber: "",
        price: "",
        coverPic: null,
      })
      
    } catch (error) {
      console.error("Error creating a new listing:", error);
      alert("Failed to create a new listing. Please try again later.");

    }
  };

 

  return (
    <div className="container my-4">
      <ToastContainer/>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            value={book.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Isbn Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Isbn Number"
            onChange={handleChange}
            value={book.isbnNumber}
            name="isbnNumber"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            onChange={handleChange}
            value={book.price}
            name="price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            type="file"
            placeholder="Choose File"
            onChange={handleChange}
            name="coverPic"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enter Book
        </Button>
      </Form>
    </div>
  );
}
