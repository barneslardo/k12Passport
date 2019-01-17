import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class VisitorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("New Visitor Submitted: " + this.state.value);
    console.log(this.state.value);
    event.preventDefault();
    axios
      .post("/api/newVisitor", {
        visitorName: this.state.value
      })
      .then(response => {
        console.log("Data submitted successfully");
      })
      .catch(error => {
        console.log("Got error while posting data", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default VisitorForm;
