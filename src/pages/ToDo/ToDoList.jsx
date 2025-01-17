import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ToDoList.module.css' 
import { Button, Divider, Input, message, Modal } from 'antd'
import { getErrorMessage } from '../../util/GetError';
import { getUserDetails } from '../../util/GetUser';
import ToDoServices from '../../services/toDoServices';
// import { getAllToDo } from '../../../../controllers/toDoController';
import { useNavigate } from 'react-router';

function TodoList() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let user = getUserDetails();
    const getAllToDo = async () =>{
      try{
        const response = await ToDoServices.getAllToDo(user?.userId);
        console.log(response.data);
        setAllToDo(response.data);
      } catch(err){
        console.log(err);
      }
    }
    if(user && user?.userId){
      getAllToDo()
    } else{
      navigate('/login')
    }
  },[])
  

  const handleSubmitTask = async () => {
    setLoading(true)
    try{
      const userId = getUserDetails()?.userId
      
      const data = {
        title,
        description,
        isCompleted:false,
        createdBy: userId,
      }
      const response = await ToDoServices.createToDo(data)
      console.log(response.data)
      setLoading(false)
      message.success("ToDo Task Added")
      setIsAdding(false)
    } catch(err){
      setLoading(false)
      message.error(getErrorMessage(err))
    }
  }
  return (
    <>
      <Navbar active={"myTask"}/>  
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeaders}>
          <h2>Your Task</h2>
          <Input style={{width:'50%'}} placeholder='Search Your Task Here...'/>
          <div>
            <Button onClick={() => setIsAdding(true)} type='primary' size='large'>Add Task</Button>
          </div>
        </div>

        <Divider />

        <Modal confirmLoading={loading} title="Add New Task" open={isAdding} onOk={handleSubmitTask} onCancel={()=>setIsAdding(false)}>
          <Input style={{marginBottom:'1rem'}} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input.TextArea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </Modal>
        
      </section>  
    </>
  )
}

export default TodoList