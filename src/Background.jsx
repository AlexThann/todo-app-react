import { useState } from 'react'
import TodoContainer from "./TodoContainer.jsx"

function Background() {
  return(
    <main className="main-bg-container dark-theme">
        <div className="colored-background"></div>
        <div className="background-fill"><TodoContainer/></div>
        
    </main>
  )
}

export default Background
