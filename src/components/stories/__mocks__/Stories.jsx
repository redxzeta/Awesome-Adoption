import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FetchingButton } from "../../layout/Buttons/FetchingButton";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "../Stories.css";
function Stories(initShow, success = false) {
  const [show, setShow] = useState(initShow);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (success) {
      clearInput();
      handleClose();
    } else {
      setErr("Display err from supabase");
    }
  };

  const clearInput = () => {
    setTitle("");
    setDesc("");
    setCountry("");
    setRegion("");
    setErr("");
  };

  return (
    <div className="stories">
      <div className="main_title">
        <h1>User Story</h1>
        <Button className="story_btn" onClick={handleShow}>
          Create your Story
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} role="modalForm">
        <Modal.Header closeButton>
          <Modal.Title>Create Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formContainer">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="form.title">
                <Form.Label className="str-form-label">Title</Form.Label>
                <Form.Control
                  role="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="form.description">
                <Form.Label className="str-form-label">Description</Form.Label>
                <Form.Control
                  role="desc"
                  as="textarea"
                  value={desc}
                  name="desc"
                  onChange={(e) => setDesc(e.target.value)}
                  rows={5}
                  required
                />
              </Form.Group>

              <Form.Group controlId="form.country">
                <Form.Label className="str-form-label">Country</Form.Label>
                <CountryDropdown
                  role="country"
                  className="country"
                  name="country"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="form.region">
                <Form.Label className="str-form-label">Region</Form.Label>
                <RegionDropdown
                  role="region"
                  className="region"
                  name="region"
                  blankOptionLabel="No Country Selected"
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  required
                />
              </Form.Group>
              <br />
              <hr />
              <div className="btnContainer">
                <button
                  className="mBtn clearBtn"
                  onClick={clearInput}
                  role="clearBtn"
                >
                  Clear
                </button>
                <button
                  className="mBtn closeBtn"
                  onClick={handleClose}
                  role="closeBtn"
                >
                  Close
                </button>
                <FetchingButton
                  role="saveBtn"
                  action="Save"
                  type="submit"
                  className="mBtn saveBtn"
                />
              </div>
            </Form>
          </div>
        </Modal.Body>
        {err && (
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        )}
      </Modal>
    </div>
  );
}
export default Stories;
