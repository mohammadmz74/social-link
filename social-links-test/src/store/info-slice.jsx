import { createSlice } from "@reduxjs/toolkit";

const infoSlice = createSlice({
  name: "form",
  initialState: { editRecord: {}, records: [] },
  reducers: {
    addRecord(state, action) {
      const newRecord = action.payload;
      const existingRecord = state.records.find(
        (record) => record.type === newRecord.type
      );
      if (!existingRecord) {
        state.records.push({
          type: newRecord.type,
          socialLink: newRecord.socialLink,
          socialId: newRecord.socialId,
        });
      } else {
        if (existingRecord.type === state.editRecord.type) {
          existingRecord.type = newRecord.type;
          existingRecord.socialLink = newRecord.socialLink;
          existingRecord.socialId = newRecord.socialId;
        }
      }
    },
    removeRecord(state, action) {
      const type = action.payload;
      state.records = state.records.filter((record) => record.type !== type);
    },
    editRecord(state, action) {
      const editRecordType = action.payload;
      state.editRecord = state.records.find(
        (record) => record.type === editRecordType
      );
    },
  },
});
export const infoActions = infoSlice.actions;
export default infoSlice;
