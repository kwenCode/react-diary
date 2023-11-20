import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+ 1}월`

    const onIncreaseMonth =() =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
    }
    const onDecresaMonth =() => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1))
    }

    useEffect(()=> {
        if(data.length >= 1){
            const {beginTimeStamp, endTimeStamp } =getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        }else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    useEffect(() => {
        setPageTitle("Clown의 감정 일기장");
    },[]);

    return (
        <div>
            <Header 
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecresaMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
            <DiaryList data={filteredData}/>
        </div>
    )
};

export default Home;