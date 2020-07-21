import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import axios from 'axios'

interface IState {
    contacts: any[];
    /*phone: any[];
    address: any[];*/
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            contacts: [],
            /*phone: [],
            address: [],*/
        }
    }

    public componentDidMount(): void {
        axios.get('http://localhost:5000/data').then(data => {
            /*let phoneArray = [];
            let addressArray = [];
            for (var i = 0; i < data.data.lenght; i++) {
                phoneArray.push(data.data[i].address);
            }
            for (var j = 0; j < data.data.lenght; j++) {
                addressArray.push(data.data[j].address);
            }*/
            this.setState({
                contacts: data.data,
               /* phone: phoneArray,
                address: addressArray*/
            })
        })
    }

    public deleteContact(id: number) {
        axios.delete(`http://localhost:5000/data/${id}`).then(data => {
            const index = this.state.contacts.findIndex(contact => contact.id === id);
            this.state.contacts.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const contacts = this.state.contacts;
        //const phone = this.state.phone;
        //const address = this.state.address;

        return (
            <div>
                {contacts.length === 0 && (
                    <div className= "text-center">
                        <h2>No contacts found</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts && contacts.map(contact => 
                                        <tr key={contact.id}>
                                            <td>{contact.name}</td>
                                            <td>{contact.companyName}</td>
                                            <td>{contact.emailAddress}</td>
                                            <td>{contact.phone.work}</td>
                                            <td>{contact.address.street}</td>
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                        <Link to={`edit/${contact.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteContact(contact.id)}>Delete Customer</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )
    }
}