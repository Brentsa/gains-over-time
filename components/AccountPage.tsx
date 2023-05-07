import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react";
import Paper from "./utilities/Paper";
import { userContext } from "../pages";
import FormInput from "./forms/FormInput";
import Button from "./buttons/Button";
import { faLock, faSave, faUnlock } from "@fortawesome/free-solid-svg-icons";
import IconSwitchButton from "./buttons/IconSwitchButton";
import { feedbackContext } from "./MainPageContainer";

export default function AccountPage(){

    const {user, setUser} = useContext(userContext);
    const {setFeedback} = useContext(feedbackContext);

    //form inputs filled with current user data
    const [inputs, setInputs] = useState({
        username: user.username || '',
        firstName: user.firstName || '', 
        lastName: user.lastName || '', 
        email: user.email || ''
    });

    //locked states for input fields
    const [locked, setLocked] = useState({
        email: true, 
        firstName: true, 
        lastName: true, 
        username: true
    })

    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {value, name} = event.target;
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    async function handleFormSubmit(event:FormEvent){
        event.preventDefault();

        setLoading(true);

        const response = await fetch(`api/account/update/${user.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        });

        const data = await response.json();

        setLoading(false);

        //handle any response errors with failure feedback
        if(!response.ok){
            return setFeedback({type: 'failure', message: data.error});
        }

        //give user feedback
        setFeedback({type: 'success', message: 'Account successfully updated'});

        //lock the form again
        setLocked({
            email: true, 
            firstName: true, 
            lastName: true, 
            username: true
        })
        
        //update the user's global state data
        setUser(data);
    }

    //check to see if inputs have been altered, returns true if inputs have been changed
    const haveInputsChanged = useCallback(()=>{
        let hasChanged = false;
        
        if(inputs.username !== user.username || inputs.firstName !== user.firstName || inputs.lastName !== user.lastName || inputs.email !== user.email){
            hasChanged = true;
        }

        setChanged(hasChanged);
    }, [setChanged, inputs, user]);

    useEffect(()=>{
        //check if inputs have deviated from original user data anytime they are changed
        haveInputsChanged();
    }, [inputs, haveInputsChanged])

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
                                className="grow"
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
                                className="grow"
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
                                className="grow"
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
                        disabled={!changed}
                        loading={loading}
                    />
                </form>
            </Paper>
        </div>
    )
}