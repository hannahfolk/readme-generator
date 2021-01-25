import axios from "axios";

export default {
  generate: (formObject, techState, ackState) => {
    axios({
      method: "POST",
      url: "/generate",
      data: {
        formObject,
        techState,
        ackState,
      },
    });
  },
};
