import { ReactNode } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

interface BackdropProps {
  onClose: () => void,
}

const Backdrop: React.FC<BackdropProps> = ({ onClose }) => {
  return (
    <div className={classes.backdrop} onClick={onClose} />
  )
}

interface OverlayProps {
  children: ReactNode,
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

interface ModalProps {
  children: ReactNode,
  onClose: () => void,
};

const PortalElement = document.getElementById('overlays');

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, PortalElement as HTMLElement)}
      {ReactDOM.createPortal(<Overlay children={children} />, PortalElement as HTMLElement)}
    </>
  )
}
