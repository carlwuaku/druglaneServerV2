import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ipcRenderer } from 'electron';
import { GET_PREFERENCE, PREFERENCE_RECEIVED, PREFERENCE_SET, RESTART_APPLICATION, SET_PREFERENCE } from '@/utils/stringKeys';
import { Toast } from 'primereact/toast';

const SettingItem = (props: { name: string,  type: string, options?: string[] }) => {
    const [editing, setEditing] = useState(false);
    const [new_value, setValue] = useState('');
    const [currentValue, setCurrentValue] = useState<any>('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //get the value of the setting
        ipcRenderer.send(GET_PREFERENCE, { key: props.name });

        ipcRenderer.on(PREFERENCE_RECEIVED, (event, data) => {
            console.log(props.name,data)
            setCurrentValue(data)
            setValue(data)
        })
    },[])

    const editButton = <Button onClick={() => setEditing(true)} label="Edit" icon="pi pi-edit"></Button>;
    function getInput(type: string) {
        switch (type) {
            case "select":
                return <Dropdown value={new_value} onChange={(e) => setValue(e.target.value)} options={props.options}
                    placeholder="Select a value" className="" />



            default:
                return <InputText value={new_value} onChange={(e) => setValue(e.target.value)} />

        }
    }

    function save() {
        ipcRenderer.send(SET_PREFERENCE,{key:props.name, value: new_value})
    }

    useEffect(() => {
        ipcRenderer.on(PREFERENCE_SET, (event, data) => {
            if (data.success) {
                setValue(new_value);
                setEditing(false);
                showSuccess(data.message)
                //wait 2 seconds and restart the app
                setTimeout(() => {
                    ipcRenderer.send(RESTART_APPLICATION)
                }, 2000);
            }
            else {
                setEditing(false);
                showError(data.message)
            }
            
        })
    }, []);


    const toast = useRef<Toast>(null);

    const showSuccess = (message:string) => {
        toast.current?.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    }
    const showError = (message:string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }
    return (
        <div>
            <Card title={props.name} footer={editButton}>
                {currentValue}
            </Card>

            <Dialog header={`Edit ${props.name}`} visible={editing} style={{ width: '50vw' }}
                onHide={() => setEditing(false)} >
                <p className="m-0">
                    {getInput(props.type)}
                </p>
                <Button label="Submit" icon="pi pi-save" loading={loading} onClick={save} />
            </Dialog>
            <Toast ref={toast} />
        </div>

    )
}

export default SettingItem