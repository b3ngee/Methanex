import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import { popupBoxTwoButtons } from '../styles/popupBoxTwoButtons.scss';

const PopupBoxTwoButtons = ({ label, isOpen, onClose, onCancel}) => {
    Modal.setAppElement('body');
    return (
        <Modal
            className={popupBoxTwoButtons}
            isOpen={isOpen}
        >{label}
        <div>
            <Button
                type="submit"
                label="Confirm"
                onClick={onClose}
            />
            <Button
                type="submit"
                label="Cancel"
                onClick={onCancel}
            />
        </div>
        </Modal>
    );
};

PopupBoxTwoButtons.propTypes = {
    label: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default PopupBoxTwoButtons;
