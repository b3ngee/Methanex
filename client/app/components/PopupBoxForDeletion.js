import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import { popupBoxForDeletion } from '../styles/popupBoxForDeletion.scss';

const PopupBox = ({ label, isOpen, onClose, onCancel}) => {
    Modal.setAppElement('body');
    return (
        <Modal
            className={popupBoxForDeletion}
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

PopupBox.propTypes = {
    label: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default PopupBox;
