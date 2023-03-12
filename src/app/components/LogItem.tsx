import React from 'react'
import { Log } from '../interfaces/Log.interface'
import  Button  from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge';
// import { formatDate } from '@/server/helpers/dateHelper';
const LogItem = ({ log, deleteItem }: { log: Log, deleteItem:Function }) => {
    
    const getBg = (priority:string) => {
        if (priority == "high") {
            return "danger";
        }
        else if (priority == "moderate")
            return "warning";
        else return "success";
    }

    function _deleteItem(_id: number) {
        deleteItem(_id);
    }
  return (
      <tr>
          <td>
              <Badge bg={getBg(log.priority)} >
                  {log.priority.charAt(0).toUpperCase() + 
                  log.priority.slice(1)}
              </Badge>
              </td>
          <td>{log.text}</td>
          <td>{log.user}</td>
          {/* <td>{formatDate(log.created)}</td> */}
          <td><Button onClick={() =>_deleteItem(log._id)} variant='danger' size='sm'>X
          </Button> </td>
    </tr>
  )
}

//set the prop attributes expected
interface propType{
    log:Log
}

export default LogItem