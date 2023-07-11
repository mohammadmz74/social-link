import { Button, Card } from "@mui/material";
// import React, { useCallback, useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import Record from "./Record";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
function Body(props) {
  const dispatch = useDispatch();
  const editForm = useSelector((state) => state.ui.editForm);
  const formIsVisible = useSelector((state) => state.ui.formIsVisible);
  const records = useSelector((state) => state.info.records);

  //getting data from the server
  // const [recordsData, setRecordsData] = useState([
  //   {
  //     id: "1",
  //     social_id: "@amirrezaei",
  //     social_link: "https://twitter.com/amirrezaei",
  //     type: "",
  //   },
  // ]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const fetchHandler = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`http://localhost:3030/socials`);
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     const recData = await response.json();
  //     setRecordsData(recData);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(true);
  //   }
  // }, []);
  // useEffect(() => {
  //   fetchHandler();
  // }, [fetchHandler]);

  const clickHandler = () => {
    dispatch(uiActions.openHandler());
  };
  return (
    <Card sx={{ m: 16, p: 2, background: props.mode === "dark" && "#2f3a46" }}>
      <h6>{"مسیر های ارتباطی"}</h6>
      <Button
        startIcon={editForm ? <CreateIcon /> : <AddIcon />}
        variant="text"
        onClick={clickHandler}
        sx={{ mb: 2 }}
      >
        {editForm ? `ویرایش مسیر ارتباطی ` : "افزودن مسیر ارتباطی"}
      </Button>
      {formIsVisible && <LinkForm />}
      {records.map((option, index) => (
        <Record
          key={index}
          socialLink={option.socialLink}
          socialId={option.socialId}
          type={option.type}
        />
      ))}
    </Card>
  );
}

export default Body;
