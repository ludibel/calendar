import { FC } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledIconButton } from './styledModal';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ModalProps {
  openModal: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerTitle: string;
}

const DialogTitleWithIconClose = (props: DialogTitleProps) => {
  const { children, onClose } = props;
  return (
    <DialogTitle>
      {children}
      {onClose ? (
        <StyledIconButton
          aria-label='Fermer la fenêtre de dialogue'
          onClick={onClose}
        >
          <CloseIcon />
        </StyledIconButton>
      ) : null}
    </DialogTitle>
  );
};
// createPortal permet de rendre le composant en dehors du composant parent
const Modal: FC<ModalProps> = ({
  openModal,
  hide,
  modalContent,
  headerTitle,
}) =>
  openModal
    ? createPortal(
        <>
          <Dialog
            onClose={hide}
            aria-labelledby='customized-dialog-title'
            open={openModal}
            data-testid='modal'
          >
            <DialogTitleWithIconClose
              id='customized-dialog-title'
              onClose={hide}
            >
              {headerTitle}
            </DialogTitleWithIconClose>
            <DialogContent dividers>
              <Typography gutterBottom>{modalContent}</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={hide}>
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </>,
        document.body,
      )
    : null;

export default Modal;
