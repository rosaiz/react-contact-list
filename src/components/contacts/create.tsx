import * as React from 'react'
import axios from 'axios'
import {  ContactFormState } from '../../interfaces'
import { RouteComponentProps, withRouter } from 'react-router-dom'

class Contact extends React.Component<RouteComponentProps, ContactFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: '',
            name: '',
            companyName: '',
            isFavourite: false,
            emailAddress: '',
            birthDate: '',
            phone: {
                work: '',
                home: '',
                mobile: ''
            },
            address: {
                street: '',
                city: '',
                state: '',
                country: '',
                zipCope: ''
            },
            values: [],
            loading: false,
            submitSuccess: false
        }
    }
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            name: this.state.name,
            companyName: this.state.companyName,
            isFavourite: this.state.isFavourite,
            emailAddress: this.state.emailAddress,
            birthDate: this.state.birthDate,
            phone: {
                work: this.state.phone.work,
                home: this.state.phone.home,
                mobile: this.state.phone.mobile,
            },
            address: {
                street: this.state.address.street,
                city: this.state.address.city,
                state: this.state.address.state,
                country: this.state.address.country,
                zipCode: this.state.address.country
            },
        }
            this.setState({ submitSuccess: true, value: [this.state.values, formData], loading: false });
            axios.post('http://localhost:5000/data', formData).then(data => [
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500)
        ]);
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md- 12 form-wrapper"}>
                    <h2>Create Post</h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The Form was successfully submited!
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="Enter Contact's name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="companyName">Company Name</label>
                            <input type="text" id="companyName" onChange={(e) => this.handleInputChanges(e)} name="companyName" className="form-control" placeholder="Enter Company name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="emailAddress">Email Address</label>
                            <input type="text" id="emailAddress" onChange={(e) => this.handleInputChanges(e)} name="emailAddress" className="form-control" placeholder="Enter Contact's email" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="birthDate">Date of Birth</label>
                            <input type="text" id="birthDate" onChange={(e) => this.handleInputChanges(e)} name="birthDate" className="form-control" placeholder="Enter Contact's birth date" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="phone">Work Phone</label>
                            <input type="text" id="workPhone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter Contact's work phone" />
                            <label htmlFor="phone">Home Phone</label>
                            <input type="text" id="homePhone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter Contact's home phone" />
                            <label htmlFor="phone">Mobile Phone</label>
                            <input type="text" id="mobilePhone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter Contact's mobile phone" />
                        </div>
                        <div className="form-group col-md-12">
                            <h2 className="address">Address</h2>
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" onChange={(e) => this.handleInputChanges(e)} name="street" className="form-control" placeholder="Enter Street adrress" />
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" onChange={(e) => this.handleInputChanges(e)} name="city" className="form-control" placeholder="Enter City adrress" />
                            <label htmlFor="state">State</label>
                            <input type="text" id="state" onChange={(e) => this.handleInputChanges(e)} name="state" className="form-control" placeholder="Enter State adrress" />
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" onChange={(e) => this.handleInputChanges(e)} name="country" className="form-control" placeholder="Enter Country adrress" />
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="text" id="zipCode" onChange={(e) => this.handleInputChanges(e)} name="zipCode" className="form-control" placeholder="Enter Zip Code" />
                        </div>
                        <div className="form-group col-md-12">
                            <button className="btn btn-success" type="submit" >Create</button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>

                </div>
            </div>
            )
    }

}


export default withRouter (Contact)