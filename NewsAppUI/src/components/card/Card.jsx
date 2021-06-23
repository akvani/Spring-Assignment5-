import React, { useState, useEffect } from 'react'
//import PropTypes from "prop-types";

export default function Card(props) {
    const[author,setname]=useState('');
    const[key,setkey]=useState('');
    const[title,settitle]=useState('');
    const[url,seturl]=useState('');
    const[urlToImage,seturltoImage]=useState('');
    const[description,seturdescription]=useState('');

    useEffect(() => {
      setkey(props.key);
        setname(props.author);
        settitle(props.title);
        seturl(props.url);
        seturltoImage(props.urltoImage)
        seturdescription(props.description)
    }, [])

    const readLater=()=>
    {
       
      const Newsdetails={
             author,
             title,
             url,
             urlToImage,
             description

      }
    console.log(JSON.stringify(Newsdetails));
     props.readLaterevent(JSON.stringify(Newsdetails));
      
    }
    return (
        <div>
            
            <div className="card" style={{width: "26rem"}}>
  
  <div className="card-body">
    <h6>
 
    <span className="float-right" style={{"cursor":"pointer"}} 
    onClick= {()=>readLater()}>
    <i style={{color:"green"}}> Read Later</i>
    </span>
    <p className="card-title"><a href={props.url}>{props.title}</a></p>
     <p className="card-text">key: {props.key}</p>
     <p className="card-text">{props.description}</p>
     <p className="card-text"><b>Author:</b> {props.author ? props.author : 'NA'}</p>
     <img className="card-text" src={props.urltoImage} className="img-rounded" alt="News icon" width="304" height="236"></img>
    </h6>
  </div>

        </div>
        </div>
    )
}

