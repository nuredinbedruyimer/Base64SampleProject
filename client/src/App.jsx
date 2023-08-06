import { useState ,useEffect} from 'react'
import './App.css'
import avatar from "./assets/profile.png";
import axios from 'axios';
const url = 'http://localhost:8000/upload';


function App() {
  
  
 
  const [Post, setPost] = useState({
    name: '',
    photo:''
  })
  console.log(Post)
  const createPost = async (Post) => {
    try {
     await axios.post(url, Post);
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   
    createPost(Post);
    console.log("Photo UpLoaded")
    
    
  }
 


  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);


    
    setPost({...Post, photo:base64})


    
  }
  

  return (
    <>
      
      <form onSubmit={(e)=>handleSubmit(e)} 
        
     >
        <label htmlFor="upload" >
          
          <img src={Post.photo || avatar} alt={Post.name} />
        </label>
        <h2>Upload Photo</h2>
        <input type="file" name="photo" id="upload" accept="jpeg,png,jpg" label="Photo" onChange={(e)=>handleFileUpload(e)} />
        <div className="break"></div>
        <label htmlFor='name'> <h2>User Name </h2></label>
        <input type='text' value={Post.name} id="name" onChange={(e)=>setPost({...Post, name:e.target.value}) } />
        <h2>{ Post.name}</h2>
        <h3>There Work Also Here</h3>
        <button className='btn'>Submit</button>
        
        
      </form>
      

    </>
  )
}


export default App
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    // Creating File Reader Instance In order to read file
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = () => {
      reject(error);
    }
  })
}