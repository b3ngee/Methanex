import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import { popupBox } from '../styles/popupBox.scss';

const PopupBox = ({ label, isOpen, onClose }) => {
    return (
        <Modal
            className={popupBox}
            isOpen={isOpen}
        >{label}
        <Button
            type="submit"
            label="Close"
            onClick={onClose}
        />
        </Modal>
    );
};

PopupBox.propTypes = {
    label: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default PopupBox;
