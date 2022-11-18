import { RepType } from "@prisma/client"
import { MouseEvent, useState } from "react"
import Modal from "../utilites/Modal";

interface Props {
    quantity: number,
    weight: number,
    setType?: RepType
    editable?: boolean
}

export default function SetPill({quantity, weight, setType, editable}: Props){

    const [openEdit, setOpenEdit] = useState<boolean>(false);

    function editSet(event: MouseEvent<HTMLDivElement>){
        event.preventDefault();
        if(!editable) return;
        
        setOpenEdit(true);
    };

    function closeEdit(){
        setOpenEdit(false);
    }

    return (
        <div 
            className='bg-violet-500 text-white rounded-full relative flex flex-col sm:flex-row items-center justify-center px-3'
            onClick={openEdit ? undefined : editSet}
        >
            <Modal closeModal={closeEdit} open={openEdit}>
                <div className="text-black">Hello There</div>
            </Modal>
            <h3 className="text-sm z-10 whitespace-nowrap">
                {quantity !== 0 && quantity + " x"}
            </h3>
            <h3 className="text-sm z-10 whitespace-nowrap sm:ml-1">
                {weight} {setType === 'seconds' ? 'sec' : 'lbs'}
            </h3>
            {editable && <span className="absolute rounded-full w-8 h-6 bg-rose-500 animate-ping"/>}
        </div>
    )
}