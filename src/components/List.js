import React from 'react'
import Card from './card'
import AddNew from './AddNew'
import { useSelector } from "react-redux";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  return (
    <>
    {listItem.length && listItem.map((list) =><div key={list.id} className='p-3 bg-slate-200 w-1/3'>{list.title}</div>)}
    
    <div className='p-3 bg-slate-200 w-1/3'>
      
      {/* <Card/> */}
    <AddNew/>
    </div>
    </>
  )
}

export default List