import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { WordFunContext } from './WordFunProvider';

const ShowSuccessModal: React.FC = () => {
    const {
        showSuccessModal,
        setShowSuccessModal
    } = useContext(WordFunContext);

    return (
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>AWESOME JOB HAILEY!</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body> */}
        <iframe width="500" height="315" src="https://www.youtube.com/embed/LlhKZaQk860?si=ePalezEn4_E31qhf&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        {/* </Modal.Body> */}
        </Modal>
    )
}

export default ShowSuccessModal;