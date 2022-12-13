import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import  Container  from 'react-bootstrap/Container';
import AddLogItem from './components/AddLogItem';
import LogItem from './components/LogItem';
import { Log } from './interfaces/Log.interface';
import Alert from 'react-bootstrap/Alert';
// import { ipcRenderer } from 'electron/renderer';
const App = () => {
  const [logs, setLogs] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  useEffect(() => {
    // window.electron.ipcRenderer.send("logs:load");
    // window.electron.ipcRenderer.on("logs:get", (event:any, logs:any) => {
    //   setLogs(JSON.parse(logs))
    // })
  })

  function addItem(item:Log) {
    // setLogs()
    if (!item.text || !item.priority || !item.user) {
      showAlert("enter all fields", 'danger');
      return;
    }
    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString()
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

  function deleteItem(_id: number) {
    setLogs(logs.filter((item) => item._id != _id));
    showAlert("item deleted","success")
  }

  return (
    <Container>
      <AddLogItem addItem={addItem}></AddLogItem>
      {alert.show && <Alert variant={alert.variant}>{ alert.message}</Alert>}
      {logs.length} items left
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { logs.map( log => 
            <LogItem deleteItem={deleteItem} key={log._id} log ={log} />
          )
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default App;