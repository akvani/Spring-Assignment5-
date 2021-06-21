import React, {useState,useEffect}  from 'react'
import axios from 'axios';
import Card from '../card/Card'

export default function Dashboad() {

    const [newsdata,myCallback]=useState([ ]);
    const [readlaterdata,ReadLaterCallback]=useState([ ]);
    const [category,categoryCallbak]=useState(['business'])

    useEffect(function()
    {
      
   // axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=2b8b823d5cf54290bae7409fb2a80d38`).then
   axios.get(`http://localhost:8080/source/api/news/category/${category}`).then
    ( (result)=>
      {
       // console.log(category + " from news API");
      // console.log(result.data.articles);
       myCallback(result.data.articles);
      } 
    )
    .catch((err)=>console.log(err))
    }
    ,[]); //End of useEffect

useEffect(function()
{
axios.get('http://localhost:8080/newsdb/readnow',
{
  headers:{'Authorization':`Bearer ${localStorage.getItem("mytoken")}`}
}
).then
( (result)=>
  {
    //console.log("Read Later Data");
   //console.log(result.data);
   ReadLaterCallback(result.data);
  } 
)
.catch((err)=>console.log(err))
}
,[]); //End of useEffect

const readLater= (mydata)=>
{
  //console.log("Inside parent");
  console.log(mydata);
 
  axios.post('http://localhost:8080/newsdb/readlater',mydata,
  {
    headers : {
    'Content-type':'application/json',
    'Authorization':`Bearer ${localStorage.getItem("mytoken")}`
    }
  })
  .then(
    (res)=>
    {
     // console.log("readlater")
  // console.log(res.data);
   myCallback([...newsdata,res.data]);
   ReadLaterCallback([...readlaterdata,res.data])
    }
  )
  .catch(
    (err)=>console.log(err)
  )

}

const getcategory=(category)=>{
  categoryCallbak(category);
  console.log(category);
  axios.get(`http://localhost:8080/source/api/news/category/${category}`).then
  ( (result)=>
    {
     console.log(result.data.articles);
     myCallback(result.data.articles);
    } 
  )
  .catch((err)=>console.log(err))

}


    return (
    
      <div className="container">
        <div className="row" style={{ width: '100%' }}>         
        
         <h3>Select Category      :</h3>         
      
<div onClick={() => {
            getcategory("business");
            
          }} >

<input type="radio" value={"sports"} name="category" checked={category == "business"}/> Business
</div>
<div onClick={() => {
            getcategory("sports");
            
          }} >
<input type="radio" value={"sports"} name="category" checked={category == "sports"}/> Sports
</div>
<div onClick={() => {
            getcategory("entertainment");
            
          }} >
<input type="radio" value={"entertainment"} name="category" checked={category == "entertainment"} /> Entertainment
</div>
<div onClick={() => {
            getcategory("science");
            
          }} >
<input type="radio" value={"science"} name="category" checked={category == "science"}/> Science
</div>
<div onClick={() => {
            getcategory("technology");
            
          }} >
<input type="radio" value={"technology"} name="category" checked={category == "technology"} /> Technology

         </div>
        </div>
        <div className="row">
          <div className="col-md-12 my-12">  
              {
      
                 <h1>{newsdata.map (
                  (news)=> 
                  <Card key={news.title} id={news.id} name={news.name} 
                  title={news.title} 
                  url={news.url}
                  description={news.description}
                  urltoImage={news.urlToImage}
                  readLaterevent={readLater}
                  />
                   )}</h1>

                }         
          </div>        
         
        </div>
        </div>
     
    )
}