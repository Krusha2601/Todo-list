import React from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import {
  deleteList,
  dndinsamelist,
  dndindifferentlist,
} from "../store/listSlice";
import { useSelector ,useDispatch } from "react-redux";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  const dispatch = useDispatch();

  const deleteListFn = (id) => {
    dispatch(deleteList({ id }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const data = {
      source: source,
      destination: destination,
    };
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (source.droppableId === destination.droppableId) {
      dispatch(dndinsamelist(data));
    } else {
      dispatch(dndindifferentlist(data));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {listItem.map((list, index) => (
        <div className="p-3 w-full md:w-1/3" key={list.id}>
          <div className={`p-3 bg-blue-200 rounded-lg`}>
            <div className="mb-4">
              {list.title}
              <button
                title="Delete List"
                onClick={() => deleteListFn(list.id)}
                className="text-red-600 float-right font-semibold"
              >
                Delete List
              </button>
            </div>
            <Droppable droppableId={`droppable-${list.id}`} type="CARD">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list?.children?.map((children, index) => (
                    <Draggable
                      key={children.id}
                      draggableId={`draggable-${children.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card cardInfo={children} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="mt-3 rounded-lg">
              <AddNew type="card" parentId={list.id} />
            </div>
          </div>
        </div>
      ))}

      <div className="p-3 w-full md:w-1/3 rounded-lg">
        <div className={`p-3 bg-blue-300 rounded-lg`}>
          <Droppable droppableId="droppable" type="CARD">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddNew />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default List;
