import axios from "axios";

export default {
  generateREADME: (formObject, techState, ackState) => {
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
