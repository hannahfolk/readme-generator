import React from "react";
import { Form, Card, Button } from "semantic-ui-react";
import "./style.css";

const TechForm = props => {
    const techNameId = `techName${props.i}`;
    const techURLId = `techURL${props.i}`;
    return (
        <Card className="tech" fluid raised>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Name of Technology</label>
                    <input
                        type="text"
                        name={techNameId}
                        data-index={props.i}
                        id={techNameId}
                        className="techName"
                        value={props.techState[props.i].techName}
                        placeholder="e.g. Node.js, React, Bootstrap, etc."
                        onChange={props.handleTechChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>URL to Technology's Website</label>
                    <input
                        type="text"
                        name={techURLId}
                        data-index={props.i}
                        id={techURLId}
                        className="techURL"
                        value={props.techState[props.i].techURL}
                        placeholder="e.g. https://getbootstrap.com/"
                        onChange={props.handleTechChange}
                    />
                </Form.Field>
                <Card.Content>
                    <Button
                        icon="window close"
                        color="red"
                        floated="right"
                        data-index={props.i}
                        onClick={props.removeTech}
                    />
                </Card.Content>
            </Form.Group>
        </Card>
    );
};

export default TechForm;