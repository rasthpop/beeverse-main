'use client'
import React from "react";
import { Button } from "./button";

export default function Cooldown(){
    return(
        <div className="flex flex-col">
            <span className="text-[14px] opacity-80">Come back in</span>
            <Button className="rounded-full" variant={'default'}> <span className="opacity-80">23h 15m </span> </Button>
        </div>
    )
}