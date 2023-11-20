import { Routes, Route, Link} from "react-router-dom";
import React, { useReducer, useRef, useEffect, useState } from 'react';
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action){
  switch(action.type){
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState =  state.map((it)=> 
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
       const newState = state.filter((it)=> String(it.id) !== String(action.targetId));
       localStorage.setItem("diary", JSON.stringify(newState));
       return newState;
    }
    case "INIT": {
      return action.data
    }
    default:{
      return state;
    }
  }
}

function App() {
  const [isDataLoaded, setIsdataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

useEffect(() => {
  const rawData = localStorage.getItem("diary");
  if(!rawData){
    setIsdataLoaded(true);
    return;
  };
  const localData = JSON.parse(rawData);
  if(localData.length === 0){
    setIsdataLoaded(true);
    return;
  };
  localData.sort((a, b) => Number(b.id) - Number(a.id));
  idRef.current = localData[0].id + 1;
  dispatch({type: "INIT", data:localData});
  setIsdataLoaded(true);
},[]);
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    })
  }

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }

  if(!isDataLoaded){
    return <div>데이터를 불러오는 중입니다.</div>
  }else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value = {{onCreate, onUpdate, onDelete}}>
          <div className='App'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
