import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const SettingItem = (props: { name: string, value: string, type: string, options?: string[] }) => {
    const [editing, setEditing] = useState(false);
    const [new_value, setValue] = useState(props.value);
    

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

    return (
        <div>
            <Card header={props.name} footer={editButton}>
                {props.value}
            </Card>

            <Dialog header={`Edit ${props.name}`} visible={editing} style={{ width: '50vw' }} onHide={() => setEditing(false)}>
                <p className="m-0">
                    {getInput(props.type)}
                </p>
            </Dialog>
        </div>

    )
}

export default SettingItem