import React from "react";
import { Form, Card, Button } from "semantic-ui-react";
import "./style.css";

const AckForm = props => {
    const name = `name${props.i}`;
    const url = `url${props.i}`;
    return (
        <Card className="acknowledgement" fluid raised>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Name of Acknowledgement</label>
                    <input
                        type="text"
                        name={name}
                        data-index={props.i}
                        id={name}
                        className="name"
                        value={props.ackState[props.i].name}
                        placeholder="e.g. John Smith or @johnsmith"
                        onChange={props.handleAckChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>URL to Acknowledgement's Website</label>
                    <input
                        type="text"
                        name={url}
                        data-index={props.i}
                        id={url}
                        className="url"
                        value={props.ackState[props.i].url}
                        placeholder="e.g. https://medium.com/"
                        onChange={props.handleAckChange}
                    />
                </Form.Field>
                <Card.Content>
                    <Button
                        icon="window close"
                        color="red"
                        floated="right"
                        data-index={props.i}
                        onClick={props.removeAck}
                    />
                </Card.Content>
            </Form.Group>
        </Card>
    );
};

export default AckForm;