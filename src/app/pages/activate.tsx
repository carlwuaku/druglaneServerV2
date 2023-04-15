import { ACTIVATION_RESULT, CALL_ACTIVATION } from '@/utils/stringKeys';
import { ipcRenderer } from 'electron';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ActivationFailed from '../components/ActivationFailed';
import ActivationSuccess from '../components/ActivationSuccess';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { MenuItem } from 'primereact/menuitem';
const Activate = () => {
  //define the url. since the https version fails
  //sometimes, retry with the http version when 
  //necessary
  const [loading, setLoading] = useState(false)
  const keyField = useRef<HTMLInputElement>();
  const [requestStatus, setRequestStatus] = useState(null);
  const toast = useRef(null);
 
  function sendValidation() {
    if (keyField.current.value) {
      setLoading(true)
      ipcRenderer.send(CALL_ACTIVATION, keyField.current.value)
    }
  }

  useEffect(() => {
    ipcRenderer.on(ACTIVATION_RESULT, (event, data) => {
      setLoading(false)
      console.log(data)
      setRequestStatus(data)
      setActiveIndex(1)
    })
  
    
  }, [])
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='flex flex-column justify-content-center align-items-center '>
      
      <Button><Link to="/">hOME</Link></Button>
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Activate your application">
          <form>
            <div className="flex flex-column justify-content-center align-items-center">
              
              <div >
                <b>Please enter your activation code. If you do not have one, please contact us via our form at
                  <a href="http://calronsoftwares.com">http://calronsoftwares.com</a>
                </b>
              </div>

              <InputText required ref={keyField} />
              <Button type='submit' label='Submit' loading={loading} onClick={sendValidation} ></Button>
            </div>

          </form>
        </TabPanel>
        <TabPanel header="Header II">
          <div>
            {
              requestStatus && requestStatus.data.status === "1" ? <ActivationSuccess data={requestStatus.data.data} /> : null
            }
            {
              requestStatus && requestStatus.data.status === "-1" ? <ActivationFailed /> : null
            }
          </div>
        </TabPanel>
        <TabPanel header="Header III">
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
        <TabPanel header="Header IV" disabled></TabPanel>
      </TabView>
      

      

      
    </div>
    


  )
}

export default Activate