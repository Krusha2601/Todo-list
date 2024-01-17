import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteCard, updateCard } from "../store/listSlice";

Modal.setAppElement("#root");
const Card = ({ cardInfo, index }) => {
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [boxValue, setBoxValue] = useState(" ");

  const openModal = (cardId) => {
    setSelectedCard(cardId);
  };

  const closeModal = () => {
    console.log(selectedCard)
    setSelectedCard(null);
    console.log(selectedCard)
    
  };
  function removeChild() {
    console.log("clicked");
    console.log("cardInfo", cardInfo);
    console.log("id", cardInfo);
    dispatch(deleteCard(cardInfo));
  }
  const updatedData = {
    cardInfo: cardInfo,
    description: boxValue,
  };
  const handleclick = () => {
    console.log(cardInfo);
    dispatch(updateCard(updatedData));
  };

  return (
    <>
      <div className="cursor-pointer" onClick={() => openModal()}>
        <div className="bg-white p-2 mt-2 rounded-lg">
          {cardInfo.title}
          <button
            title="Delete Card"
            className="text-red-500 float-right font-semibold"
            onClick={removeChild}
          >
            Delete
          </button>
        </div>
      </div>

      <Modal
        isOpen={selectedCard !== null}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="border border-slate-300 rounded-md bg-amber-300">
          <div className="flex justify-between">
            <p
              className="m-2 font-serif font-bold"
              
            >
              {" "}
              Task : {cardInfo.title}
            </p>
            <button
              onClick={closeModal}
              className=" bg-gray-200 border-2 border-b-gray-600 m-2 w-10 hover:border-black hover:cursor-pointer rounded-md"
            >
              x
            </button>
          </div>
          <div className="m-2 rounded-lg">
            <p className="my-1 font-serif">Task Description:</p>
            <textarea
              className="border border-sky-800 mx-2 font-sans"
              rows="5"
              cols="45"
              value={boxValue !== "" ? boxValue : ""}
              onChange={(e) => setBoxValue(e.target.value)}
            ></textarea>
            <br></br>
            <button className="m-1 bg-yellow-600 rounded-md w-[50px] mx-60 hover:cursor-pointer font-sans"
                    onClick={handleclick}>Save</button>
          </div>
          <div className="my-2">
            <p className="font-sans ml-2">
              DueDate: {cardInfo.DueDate}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
