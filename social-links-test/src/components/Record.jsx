import { Backdrop, Button, Card, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/use-input";
import { infoActions } from "../store/info-slice";
import { uiActions } from "../store/ui-slice";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
const types = [
  {
    value: "تویتر",
    icon: <TwitterIcon />,
  },
  {
    value: "تلگرام",
    icon: <TelegramIcon />,
  },
  {
    value: "واتساپ",
    icon: <WhatsAppIcon />,
  },
  {
    value: "اینستاگرام",
    icon: <InstagramIcon />,
  },
];

function Record(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const {
    value: enteredText,
    valueChangeHandler: textChangeHandler,
    isValid: textIsValid,
    reset: resetText,
  } = useInput((value) => value.trim() !== "تایید");
  const deleteHandler = () => {
    dispatch(infoActions.removeRecord(props.type));
    setOpen(!open);
    resetText();
  };
  const editHandler = () => {
    dispatch(uiActions.editHandler());
    dispatch(infoActions.editRecord(props.type));
  };
  const recordType = types.find((item) => item.value === props.type);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        mt: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {recordType.icon} <p style={{ marginRight: "16px" }}>{props.type}</p>
        <label style={{ marginRight: "16px" }} htmlFor="ID">
          {"آی دی(ID):"}
        </label>
        <p
          id="ID"
          style={{ direction: "ltr", textAlign: "right", marginRight: "16px" }}
        >
          {props.socialId}
        </p>
        <label style={{ marginRight: "16px" }} htmlFor="link">
          {"لینک:"}
        </label>
        <a
          href="g"
          color="#ffa726"
          style={{ marginRight: "16px" }}
          width="100%"
          variant="text"
        >
          <p style={{ marginRight: "16px" }} id="lnk">
            {props.socialLink}
          </p>
        </a>
      </Box>
      <Box>
        <Button startIcon={<CreateIcon />} onClick={editHandler} variant="text">
          {"ویرایش"}
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleToggle}
          variant="text"
          color="error"
        >
          {"حذف"}
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ p: 2, width: "30vw" }}>
          <h4>{"آیا از تصمیم خود مطمئن هستید؟"}</h4>
          <h6>{`برای حذف مسیر ارتباطی ${props.socialId} لطفا تائید را بنویسید`}</h6>
          <TextField
            value={enteredText}
            onChange={textChangeHandler}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button variant={"text"} onClick={handleClose}>
              {"انصراف"}
            </Button>
            <Button
              onClick={deleteHandler}
              disabled={textIsValid}
              variant="text"
              color="error"
            >
              {"حذف"}
            </Button>
          </Box>
        </Card>
      </Backdrop>
    </Card>
  );
}

export default Record;
