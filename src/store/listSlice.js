import { createSlice, current} from "@reduxjs/toolkit";


const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    list: [],
  },
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    addCard: (state, action) => {
      state.list.forEach((item) => {
        if (item.id === action.payload.parentId) {
          if (Object.hasOwn(item, "children")) {
            item.children.push(action.payload);
          } else {
            item.children = [];
            item.children.push(action.payload);
          }
        }
      });
    },
    deleteList: (state, action) => {
      const itemIndex = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.list.splice(itemIndex, 1);
      }
    },
    deleteCard: (state, action) => {
      const { id, parentId } = action.payload;
      const itemIndex = state.list.findIndex((item) => item.id === parentId);
      if (itemIndex !== -1) {
        const childCardIndex = state.list[itemIndex].children.findIndex(
          (item) => item.id === id
        );
        if (childCardIndex !== -1) {
          state.list[itemIndex].children.splice(childCardIndex, 1);
        }
      }
    },
    updateCard: (state, action) => {
      const { id, parentId } = action.payload;
      const itemIndex = state.list.findIndex((item) => item.id === parentId);
      if (itemIndex !== -1) {
        const childCardIndex = state.list[itemIndex].children.findIndex(
          (item) => item.id === id
        );
        if (childCardIndex !== -1) {
          if (
            !state.list[itemIndex].children[childCardIndex].hasOwnProperty(
              "description"
            )
          ) {
            state.list[itemIndex].children[childCardIndex].description = action.payload.description;
          } else{
            state.list[itemIndex].children[childCardIndex].description = action.payload.description;
          }
        }
      }
    },
    dndinsamelist: (state, action) => {
        const { source, destination } = action.payload;
        if (
          source &&
          destination &&
          source.droppableId === destination.droppableId
        ) {
          const parentId = source.droppableId;
          console.log(parentId);
          const itemIndex = state.list.findIndex(
            (item) => "droppable-" + item.id.toString() === parentId
          );
  
          if (itemIndex !== -1) {
            const { index: sourceIndex } = source;
            const { index: destinationIndex } = destination;
            const updatedItem = { ...state.list[itemIndex] };
            [
              updatedItem.children[sourceIndex],
              updatedItem.children[destinationIndex],
            ] = [
              updatedItem.children[destinationIndex],
              updatedItem.children[sourceIndex],
            ];
            console.log("updated item", updatedItem);
            state.list = [
              ...state.list.slice(0, itemIndex),
              updatedItem,
              ...state.list.slice(itemIndex + 1),
            ];
          }
        }
  
        // console.log(current(state));
      },
      dndindifferentlist: (state, action) => {
        const { source, destination } = action.payload;
        console.log(source, destination);
        if (
          source &&
          destination &&
          source.droppableId !== destination.droppableId
        ) {
          const sourceParentId = source.droppableId;
          const destinationParentId = destination.droppableId;
  
          const sourceItemIndex = state.list.findIndex(
            (item) => "droppable-" + item.id.toString() === sourceParentId
          );
  
          const destinationItemIndex = state.list.findIndex(
            (item) => "droppable-" + item.id.toString() === destinationParentId
          );
          console.log(sourceItemIndex, destinationItemIndex);
          if (sourceItemIndex !== -1 && destinationItemIndex !== -1) {
            const { index: sourceIndex } = source;
            const { index: destinationIndex } = destination;
            console.log(sourceIndex, destinationIndex);
            console.log(current(state.list));
  
            const moveItem = {
              ...current(state.list[sourceItemIndex]?.children[sourceIndex]),
            };
            console.log(moveItem,"before");
  
            // Check if movedItem is not undefined before updating parentId
            if (moveItem) {
              moveItem.parentId = state.list[destinationItemIndex].id;
              console.log("moved item", moveItem);
            } else {
              console.error("movedItem is undefined");
            }
            console.log(moveItem,"after");
  
  
            state.list[sourceItemIndex].children.splice(sourceIndex, 1);
            if (!state.list[destinationItemIndex].hasOwnProperty("children")) {
              state.list[destinationItemIndex].children = [];
            }
            state.list[destinationItemIndex].children.splice(
              destinationIndex,
              0,
              moveItem
            );
          }
        }
      },
    },
  });
  export const {
    addList,
    addCard,
    deleteList,
    deleteCard,
    updateCard,
    dndinsamelist,
    dndindifferentlist,
  } = listSlice.actions;
  export default listSlice.reducer;
    
 

