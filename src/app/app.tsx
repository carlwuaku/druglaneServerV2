import React, { useState, useEffect } from 'react';
import {  Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { ipcRenderer } from 'electron';
import Header from './components/Header';
import { COMPANY_NAME_RECEIVED, GET_COMPANY_NAME, GET_SERVER_STATE, GET_SERVER_URL, SERVER_MESSAGE_RECEIVED, SERVER_STATE_CHANGED, SERVER_URL_RECEIVED } from '@/utils/stringKeys';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PlayArrow } from '@mui/icons-material';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DvrIcon from '@mui/icons-material/Dvr';
import { CardHeader } from '@mui/material';
import Alert from 'react-bootstrap/Alert';

const App = () => {

  const [serverState, setServerState] = useState("...")
  const [serverLogs, setServerLogs] = useState([])
  const [companyName, setCompanyName] = useState("Company Name")
  const [serverUrl, setServerUrl] = useState(null)
  useEffect(() => {
    console.log("use effece 1 called")

  })

  useEffect(() => {
    console.log("use effece 2 called")

    ipcRenderer.send(GET_SERVER_STATE);
    ipcRenderer.send(GET_COMPANY_NAME);
    ipcRenderer.send(GET_SERVER_URL);

    ipcRenderer.on(SERVER_STATE_CHANGED, (event: any, data: any) => {
      console.log(SERVER_STATE_CHANGED, data)
      setServerState(data)
    });

    ipcRenderer.on(SERVER_MESSAGE_RECEIVED, (event: any, data: any) => {
      console.log(SERVER_MESSAGE_RECEIVED, serverLogs)
      //add it to the server logs
      // setServerLogs(serverLogs.concat([data]))
    });


    ipcRenderer.on(COMPANY_NAME_RECEIVED, (event: any, data: any) => {
      setCompanyName(data)
    });

    ipcRenderer.on(SERVER_URL_RECEIVED, (event: any, data: any) => {
      console.log(SERVER_URL_RECEIVED,data) 
      setServerUrl(data)
    })

    const getCompanyDetails = async () => {
      const res = await fetch('http://127.0.0.1:5100/api_admin/settings');
      const data = res.json();
      console.log(data)
    };
    getCompanyDetails().catch(error => {console.log(error)})

  }, [])


  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <h2 className='shadowText'>{companyName}</h2>
        </Row>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <Card >
              <CardContent>
                
                <Typography variant="h5" component="div">
                  <DvrIcon fontSize='medium'></DvrIcon>  Server State
                </Typography>
                
                <Typography variant="body2">
                  <p>{serverState}</p>
                </Typography>
              </CardContent>
              <CardActions>
                <Button color='error' startIcon={<PlayArrow />} size="small"> Stop</Button>
                <Button color="primary" startIcon={<StopIcon />} size="small">  Restart</Button>
                <Button color="primary" startIcon={<RestartAltIcon />} size="small">Start</Button>
              </CardActions>
            </Card>

            
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
      </Container>
    </>
  );
}

export default App;