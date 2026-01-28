import React, { useEffect, useState, Children, cloneElement, useCallback } from "react";

export const CarouselItem = ({children, width, img}) =>{
  return (
    <img src={img} className="carousel-item carousel-image" alt={img}/>
  )
}

const Carousel = ({ props, children } ) => {
  const { name } = props
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = useCallback((newIndex) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1
    }
    else if (newIndex >= Children.count(children)){
      newIndex = 0
    }
    setActiveIndex(newIndex)
  },[children]);
  
useEffect(()=>{
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1)
    }, 4000)
    return ()=> {if(interval) {clearInterval(interval)}}
  })

  useEffect(()=>{
    updateIndex(0)
  }, [name, updateIndex])


  return (
    <div className="carousel" >
        <div className="inner"
        style={{transform: `translateX(-${activeIndex * 100}%)`}}>
          {Children.map(children, (child, index)=>{
            return cloneElement(child, {width:"100%"})
          })}
        </div>
        {Children.count(children) !== 1 ?
        <div className="indicators">
          {Children.map(children, (child, index) =>{
            return <button
            className={`${index === activeIndex ? 'active' : ""}`} 
            onClick={()=> updateIndex(index)}/>
          })}
        </div> : null}
    </div>
  );
};

export default Carousel;
