import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Paper from "./utilities/Paper";
import { userContext } from "../pages";
import FormInput from "./forms/FormInput";
import Button from "./buttons/Button";
import { faLock, faSave, faUnlock } from "@fortawesome/free-solid-svg-icons";
import IconSwitchButton from "./buttons/IconSwitchButton";

export default function AccountPage(){

    const user = useContext(userContext);

    const [inputs, setInputs] = useState({
        email: user?.email || '', 
        firstName: user?.firstName || '', 
        lastName: user?.lastName || '', 
        username: user?.username || ''
    });

    const [locked, setLocked] = useState({
        email: true, 
        firstName: true, 
        lastName: true, 
        username: true
    })

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {value, name} = event.target;
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleFormSubmit(event:FormEvent){
        event.preventDefault();
        console.log(inputs)
    }

    return (
        <div className="flex justify-center mt-4">
            <Paper className="rounded w-full md:w-4/12">
                <form 
                    onSubmit={handleFormSubmit}
                    className="flex flex-col items-center justify-center px-4 py-2 space-y-6"
                >
                    <div className="flex flex-col w-full space-y-4">
                        <div className="flex items-end space-x-2">
                            <FormInput
                                className="grow"
                                id="firstName"
                                name="firstName"
                                onChange={handleInputChange}
                                value={inputs.firstName}
                                label="First Name"
                                disabled={locked.firstName}
                            />
                            <IconSwitchButton 
                                icon={locked.firstName ? faLock : faUnlock} 
                                on={!locked.firstName} 
                                handleClick={()=>setLocked(prev => ({...prev, firstName: !prev.firstName}))}
                            />
                        </div>
                        
                        <div className="flex items-end space-x-2">
                            <FormInput
                                className="w-full"
                                id="lastName"
                                name="lastName"
                                onChange={handleInputChange}
                                value={inputs.lastName}
                                label="Last Name"
                                disabled={locked.lastName}
                            />
                            <IconSwitchButton 
                                icon={locked.lastName ? faLock : faUnlock} 
                                on={!locked.lastName} 
                                handleClick={()=>setLocked(prev => ({...prev, lastName: !prev.lastName}))}
                            />
                        </div>

                        <div className="flex items-end space-x-2">
                            <FormInput
                                className="w-full"
                                id="username"
                                name="username"
                                onChange={handleInputChange}
                                value={inputs.username}
                                label="Username"
                                disabled={locked.username}
                                autoComplete="off"
                                required
                            />
                            <IconSwitchButton 
                                icon={locked.username ? faLock : faUnlock} 
                                on={!locked.username} 
                                handleClick={()=>setLocked(prev => ({...prev, username: !prev.username}))}
                            />
                        </div>

                        <div className="flex items-end space-x-2">
                            <FormInput
                                className="w-full"
                                id="email"
                                name="email"
                                onChange={handleInputChange}
                                value={inputs.email}
                                label="Email"
                                disabled={locked.email}
                                autoComplete="off"
                                required
                            />
                            <IconSwitchButton 
                                icon={locked.email ? faLock : faUnlock} 
                                on={!locked.email} 
                                handleClick={()=>setLocked(prev => ({...prev, email: !prev.email}))}
                            />
                        </div>
                    </div>
                    <Button 
                        label="Save Account Info" 
                        type="submit"
                        className="w-fit"
                        icon={faSave}
                    />
                </form>
            </Paper>
        </div>
    )
}