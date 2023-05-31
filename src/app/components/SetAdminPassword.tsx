import React, { useState } from 'react'
import { useFormik, FormikErrors, } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

const SetAdminPassword = ({onSubmit}:{onSubmit: Function}) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password:''
        },
        validate: (values: { password: string, confirm_password: string }) => {
            let errors: FormikErrors<{ password: string, confirm_password:string }> = {};
            if (!values.password) {
                errors.password = 'Required';
            }
            if (!values.confirm_password) {
                errors.confirm_password = 'Required';
            }
            return errors;
        },
        onSubmit: (data) => {
            if (data.confirm_password !== data.password) {
                alert("Please make sure the passwords match");
                return;
            }
            //validate and emit data to parent
            setLoading(true);
            onSubmit();
            // ipcRenderer.send(CALL_ACTIVATION, data.code)
        }
    });
  return (
      <form onSubmit={formik.handleSubmit} >
          <div className="flex flex-column gap-3 justify-content-center align-items-center">

             
            
                 
                      <label htmlFor="password">Enter the administrator password. Please make sure you save it
                  somewhere safe</label>
              <div>
                  <Password id="password" required className='wide-input' feedback={false}
                      value={formik.values.password}
                      onChange={(e) => {
                          formik.setFieldValue('password', e.target.value);
                      }}
                  />
                  {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </div>
             
                  
              <label htmlFor="password">Type the password again.</label>
              <div>
                  <Password required id="confirm_password" className='wide-input' feedback={false}
                      value={formik.values.confirm_password}
                      onChange={(e) => {
                          formik.setFieldValue('confirm_password', e.target.value);
                      }}
                  />
                  {formik.values.confirm_password !== formik.values.password ? <div>Make sure the passwords match</div> : null} 
              </div>
              {}
                  
                  
            
              <Button type='submit' label='Submit' loading={loading} ></Button>
              
          </div>

      </form>
  )
}

export default SetAdminPassword