import { RepType } from "@prisma/client"
import { MouseEvent, useEffect, useState } from "react"
import UpdateExerciseForm from "../forms/UpdateExerciseForm";
import Modal from "../utilites/Modal";

interface Props {
    quantity: number,
    weight: number,
    setType?: RepType
    editable?: boolean
}

export default function SetPill({quantity, weight, setType, editable}: Props){
    const shakeDegrees = 4
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [rotationDeg, setRotationDeg] = useState<number>(0);

    function editSet(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        if(!editable) return;
        
        setOpenEdit(true);
    };

    function closeEdit(){
        setOpenEdit(false);
    }

    //shake the pill once using the supplied degrees
    function shake(degrees: number): void{
        setRotationDeg(degrees);
        setTimeout(()=>{
            setRotationDeg(-degrees);
            setTimeout(()=>{
                setRotationDeg(0);
            }, 100)
        }, 100);
    }

    function deleteSet(event: MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        console.log('delete')
    }

    useEffect(()=>{
        if(!editable) return; 

        //shake the pill if editable and then set an interval until it is uneditable
        shake(shakeDegrees);
        const shakeFrequencyInterval = setInterval(()=>shake(shakeDegrees), 1500);

        //clear the shake interval when the component unmounts
        return () => clearInterval(shakeFrequencyInterval);
    }, [editable])

    return (
        <div 
            className={`bg-violet-500 text-white rounded-full transition-all duration-100 ${editable && 'shadow shadow-gray-800 hover:bg-rose-500 hover:cursor-pointer'}`}
            style={editable ? {transform: `rotate(${rotationDeg}deg)`} : undefined}
        >
            <button 
                className={`h-full w-full rounded-full flex flex-col sm:flex-row items-center justify-center px-3 `}
                onClick={editSet}
                disabled={!editable}
            >
                <h3 className="text-sm z-10 whitespace-nowrap">
                    {quantity !== 0 && quantity + " x"}
                </h3>
                <h3 className="text-sm z-10 whitespace-nowrap sm:ml-1">
                    {weight} {setType === 'seconds' ? 'sec' : 'lbs'}
                </h3>
                {/* {editable && 
                    <button className="h-5 w-5 rounded-full bg-rose-500 text-sm absolute top-0 right-0" onClick={deleteSet}>x</button>
                } */}
            </button>
            {/* <Modal closeModal={closeEdit} open={openEdit}>
                <UpdateExerciseForm/>
            </Modal> */}
        </div>
    )
}