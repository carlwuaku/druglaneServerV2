import React, { useState, useEffect } from 'react';

import { ipcRenderer } from 'electron';
import Header from '../components/Header';
import { COMPANY_NAME_RECEIVED, GET_COMPANY_NAME } from '@/utils/stringKeys';
import ServerState from '../components/ServerState';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import ServerLogs from '../components/ServerLogs';
import SettingItem from '../components/SettingItem';

const Index = () => {


    const [companyName, setCompanyName] = useState("Company Name")

   

    useEffect(() => {

        ipcRenderer.send(GET_COMPANY_NAME);




        ipcRenderer.on(COMPANY_NAME_RECEIVED, (event: any, data: any) => {
            setCompanyName(data)
        });



        const getCompanyDetails = async () => {
            const res = await fetch('http://127.0.0.1:5100/api_admin/settings');
            const data = res.json();
            console.log(data)
        };
        getCompanyDetails().catch(error => { console.log(error) })

    }, [])


    return (
        <>
            <Header></Header>
            <Button><Link to="/activate">Activation</Link></Button>

            <div><h2 className='shadowText'>{companyName}</h2></div>
            <div className="grid">
                <div className="col-8">
                    <ServerState></ServerState>


                </div>
          <div className="col-4">
            <SettingItem name={'Port'} value={'5000'} type={'input'}></SettingItem>
            <SettingItem name={'Backup Time'} value={'19'} type={'select'} options={['1','19','20']}></SettingItem>

                <ServerLogs></ServerLogs>
                </div>
            </div>
            {/* <Container>
        <Row>
          
        </Row>
        <Row>
          <Col xs={12} md={4} lg={4}>
            

            
            <Card>
              <ListGroup>
                {
                  serverLogs.map((log, index) => (
                    <ListGroupItem key={index}>
                      {log}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Card>

          </Col>
          <Col xs={12} md={4} lg={8}>
            <Card >
              <CardHeader>
                <Typography variant='h4'>
                Connecting other computers
                </Typography>
              </CardHeader>
              <CardContent>

                <Typography variant="h5" component="div">
                  <DvrIcon fontSize='medium'></DvrIcon>  Server State
                </Typography>

                <Typography variant="body2">
                  To run the client on other computers or phones, open a browser (preferably
                  Google Chrome) on the device, and enter the following url in the address bar: 

                </Typography>
                <Alert key={"primary"} variant={"primary"}>
                  <h4>{ serverUrl }/client</h4>
                </Alert>
              </CardContent>
              
            </Card>
          </Col>
          <Col xs={12} md={8} lg={4}>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <Card>
              <CardHeader>Backups</CardHeader>
              <CardContent></CardContent>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card>
              <CardHeader>Remote Access</CardHeader>
              <CardContent></CardContent>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <CardHeader>
                  <Typography>header</Typography>
                  Scan to Connect a Phone</CardHeader>
              </CardContent>
              
            </Card>
          </Col>
        </Row>
      </Container> */}
        </>
    );
}

export default Index;