import axios from "axios";

export default {
  generateREADME: (formObject, techState, ackState) => {
    axios({
      method: "POST",
      url: "/generateREADME",
      data: {
        formObject,
        techState,
        ackState,
      },
    });
  },
};
