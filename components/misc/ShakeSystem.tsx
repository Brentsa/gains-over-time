import { ReactNode, useEffect, useState } from "react";

interface Props {
    bShake: boolean
    className?: string
    children: ReactNode
    shakeDegree?: number
    shakeTime?:number
}

export default function ShakeSystem({bShake, children, className, shakeDegree, shakeTime}: Props){

    const shakeDegrees = shakeDegree ?? 4;
    const shakeDuration = shakeTime ?? 100;
    const [rotationDeg, setRotationDeg] = useState<number>(0);

    //shake the pill once using the supplied shake degree
    function shake(degrees: number, duration: number): void{
        setRotationDeg(degrees);
        setTimeout(()=>{
            setRotationDeg(-degrees);
            setTimeout(()=>{
                setRotationDeg(0);
            }, duration)
        }, duration);
    }

    useEffect(()=>{
        if(!bShake) return; 

        //shake the pill if bShake is true and then set an interval until it is no longer shaking
        shake(shakeDegrees, shakeDuration);
        const shakeFrequencyInterval = setInterval(()=>shake(shakeDegrees, shakeDuration), 1500);

        //clear the shake interval when the component unmounts
        return () => clearInterval(shakeFrequencyInterval);
    }, [bShake, shakeDegrees, shakeDuration]);

    return (
        <div 
            className={`ease-linear transition-all duration-150 ${className ?? ''} ${bShake && 'shadow shadow-gray-800'}`}
            style={bShake ? {transform: `rotate(${rotationDeg}deg)`} : undefined}
        >
            {children}
        </div>
    );
}