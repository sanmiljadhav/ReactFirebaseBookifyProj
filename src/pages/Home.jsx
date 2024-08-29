import React, {useEffect, useState} from 'react'
import { useFirebase } from '../context/Firebase'
import Bookcard from '../components/Bookcard'
import CardGroup from 'react-bootstrap/CardGroup'

export default function Home() {
    const firebase = useFirebase()
    const [books,setBooks] = useState([])

    useEffect(()=>{

        const fetchBooks = async()=>{

            try{
                const data = await firebase.listAllBooks()
                console.log("data is", data.docs[0].data())
                setBooks(data.docs)

            }catch(error){
                console.log("error is", error)
            }
            
        }

        fetchBooks()

    },[])

  return (
    <div className='container'>

        <CardGroup>
        
        {books.map((book)=>{
            return <Bookcard key={book.id} {...book.data()}/>
        })}
        </CardGroup>
        
        
    </div>
  )
}
