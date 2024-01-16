import React, { useState } from 'react'
import { addList } from '../store/listSlice';
import { useDispatch } from 'react-redux';
const AddNew = () => {
  const [inputValue, setInputValue] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  const sumbitHandler = (e) =>{
    e.preventDefault();
    
    dispatch(addList({id:Math.random(), title:inputValue}));
    console.log("input val",inputValue);
  };

  const updateInput = (e) =>{
    setInputValue(e.target.value)
  }

  const openForm =() =>{
    setIsFormVisible(true)
  }
  const hideForm =() =>{
    setIsFormVisible(false)
  }
  return (
    <div><button onClick={openForm}>+ Add New</button>
    {isFormVisible &&<form onSubmit={sumbitHandler} className='mt-3'>
      <input value={inputValue} onChange={updateInput}/>
      <div className='mt-3'>
      <button onClick={hideForm} className='mr-3'>Cancel</button>
      <button onClick={sumbitHandler} className='p-3 px-2 py-1 bg-gray-400'>Save</button>
      </div></form>}
      </div>
  )
}

export default AddNew