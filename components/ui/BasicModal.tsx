import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface Props extends PropsWithChildren {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
}

export const BasicModal: FC<Props> = ({ show, setShow, title, children }) => {
  const handleClose = () => setShow(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { push } = useRouter();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers style={{ width: 500, height: 80 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color={"secondary"}
          sx={{
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          }}
          onClick={() => {
            handleClose();
            push("/dashboard/company");
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
