'use client'
import React from "react"

export function Bee(props:{
    attack: boolean
}){
    return(
        <div className=" absolute left-[40%] top-[68%]" >
            <img src="/bee/head_idle.gif " className="w-[100px] h-[100px] object-contain z-20 absolute top-[-6%] left-[-1%]" />
            <img src={props.attack? "/bee/bee_attack.gif" :"/bee/bee_idle.gif"} className="w-[150px] h-[150px]  " />
        </div>
    )
}