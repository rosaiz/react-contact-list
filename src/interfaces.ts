//Contact Interface
export interface ContactInterface {
    id: string;
    name: string;
    companyName: string;
    isFavourite: boolean;
    emailAddress: string;
    birthDate: Date;
    phone: {
        work: number;
        home: number;
        mobile: number;
    }
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: number;
    }
}

//Contact Form Interface
export interface ContactFormState {
    [key: string]: any;
    values: ContactInterface[];
    submitSuccess: boolean;
    loading: boolean;
}

//Contact Edit Values Interface
export interface ContactEditInterface {
    [key: string]: any
}

//Contact Edit From Interface
export interface ContactEditForm {
    id: number;
    contact: any;
    values: ContactEditInterface[];
    submitSuccess: boolean;
    loading: boolean;
}