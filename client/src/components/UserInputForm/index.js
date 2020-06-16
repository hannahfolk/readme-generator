import React, { useState } from "react";
import { Form, Button, TextArea, Icon } from "semantic-ui-react";
import TechForm from "../TechForm";
import AckForm from "../AckForm";
import "./style.css";
import API from "../../utils/API";

const options = [
  { key: "m", text: "MIT", value: "MIT" },
  { key: "a", text: "APACHE 2.0", value: "APACHE 2.0" },
  { key: "g", text: "GPL 3.0", value: "GPL 3.0" },
  { key: "b", text: "BSD 3", value: "BSD 3" },
  { key: "n", text: "None", value: "none" },
];

const UserInputForm = () => {
  const [formObject, setFormObject] = useState({
    acknowledgements: [],
    builtWith: [],
    contributing: "",
    description: "",
    email: "",
    imagePreview: "",
    installation: "",
    license: "",
    linkedIn: "https://linkedin.com/in/",
    name: "",
    projectName: "",
    repoName: "",
    twitter: "https://twitter.com/",
    usage: "",
    username: "",
  });
  const [techState, setTechState] = useState([]);
  const [ackState, setAckState] = useState([]);

  const {
    contributing,
    description,
    email,
    imagePreview,
    installation,
    linkedIn,
    name,
    projectName,
    repoName,
    twitter,
    usage,
    username,
  } = formObject;

  const _createTechForm = () => {
    return techState.map((tech, i) => (
      <TechForm
        key={`tech-${i}`}
        techState={techState}
        i={i}
        handleTechChange={handleTechChange}
        removeTech={removeTech}
      />
    ));
  };

  const handleTechChange = (event) => {
    const updatedTechs = [...techState];
    const dataIndex = event.target.dataset.index;
    const className = event.target.className;
    updatedTechs[dataIndex][className] = event.target.value;
    setTechState(updatedTechs);
  };

  const _addTech = () => {
    setTechState([...techState, { techName: "", techURL: "" }]);
  };

  const removeTech = (event) => {
    const techCards = [...techState];
    const dataIndex = event.target.dataset.index;
    techCards.splice(dataIndex, 1);
    setTechState(techCards);
  };

  const _createAckForm = () => {
    return ackState.map((ack, i) => (
      <AckForm
        key={`ack-${i}`}
        ackState={ackState}
        i={i}
        handleAckChange={handleAckChange}
        removeAck={removeAck}
      />
    ));
  };

  const handleAckChange = (event) => {
    const updatedAcks = [...ackState];
    const dataIndex = event.target.dataset.index;
    const className = event.target.className;
    updatedAcks[dataIndex][className] = event.target.value;
    setAckState(updatedAcks);
  };

  const _addAck = () => {
    setAckState([...ackState, { name: "", url: "" }]);
  };

  const removeAck = (event) => {
    const ackCards = [...ackState];
    const dataIndex = event.target.dataset.index;
    ackCards.splice(dataIndex, 1);
    setAckState(ackCards);
  };

  const _handleImageChange = async (event) => {
    console.log(event.target.files[0]);

    const [file] = event.target.files;

    if (!file) return;

    const imagePreview = await _generatePreviewImg(file);
    setFormObject({ ...formObject, imagePreview });
  };

  const _generatePreviewImg = (file) => {
    return new Promise((resolve, reject) => {
      const loadImg = () => {
        reader.removeEventListener("load", loadImg);
        reader.removeEventListener("error", loadError);
        resolve(reader.result);
      };

      const loadError = (event) => {
        reader.removeEventListener("load", loadImg);
        reader.removeEventListener("error", loadError);
        reject(event);
      };

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", loadImg);
      reader.addEventListener("error", loadError);
    });
  };

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const _handleSelectChange = (event, { name, value }) => {
    setFormObject({ ...formObject, [name]: value });
  };

  const _handleFormSubmit = (event) => {
    event.preventDefault();

    setFormObject({
      ...formObject,
      acknowledgements: ackState,
      builtWith: techState,
    });
    console.log(formObject);
    API.generateREADME(formObject);
  };

  return (
    <Form onSubmit={_handleFormSubmit}>
      <h2 className="header">Your Information</h2>
      <hr />
      <Form.Group widths="equal">
        <Form.Field required>
          <label>GitHub Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="GitHub Username"
            onChange={_handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="John Smith"
            onChange={_handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="johnsmith@example.com"
            onChange={_handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>LinkedIn URL</label>
          <input
            type="text"
            name="linkedIn"
            value={linkedIn}
            onChange={_handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Twitter Handle</label>
          <input
            type="text"
            name="twitter"
            value={twitter}
            placeholder="Twitter Handle"
            onChange={_handleInputChange}
          />
        </Form.Field>
      </Form.Group>
      <h2 className="header">Project Information</h2>
      <hr />
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Repo Name</label>
          <input
            type="text"
            name="repoName"
            value={repoName}
            placeholder="Repo Name"
            onChange={_handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            placeholder="Project Name"
            onChange={_handleInputChange}
            required
          />
        </Form.Field>
        <Form.Select
          label={"License"}
          options={options}
          name="license"
          placeholder={"License"}
          onChange={_handleSelectChange}
          required
        ></Form.Select>
      </Form.Group>
      <Form.Field
        control={TextArea}
        label={"Description"}
        name="description"
        value={description}
        placeholder="Please write a short description about your project here."
        onChange={_handleInputChange}
      />
      <Form.Group>
        <Form.Field>
          <label htmlFor="projectScreenshot">
            Project Image/Gif
            <div id="projectScreenshotWrapper">
              <input
                id="projectScreenshot"
                type="file"
                name="projectScreenshot"
                onChange={_handleImageChange}
                hidden
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Project Screenshot/Gif"
                  id="previewImage"
                />
              ) : (
                <div id="uploadWrapper">
                  <Icon name="file image" />
                  <span id="uploadSubtitle">
                    Click here to upload your project screenshot or gif.
                  </span>
                </div>
              )}
            </div>
          </label>
        </Form.Field>
      </Form.Group>
      <h5 className="subHeader">Built With Information</h5>
      <hr />
      <Button basic color="black" onClick={_addTech} className="add">
        <Icon name="plus" />
        Add Technology
      </Button>
      {_createTechForm()}
      <hr />
      <Form.Field>
        <label>Installation</label>
        <input
          type="text"
          name="installation"
          value={installation}
          placeholder="What command should be run to install dependencies? (npm install is default)"
          onChange={_handleInputChange}
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field
          control={TextArea}
          label="Usage"
          name="usage"
          value={usage}
          placeholder="What does the user need to know about using the repo or the application?"
          onChange={_handleInputChange}
        />
        <Form.Field
          control={TextArea}
          label="Contributing"
          name="contributing"
          value={contributing}
          placeholder="What does the user need to know about contributing to the repo? (i.e. 'Clone the repo. Make your changes on a new branch. Push it to that branch, and make a pull request.')"
          onChange={_handleInputChange}
        />
      </Form.Group>
      <h5 className="subHeader">Acknowledgements</h5>
      <hr />
      <Button basic color="black" onClick={_addAck} className="add">
        <Icon name="plus" />
        Add Acknowledgement
      </Button>
      {_createAckForm()}
      <Button
        fluid
        type="submit"
        content="Generate README.md"
        id="generate"
        color="blue"
      />
    </Form>
  );
};

export default UserInputForm;
