import { Button } from 'primereact/button';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <div className="card flex justify-content-center">
                <h3>Page Not Found</h3>
                <b>Please enter your activation code. If you do not have one, please contact us via our form at
                    <a href="http://calronsoftwares.com">http://calronsoftwares.com</a>
                </b>
                <Button><Link to="/">Go Back To The Home Page</Link></Button>
            </div>
        </div>
    )
}