import React, { Component } from 'react';
import './App.css';
import QuestionBox from './Components/QuestionBox'
import Result from './Components/Result'
import axios from 'axios'
import Loader from './Components/Loader'
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
    DisplayAnswers:false,
    QuesWithAns:[],
    showSubmitButton:true,
    loading:false
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
    DisplayAnswers:true,
    showSubmitButton:false
  })
}

computeAnswer =(opt,correctAnswer,index)=>{
   
  var tempArray = JSON.parse(JSON.stringify(this.state)).setFlashcards;
  tempArray[index]['selected'] = opt;

  this.setState({
  setFlashcards:tempArray
  });
  if(opt === correctAnswer){
    this.setState({
      score: this.state.score + 1,      
    })
  }

}

playAgain=()=>{
  this.getCategories()
  this.setState({
    score:0,
    responses:0,
    setFlashcards:[],
    setCategories:[],
    DisplayAnswers:false,
  
  });
};

decodeString=(str)=>{
  const textArea=document.createElement('textarea');
  textArea.innerHTML=str;
  return textArea.value;
}

submitAnswers=()=>{
  this.setState({
    responses:this.state.amount,
    showSubmitButton:false
  })
}

Reteset=()=>{  
  this.setState({
    score:0,
    responses:0,
    showSubmitButton:true    
  });
}

 handleSubmit(e){
  this.setState({
    amount:Number(document.getElementById('amount').value),
    DisplayAnswers:false,
    loading:true
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
       answers:options.sort(()=> Math.random() - 0.5),
       selected:''
    }
   }),
   loading:false
 })
 })

this.setState({
  showSubmitButton:true,
  score:0,
  responses:0
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
   <div className="header">
          <div>NAVIGATION BAR </div>
   </div>



    <div className="container">
    <div  className="title">Quiz Test</div>

    
    <form  onSubmit={this.handleSubmit}>
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
         <button  className="option_btns" >GENERATE</button>
   </div>
 </form>
    {this.state.loading ?  <div style={{marginTop:"80px"}}>
      <Loader></Loader>
    </div> : (
      <>
{this.state.DisplayAnswers===true ? <div className="answers">
    <Cardlist flashcards={this.state.setFlashcards}/>
   </div>: null }

    {this.state.responses  < this.state.amount &&
  this.state.setFlashcards.length >0 && this.state.setFlashcards.map(({question,answers,correct,questionId},index)=>{
    return(              
           <QuestionBox question={question}  options={answers} key={questionId}           
           qId={questionId}  
           selected={opt=>this.computeAnswer(opt,correct,index)}
            />           
      )
    
    }
  )}
  {this.state.setFlashcards.length>0 && this.state.showSubmitButton ? (<div><button className="option_btns" onClick={this.submitAnswers}>SUBMIT</button></div>):null}
</>
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
