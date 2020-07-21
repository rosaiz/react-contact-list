import * as React from 'react'
import axios from 'axios'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ContactEditInterface, ContactEditForm } from '../../interfaces'

class EditContact extends React.Component<RouteComponentProps<any>, ContactEditForm> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            contact: {},
            values: [],
            loading: false,
            submitSuccess: false
        }
    }
    public componentDidCatch(): void {
        axios.get(`http://localhost:5000/data/${this.state.id}`).then(data => {
            this.setState({ contact: data.data });
        })
    }
    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/data/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            },1500)
        })
    }
    private setValues = (values: ContactEditInterface) => {
        this.setState({ values: {...this.state.values, ...values}})
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.contact &&
                <div>
                    <h1>Contact List manager </h1>  
                    
                    <div>
                        <div className={"col-md-12 form-wrapper"}>
                            <h2>Edit Contact </h2>
                            {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    Contact's details has been edited successfully.
                                </div>
                            )}
                            <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                <div className="form-output col-md-12">
                                    <label htmlFor="name"> Name </label>
                                    <input type="text" id="name" defaultValue={this.state.contact.name} onChange={(e) => this.handleInputChanges(e)}
                                    name="name" className="form-control" placeholder="Enter contact's name" />
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
                                <div className="form-group col-md-4 pull-right">
                                    <button className="btn btn-success" type="submit" > Edit Contact</button>
                                    {loading &&
                                        <span className="fa fa-circle-o-notch fa-spin" />
                                    }
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                }
            </div>
            )
    }
       

}

export default withRouter (EditContact)