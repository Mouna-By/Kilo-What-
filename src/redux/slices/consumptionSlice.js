import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const consumptionSlice = createSlice({
    name: "consumption",
    initialState,
    reducers: {
        // Ajouter une consommation avec ID horodaté
        addConsumption: (state, action) => {
            state.list.push({
                id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // ID unique horodaté
                ...action.payload,
            });
        },

        // Supprimer par ID
        removeConsumption: (state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload);
        },

        // Modifier par ID
        editConsumption: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.list.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...updatedData,
                };
            }
        },

        // Vider la liste
        clearAllConsumptions: (state) => {
            state.list = [];
        },
    },
});

export const {
    addConsumption,
    removeConsumption,
    clearAllConsumptions,
    editConsumption,
} = consumptionSlice.actions;

export default consumptionSlice.reducer;
