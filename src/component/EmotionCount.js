import "./EmotionCount.css"
import { emotionList } from "../util";
import EmotionCntItem from "./EmotionCntItem";



const EmotionCount = ({data}) => {
    const count = [0,0,0,0,0]
    console.log('test', data);
    data.map((it)=>{
        count[it.emotionId-1] = count[it.emotionId-1] + 1;
        console.log(count)
    })
    return (
    <div className="EmotionCount">
        {/**감정 */}
        
        <div className="input_wrapper EmotionCount_list_wrapper">
            {emotionList.map((it) => (
                <EmotionCntItem 
                    key={it.id}
                    {...it}
                    count={count[it.id-1]}
                />
            ))}
        </div> 
    </div>

    )
}

export default EmotionCount;