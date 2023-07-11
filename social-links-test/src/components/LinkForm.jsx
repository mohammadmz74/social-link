import { Button, Card, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import useInput from "../hooks/use-input";
import { infoActions } from "../store/info-slice";
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

function LinkForm() {
  const dispatch = useDispatch();
  const editRecord = useSelector((state) => state.info.editRecord);
  const editForm = useSelector((state) => state.ui.editForm);

  const {
    value: enteredType,
    valueChangeHandler: typeChangeHandler,
    valueSetHandler: typeSetHandler,
    reset: resetType,
  } = useInput(() => {});
  const {
    value: enteredSocialLink,
    valueSetHandler: socialLinkSetHandler,
    valueChangeHandler: socialLinkChangeHandler,
    inputBlurHandler: socialLinkBlurHandler,
    reset: resetSocialId,
  } = useInput(() => {});
  const {
    value: enteredSocialId,
    valueSetHandler: socialIdSetHandler,
    valueChangeHandler: socialIdChangeHandler,
    inputBlurHandler: socialIdBlurHandler,
    reset: resetSocialLink,
  } = useInput(() => {});

  const closeHandler = () => {
    dispatch(uiActions.closeHandler());
  };
  const submitHandler = () => {
    dispatch(
      infoActions.addRecord({
        type: enteredType,
        socialLink: enteredSocialLink,
        socialId: enteredSocialId,
      })
    );
    dispatch(uiActions.closeHandler());
    resetSocialId();
    resetSocialLink();
    resetType();
  };
  useEffect(() => {
    if (editForm) {
      socialIdSetHandler(editRecord.socialId);
      socialLinkSetHandler(editRecord.socialLink);
      typeSetHandler(editRecord.type);
    }
  });

  return (
    <Card sx={{ p: 2 }} component="form">
      {editForm ? (
        <h5>{`ویرایش مسیر ارتباطی ${editRecord.type}`}</h5>
      ) : (
        <h5>{"افزودن مسیر ارتباطی"}</h5>
      )}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
        }}
        component="form"
      >
        <TextField
          select
          label="نوع*"
          value={editForm ? editRecord.type : enteredType}
          onChange={typeChangeHandler}
          sx={{ width: "100%", mb: 2, mr: 2 }}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.icon} {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          value={enteredSocialLink}
          onChange={socialLinkChangeHandler}
          onBlur={socialLinkBlurHandler}
          label="لینک"
          sx={{ width: "100%", mb: 2, mr: 2 }}
        />
        <TextField
          value={enteredSocialId}
          onChange={socialIdChangeHandler}
          onBlur={socialIdBlurHandler}
          label="آی دی (ID)"
          sx={{ width: "100%", mb: 2 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={closeHandler} variant="outlined">
          {"انصراف"}
        </Button>
        <Button sx={{ ml: 2 }} onClick={submitHandler} variant="contained">
          {editForm
            ? `ویرایش مسیر ارتباطی ${editRecord.type}`
            : "ثبت مسیر ارتباطی"}
        </Button>
      </Box>
    </Card>
  );
}

export default LinkForm;
