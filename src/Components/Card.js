import React, {useState,useEffect,useRef} from 'react'


export default function Card({flashcard}){
    const [flip,setFlip]=useState(false)
    const [height,setHeight]=useState('initial')

    
    const frontEl=useRef()
    const backEl =useRef()

    function setMaxHeight(){
        const frontHeight=frontEl.current.getBoundingClientRect().height;
        const backHeight=backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight,backHeight,100))
    }
    
    useEffect(()=>{
        setMaxHeight()
    }, [flashcard.question,flashcard.answer,flashcard.options])

    useEffect(()=>{
        window.addEventListener('resize',setMaxHeight)
        return ()=> window.removeEventListener('resize',setMaxHeight)
    },[])

    return(
        <div
         className={`card ${flip ? 'flip' : ' '}`}
         style={{height:height}}
        onClick={()=> setFlip(!flip)}>
            
            <div className="front" ref={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                   {flashcard.answers.map((answers,index)=>{
                       return <div className="flashcard-option" key={index}>{answers}</div>
                   })}
                </div>
              <div className="AnswerSelected"> Answer Selected : {flashcard.selected.length > 0 ? (<div style={{color:"green"}}>{flashcard.selected}</div>): (<div style={{color:"red"}}>  Not Answered </div>) }</div>
            </div>
             <div className="back" ref={backEl}>
                 {flashcard.correct}
             </div>
        </div>
    )
}