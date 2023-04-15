import { Card } from 'primereact/card';
import React from 'react';

const ActivationSuccess = ({ data }: { [key: string]: any }) => {
    return (
        <Card header={"Activation Code Confirmed"} subTitle={`The details associated with the key are as follows. 
        You can edit them from the settings menu later`}>
            {
                Object.keys(data).map(key => {
                  return  <div key={Math.random()}>
                      <b>{key}</b><br />
                      {data[key]}
                    </div>
                })
            }
            
        </Card>
    )
}

export default ActivationSuccess