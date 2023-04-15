import React, { useRef } from "react";
import { useFormik, FormikProps, FormikErrors, Form, } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
const Settings = (props:ISettings) => {
    const toast = useRef(null);
    const show = () => {
        toast.current.show({
            severity: 'success', summary: 'form submitted',
            detail: formik.values.number_of_shifts
        });
    }
    
    const formik = useFormik({
        initialValues: {
            number_of_shifts: props.number_of_shifts,
            restrict_zero_stock_sales: props.restrict_zero_stock_sales,
            tax: props.tax,
            logo: props.logo,
            receipt_logo: props.receipt_logo,
            tax_title: props.tax_title,
            show_tax_on_receipt: props.show_tax_on_receipt,
            receipt_show_credits: props.receipt_show_credits,
            receipt_extra_info: props.receipt_extra_info,
            receipt_footer: props.receipt_footer,
            receipt_show_customer: props.receipt_show_customer,
            receipt_product_data: props.receipt_product_data,
            receipt_font_size: props.receipt_font_size,
            receipt_show_borders: props.receipt_show_borders,
            duplicate_record_timeout: props.duplicate_record_timeout,
            company_name: props.company_name,
            phone: props.phone,
            email: props.email,
            address: props.address,
            digital_address: props.digital_address,
            admin_password: props.admin_password,
        },
        validate: (values: ISettings) => {
            let errors: FormikErrors<ISettings> = {};
            if (!values.email) {
                errors.email = 'Required';
            } 
            return errors;
        },
        onSubmit: (data) => {

        }
    })
    // const isFormFieldInvalid = (name:string) => !!(formik.touched[name] && formik.errors[name]);

  return (
      <div>
          
          <div className="card flex justify-content-center">
              <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                  
                  
                  <span className="p-float-label">
                      <Toast ref={toast} />
                      <InputText required
                          id="phone"
                          name="phone"
                          value={formik.values.phone}
                          onChange={(e) => {
                              formik.setFieldValue('value', e.target.value);
                          }}
                          
                      />
                      <label htmlFor="phone">Phone</label>
                  </span>
                  <span className="p-float-label">
                      <Toast ref={toast} />
                      <InputText required
                          id="email"
                          name="email" 
                          value={formik.values.email}
                          onChange={(e) => {
                              formik.setFieldValue('value', e.target.value);
                          }}

                      />
                      <label htmlFor="email">Email</label>
                  </span>
                  <Button type="submit" label="Submit" />
              </form>
          </div>
    </div>
  )
}

export default Settings

interface ISettings{
    number_of_shifts: string;
    restrict_zero_stock_sales: string;
    tax: string;
    logo: string;
    receipt_logo: string;
    tax_title: string;
    show_tax_on_receipt: string;
    receipt_show_credits: string;
    receipt_extra_info: string;
    receipt_footer: string;
    receipt_show_customer: string;
    receipt_product_data: string;
    receipt_font_size: string;
    receipt_show_borders: string;
    duplicate_record_timeout: string;
    company_name: string;
    phone: string;
    email: string;
    address: string;
    digital_address: string;
    admin_password: string;
}