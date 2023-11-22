import React from "react";
import "./EmotionCntItem";

const EmotionCntItem = ({ id, img, name, count}) => {
    console.log(id, img, name, count)
    return (
        <div className={["EmotionItem", 
            `EmotionItem_off`
        ].join(" ")} 
            >
            <img alt={`emotion${id}`} src={img} />
            <span>{count}</span>
        </div>
    );
};

export default React.memo(EmotionCntItem);