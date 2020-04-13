import React from 'react';
import Card from './Card'
export default function Cardlist({flashcards}){
    return(
        <div>
            <div className="card-grid">
               {
                   flashcards.map(flashcard=>{
                       return <Card flashcard={flashcard}  key={flashcard.id} />
                   })
               }
            </div>
        </div>
    )
}