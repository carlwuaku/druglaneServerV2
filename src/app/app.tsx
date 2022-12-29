import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import  Container  from 'react-bootstrap/Container';
import AddLogItem from './components/AddLogItem';
import LogItem from './components/LogItem';
import { Log } from './interfaces/Log.interface';
import Alert from 'react-bootstrap/Alert';
import { ipcRenderer } from 'electron';
const App = () => {
  const [logs, setLogs] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  useEffect(() => {
  
    ipcRenderer.on("license_called", (event: any, data: any) => {
      console.log("license called")
    })
  }, [])



  function addItem(item:Log) {
    // setLogs()
    if (!item.text || !item.priority || !item.user) {
      showAlert("enter all fields", 'danger');
      return;
    }
    // item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString()
    ipcRenderer.send("logs:add", item);
    setLogs([...logs, item])
    showAlert('Log added','success')
    // alert(item)
    // console.log(item)
  }

  function showAlert(message:string, variant:string, seconds:number = 3000) {
    setAlert({
      message: message,
      show: true,
      variant: variant
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        variant:''
      })
  }, seconds);
  }

  function validate() {
    ipcRenderer.send("call_validation");
  }

  function deleteItem(_id: number) {
    ipcRenderer.send("logs:delete", _id)
    // setLogs(logs.filter((item) => item._id != _id));
    showAlert("item deleted","success")
  }

  return (
    <Container>
      <Button onClick={()=>{validate()}}>call</Button>
    </Container>
  );
}

export default App;