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
import Settings from '../components/settings';
const Activate = () => {
  //define the url. since the https version fails
  //sometimes, retry with the http version when 
  //necessary
  const [loading, setLoading] = useState(false)
  const keyField = useRef<HTMLInputElement>();
  const [requestStatus, setRequestStatus] = useState(null);
  const toast = useRef(null);
  const settingsData: { [key: string]: any } = {

    number_of_shifts: '',
    restrict_zero_stock_sales: '',
    tax: '',
    logo: '',
    receipt_logo: '',
    tax_title: '',
    show_tax_on_receipt: '',
    receipt_show_credits: '',
    receipt_extra_info: '',
    receipt_footer: '',
    receipt_show_customer: '',
    receipt_product_data: '',
    receipt_font_size: '',
    receipt_show_borders: '',
    duplicate_record_timeout: '',
    company_name: '',
    phone: '',
    email: '',
    address: '',
    digital_address: '',
    admin_password: ''
  }

  function sendValidation() {
    if (keyField.current.value) {
      setLoading(true)
      ipcRenderer.send(CALL_ACTIVATION, keyField.current.value)
    }
  }

  useEffect(() => {
    ipcRenderer.on(ACTIVATION_RESULT, (event, data) => {
      setLoading(false)

      setRequestStatus(data.data)
      console.log(data)
      if (data.data.status === "1") {
        for (const key in data.data.data) {
          if (Object.hasOwn(settingsData, key)) {
            settingsData[key] = data.data[key]
          }
        }

        setActiveIndex(1)
      }

    })


  }, [])
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='flex flex-column justify-content-center align-items-center '>
      <h2>Activate Your System</h2>
      <Button><Link to="/">hOME</Link></Button>
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Enter Activation Code">
          <form>
            <div className="flex flex-column justify-content-center align-items-center">

              <div >
                <b>Please enter your activation code. If you do not have one, please contact us via our form at
                  <a href="http://calronsoftwares.com">http://calronsoftwares.com</a>
                </b>
              </div>

              <InputText required ref={keyField} />
              <Button type='submit' label='Submit' loading={loading} onClick={sendValidation} ></Button>
              {
                requestStatus && requestStatus.data.status === "-1" ? <ActivationFailed /> : null
              }
            </div>

          </form>
        </TabPanel>
        <TabPanel header="Settings">
          <div>
            {
              requestStatus && requestStatus.data.status === "1" ?
                <div>
                  <ActivationSuccess data={requestStatus.data.data} />
                  <Settings address={settingsData.address} number_of_shifts={settingsData.number_of_shifts}
                    restrict_zero_stock_sales={settingsData.restrict_zero_stock_sales} tax={settingsData.tax}
                    logo={settingsData.logo} receipt_logo={settingsData.receipt_logo} tax_title={settingsData.tax_title}
                    show_tax_on_receipt={settingsData.show_tax_on_receipt} receipt_show_credits={settingsData.receipt_show_credits}
                    receipt_extra_info={settingsData.receipt_extra_info} receipt_footer={settingsData.receipt_footer}
                    receipt_show_customer={settingsData.receipt_show_customer} receipt_product_data={settingsData.receipt_product_data}
                    receipt_font_size={settingsData.receipt_font_size}
                    receipt_show_borders={settingsData.receipt_show_borders} duplicate_record_timeout={settingsData.duplicate_record_timeout}
                    company_name={settingsData.company_name}
                    phone={settingsData.phone} email={settingsData.email} digital_address={settingsData.digital_address}
                    admin_password={settingsData.admin_password} ></Settings>
                </div> : null
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