import React, { Component } from 'react';
import './App.css';
import QuestionBox from './Components/QuestionBox'
import Result from './Components/Result'
import axios from 'axios'
import Cardlist from './Components/Cardlist'

class  App extends Component{
 constructor(props){
  super(props);
  this.state={
    score:0,
    responses:0,
    setFlashcards:[],
    setCategories:[],
    amount:10,
    DisplayAnswers:false
  };

  this.computeAnswer=this.computeAnswer.bind(this);
  this.playAgain=this.playAgain.bind(this);
  this.decodeString=this.decodeString.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.getCategories=this.getCategories.bind(this);
  this.ShowAnswers=this.ShowAnswers.bind(this);
 } 

ShowAnswers=()=>{
  this.setState({
    DisplayAnswers:true
  })
}

computeAnswer =(answer,correctAnswer)=>{
  if(answer === correctAnswer){
    this.setState({
      score: this.state.score + 1 
    })
  }
  this.setState({
    responses:this.state.responses < this.state.amount ? this.state.responses+1 : this.state.amount
  })
}

playAgain=()=>{
  this.getCategories()
  this.setState({
    score:0,
    responses:0,
    setFlashcards:[],
    setCategories:[],
    DisplayAnswers:false
  });
};

decodeString=(str)=>{
  const textArea=document.createElement('textarea');
  textArea.innerHTML=str;
  return textArea.value;
}


Reteset=()=>{  
  this.setState({
    score:0,
    responses:0
  });
  console.log(this.state.score,this.state.responses)
}

 handleSubmit(e){

  this.setState({
    amount:Number(document.getElementById('amount').value),
    DisplayAnswers:false
  })
  e.preventDefault();
  axios.get('https://opentdb.com/api.php',{params:{
    amount:document.getElementById('amount').value,
    category:document.getElementById('category').value

  }})
.then((res)=>{
  this.setState({ 
   setFlashcards :res.data.results.map((questionItem,index)=>{
     const options = [
       ...questionItem.incorrect_answers.map( a=> this.decodeString(a)),      
      this.decodeString(questionItem.correct_answer)]
     return {
       questionId:`${index}-${Date.now()}`,
       question:this.decodeString(questionItem.question),
       correct :this.decodeString(questionItem.correct_answer),       
       answers:options.sort(()=> Math.random() - 0.5)
    }
   })  
 })
})
}

getCategories=()=>{
  axios.get('https://opentdb.com/api_category.php')
  .then(res=>{
    this.setState({
        setCategories:res.data.trivia_categories

    })
  })
}

componentDidMount(){
 this.getCategories()
}

  render(){  

  return (
  <>
    <form className="header" onSubmit={this.handleSubmit}>
    <div className="form-group">
      <label htmlFor="category">Category</label>
      <select id="category" >
           {this.state.setCategories.map((category)=>{
             return <option value={category.id} key={category.id}>{category.name}</option>
           })}
       </select>
    </div>
    <div className="form-group">
         <label htmlFor="amount">Number of Questions</label>
         <input type="number" id="amount" min="1" step="1" defaultValue="10" />
   </div>

   <div className="form-group">
         <button  className="btn">Generate</button>
   </div>
 </form>

    <div className="container">
    <div  className="title">Quiz Test</div>

    
{this.state.DisplayAnswers===true ?<div className="answers">
    <Cardlist flashcards={this.state.setFlashcards}/>
   </div>: null }

    {this.state.responses  < this.state.amount &&
  this.state.setFlashcards.length >0 && this.state.setFlashcards.map(({question,answers,correct,questionId})=>{
    return( 
      
           <QuestionBox question={question}  options={answers} key={questionId}
           
           selected={answer=>this.computeAnswer(answer,correct)}
            />     
      
      )
    
    }
  )}

  {this.state.responses === this.state.amount ? (<Result  score={this.state.score} amount={this.state.amount} playAgain={this.playAgain}
  
  ShowAnswers={this.ShowAnswers}  RetakeTest={this.Reteset}
    />) : null}
    </div>

    </>
  );
}
}
export default App;
