import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import EmployeeSearchResults from "../components/EmployeeSearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    employeeArray: [],
    error: "",
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getEmployee().then((employeeResult) =>
      this.setState({ employeeArray: employeeResult.data.results })
    );
    API.getBaseBreedsList()
      .then((res) => this.setState({ breeds: res.data.message }))
      .catch((err) => console.log(err));
  }

  searchName = () => {
    console.log(this.state.employeeArray.sort());
  };

  findPerson =() =>{
    console.log("finding person.. NOT FINISHED DOES NOT WORK");
  }

  searchImage = () => {
    console.log("inside image function"
    );

  };

  searchDob = () => {
    console.log("inside DOB function"
    );

  };

  searchPhone = () => {
    console.log("inside phone function")
  }
  searchEmail  = () => {
    console.log("inside email function")
  }


  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch((err) => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Search By Breed!</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>

          <SearchForm
            findPerson={this.findPerson}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            breeds={this.state.breeds}
          />
           <SearchResults results={this.state.results} />

          <EmployeeSearchResults
           searchDob={this.searchDob}
            searchEmail={this.searchEmail}
           searchPhone={this.searchPhone}
           searchImage={this.searchImage}
            searchName={this.searchName}
            results={this.state.employeeArray}
          />
        </Container>
      </div>
    );
  }
}

export default Search;
