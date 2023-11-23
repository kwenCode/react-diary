import "./EmotionCount.css"
import { emotionList, getEmotionImgById } from "../util";
import EmotionCntItem from "./EmotionCntItem";

//name: "완전 좋음",
//      img: getEmotionImgById(1),

const EmotionCount = ({data}) => {
    const count = [
        {id : 1, count : 0, img: getEmotionImgById(1)},
        {id : 2, count : 0, img: getEmotionImgById(2)},
        {id : 3, count : 0, img: getEmotionImgById(3)},
        {id : 4, count : 0, img: getEmotionImgById(4)},
        {id : 5, count : 0, img: getEmotionImgById(5)},
    ]
    
    data.map((it)=>{
        const cnt = count.findIndex(a => a.id === it.emotionId);
        count[cnt].count = count[cnt].count + 1;
    })
    count.sort((a, b) => b.count - a.count);
    console.log('count',count)
    return (
    <div className="EmotionCount">
        {/**감정 */}
        
        <div className="input_wrapper EmotionCount_list_wrapper">
            {count.map((it) => (
                <EmotionCntItem 
                    key={it.id}
                    {...it}
                    count={it.count}
                />
            ))}
        </div> 

    </div>

    )
}

export default EmotionCount;