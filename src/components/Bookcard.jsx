import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';

export default function Bookcard(props) {
    const firebase = useFirebase()
    const [url,setURL] = useState(null);

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url)=>setURL(url))

    },[])

  return (
    <Card style={{ width: '18rem', margin:"25px"}}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.bookName} and this book is sold by {props.displayName} and this book costs Rs. {props.price}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}
