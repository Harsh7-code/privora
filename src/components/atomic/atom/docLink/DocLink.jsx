import CloseIcon from "@mui/icons-material/Close";
import ExternalLink from "@mui/icons-material/Launch";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // minHeight: "70vh",
    // maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  iframe: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    // flex-grow: 1; border: none; margin: 0; padding: 0;
    flexGrow: 1,
    border: "none",
    margin: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  size = "large",
  docLink = "https://positive-intentions.com/docs/basics/getting-started/",
  defaultOpen = false,
  onClose,
  title = "Getting started",
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [showIframe, setShowIframe] = useState(false);
  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };
  const handleOpen = () => setOpen(true);
  const handleOpenLink = () => window.open(docLink, "_blank");
  return (
    <>
      <IconButton
        size={size}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpen}
      >
        <QuestionMarkIcon />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
        disablePortal
        fullWidth
        fullHeight
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title ? title : "Docs"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {showIframe && (
            <iframe
              src={docLink}
              width="80vw"
              height="100%"
              frameBorder="0"
              title={title}
              style={{
                minHeight: "70vh",
                maxHeight: "70vh",
              }}
            />
          )}
          {!showIframe && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setShowIframe(true)}
                variant="contained"
                color="primary"
              >
                Show "{title}" page here
              </Button>
              <br />

              <Button
                onClick={handleOpenLink}
                variant="contained"
                color="primary"
              >
                Open "{title}" in new tab
              </Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {showIframe && (
            <Button onClick={handleOpenLink} variant="secondary">
              {title}
              <ExternalLink style={{ marginLeft: 5 }} />
            </Button>
          )}
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
