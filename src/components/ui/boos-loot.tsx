'use client'
import React from "react"

export default function BossLoot(props:{
    award: number;
}){
    return(
        <div className=" text-foreground text-title-stroke flex justify-center">
            <img src='/icons/honey.png' className="w-4 h-4" /> <span>{(props.award).toLocaleString('en')}</span>    
        </div>
    )
}