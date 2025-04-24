import { useEffect, useState } from 'react'
import TodoMain from "./TodoMain.jsx";

function TodoContainer() {

  const [theme,setTheme] = useState(()=>{
    const previousTheme=localStorage.getItem("THEMETODO");
    if(previousTheme==null) return "dark";
    return previousTheme;
  });
  const [themeUrl,setThemeUrl] = useState(`${import.meta.env.BASE_URL}images/icon-sun.svg`);


  useEffect(()=>{
    localStorage.setItem("THEMETODO",theme);
  },[theme]);
 
  useEffect(()=>{
      const mainContainer=document.querySelector(".main-bg-container");
      if(theme==="dark"){
        mainContainer.classList.remove("light-theme");
        mainContainer.classList.add("dark-theme");
        setThemeUrl((currentThemeUrl)=>{return `${import.meta.env.BASE_URL}images/icon-sun.svg`});
      }else{
        mainContainer.classList.remove("dark-theme");
        mainContainer.classList.add("light-theme");
        setThemeUrl((currentThemeUrl)=>{return `${import.meta.env.BASE_URL}images/icon-moon.svg`});
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
