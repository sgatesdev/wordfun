import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WordFunContext } from './WordFunProvider';
import { HOSTNAME, PORT } from '../utils/constants';

const CreateLessonModal: React.FC = () => {
    const {
        showNewLesson,
        setShowNewLesson,
        changeLessonId
    } = useContext(WordFunContext);

    const [newLessonName, setNewLessonName] = useState('');

    const createLesson = async () => {
        let res = await fetch(`http://${HOSTNAME}:${PORT}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newLessonName})
        })
        if (!res.ok) {
            console.warn("lesson creation failed")
            return
        }
        let data = await res.json()
        changeLessonId(data.id)
        setShowNewLesson(false)
    }

    return (
        <Modal show={showNewLesson} onHide={() => setShowNewLesson(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" 
            value={newLessonName}
            onChange={(e) => setNewLessonName(e.target.value)}
            placeholder="Lesson Name" />
            <Button variant="primary" onClick={createLesson}>Create</Button>
        </Modal.Body>
        </Modal>
    )
}

export default CreateLessonModal;