import { WordFunContext } from "./WordFunProvider";
import { Modal, Table, Button } from "react-bootstrap";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from '../utils/helpers';

export const ChooseLessonModal: React.FC = () => {
    const { 
        lessons, 
        showChooseLesson, 
        setShowChooseLesson,
        setSelectedLesson,
        selectedLesson,
        showNewLesson,
        setShowNewLesson,
        changeLessonId
    } = useContext(WordFunContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const lessonId = queryParams.get('lessonId')

    return (
    <Modal
      show={showChooseLesson || (!lessonId && !showNewLesson)}
      onHide={() => setShowChooseLesson(false)}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Choose a Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Last Update</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {lessons &&
              lessons
                .sort((a, b) => a.updatedAt! > b.updatedAt! ? -1 : 1)
                .map((lesson, index) => (
                <tr
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id!)}
                  className={
                    selectedLesson === lesson.id ? "table-primary" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{formatDate(lesson.updatedAt)}</td>
                  <td>{lesson.complete ? "Finished" : "In Progress"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            setShowChooseLesson(false);
            setShowNewLesson(true);
          }}
        >
          New Lesson
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowChooseLesson(false);
            changeLessonId(selectedLesson);
          }}
        >
          Select
        </Button>
        <Button variant="secondary" onClick={() => setShowChooseLesson(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChooseLessonModal;