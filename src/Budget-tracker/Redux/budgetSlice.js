import { createSlice } from '@reduxjs/toolkit';
import { toast } from "sonner"
const initialState = {
  travelList: [],
  expenseList: [],
  totalBudget: 0,

  remainingBudget: 0,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  
  reducers: {
    setBudget: (state, action) => {
      if (action.payload <= 0) {
        toast("Please enter a positive budget.",{
          description: "You can't enter negative Budget. Please Enter postive value",
          action: {
            label: "Got it",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }

      state.totalBudget = action.payload;
      state.remainingBudget = action.payload;
    //   alert(`Remaining Budget: ${state.remainingBudget}`);
    },
    addExpense: (state, action) => {
      const { item, cost } = action.payload;
        
      // Ensure there's enough budget left
      if (state.remainingBudget >= cost) {
        state.expenseList.push({ ...item, cost });
        state.travelList.push({ ...item, cost });
        state.remainingBudget -= cost;

        // Loop through and display each expense item
        // alert(state.remainingBudget);
      } else {
        toast("You Have Exceeded Budget",{
          description: "Please tr removing some itineraries or improving budget",
          action: {
            label: "Got it",
            onClick: () => console.log("Undo"),
          },
        });
      }
    },
    removeExpense: (state, action) => {
      const { placeName } = action.payload;
    
      // Find index in travelList and expenseList
      const indexInTravelList = state.travelList.findIndex(item => item.placeName === placeName);
      const indexInExpenseList = state.expenseList.findIndex(item => item.placeName === placeName);
    
      // If the place is found in travelList, remove it and update the remaining budget
      if (indexInTravelList !== -1) {
        const removedItem = state.travelList[indexInTravelList];
        state.remainingBudget += removedItem.cost;
    
        // Remove the item from travelList
        state.travelList.splice(indexInTravelList, 1);
    
        // Check if the item is also in expenseList and remove it
        if (indexInExpenseList !== -1) {
          state.expenseList.splice(indexInExpenseList, 1);
        }
      }
    },
    

    addFreeItem: (state, action) => {
      const freeItem = { ...action.payload.item, cost: 0 }; // Always ensure cost is 0 for free items
      state.travelList.push(freeItem);
      // alert(freeItem);
    },

    
  },
});

export const { setBudget, addExpense,removeExpense, addFreeItem } = budgetSlice.actions;
export default budgetSlice.reducer;
