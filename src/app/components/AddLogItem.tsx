import React, {useState} from 'react'
import  Col  from 'react-bootstrap/col';
import Card from 'react-bootstrap/card';
import Form from 'react-bootstrap/form';
import Row from 'react-bootstrap/row';
import Button from 'react-bootstrap/Button';

const AddLogItem = ({addItem}:{addItem:Function}) => {
    const [text, setText] = useState('');
    const [user, setUser] = useState('');
    const [priority, setPriority] = useState('');
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //empty the fields
        addItem({text, user, priority})
        setText("");
        setUser("");
        setPriority("");
    }
    //ON SUBMIT 
  return (
      <Card className='mt-5 mb-3'>
          <Card.Body>
              <Form onSubmit={onSubmit}>
                  <Row className='my-3'>
                      <Col>
                          <Form.Control
                              placeholder='Log'
                              value={text}
                          onChange={(e) => setText(e.target.value)} />
                              
                      </Col>
                      
                  </Row>
                  <Row>
                      <Col>
                          <Form.Control
                              placeholder='User'
                              value={user}
                              onChange={(e) => setUser(e.target.value)} />

                      </Col>
                      <Col>
                          <Form.Control as='select'
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}>
                              <option value="">Select One</option>
                              <option value="low">Low</option>
                              <option value="moderate">Moderate</option>
                              <option value="high">High</option>
                          </Form.Control>
                      </Col>
                  </Row>
                  <Row className='my-3'>
                      <Col>
                          <Button type='submit'
                              variant='secondary'
                          >Add Log</Button>
                      </Col>
                  </Row>
              </Form>
          </Card.Body>
    </Card>
  )
}

export default AddLogItem