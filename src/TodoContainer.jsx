import { useEffect, useState } from 'react'
import TodoMain from "./TodoMain.jsx";

function TodoContainer() {

  const [theme,setTheme] = useState(()=>{
    const previousTheme=localStorage.getItem("THEME");
    if(previousTheme==null) return "dark";
    return JSON.parse(previousTheme);
  });
  const [themeUrl,setThemeUrl] = useState("./images/icon-sun.svg");


  useEffect(()=>{
    localStorage.setItem("THEME",JSON.stringify(theme));
  },[theme]);
 
  useEffect(()=>{
      const mainContainer=document.querySelector(".main-bg-container");
      if(theme==="dark"){
        mainContainer.classList.remove("light-theme");
        mainContainer.classList.add("dark-theme");
        setThemeUrl((currentThemeUrl)=>{return "./images/icon-sun.svg"});
      }else{
        mainContainer.classList.remove("dark-theme");
        mainContainer.classList.add("light-theme");
        setThemeUrl((currentThemeUrl)=>{return "./images/icon-moon.svg"});
      }
    }
    ,[theme]);
  
  function changeThemes(){
      setTheme((currentTheme)=>{return  currentTheme==="dark"?"light":"dark"});
  }


  return(
    <div className="todo-container">
        <div className="header">
            <h1>TODO</h1>
            <img className="change-themes-bt" src={themeUrl} alt="" onClick={()=> changeThemes()}/>
        </div>
        <TodoMain></TodoMain>
    </div>
  )
}


export default TodoContainer
