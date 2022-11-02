import { useState } from "react";
import Paper from "./Paper";

export default function Modal(){

    const [open, setOpen] = useState<boolean>(false);

    if(!open) return; 

    return (
        <div className="z-40 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 flex items-center justify-center">
            <Paper className="w-1/3 h-1/2">
                What we doing here bud
            </Paper>
        </div>
    );
}