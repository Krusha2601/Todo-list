import React, { useRef, useState } from "react";
import { addList, addCard } from "../store/listSlice";
import { useDispatch } from "react-redux";

const AddNew = ({ type, parentId }) => {
  const [inputValue, setInputValue] = useState("");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  const forminput = useRef(null);
  const sumbitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) {
      forminput.current.focus();
      return;
    }
    if (type) {
      dispatch(
        addCard({
          id: Math.random(),
          title: inputValue,
          parentId: parentId,
          DueDate: new Date().setDate(30).toString(),
        })
      );
    } else {
      dispatch(addList({ id: Math.random(), title: inputValue }));
    }
    hideForm();
    setInputValue("");
  };

  const updateInput = (e) => {
    setInputValue(e.target.value);
  };

  const openForm = () => {
    setIsFormVisible(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
  };
  return (
    <div>
      <button onClick={openForm}>
        + Add {type ? "a Card" : "another List"}
      </button>
      {isFormVisible && (
        <form onSubmit={sumbitHandler} className="mt-3">
          <input
            autoFocus
            ref={forminput}
            value={inputValue}
            onChange={updateInput}
            className="w-full h-10 p-2"
            placeholder={type ? "Enter card name" : "Enter list name"}
          />
          <div className="mt-3">
            <button onClick={hideForm} className="mr-3">
              Cancel
            </button>
            <button className="p-3 px-2 py-1 bg-gray-400">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNew;
