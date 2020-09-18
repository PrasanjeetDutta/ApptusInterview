import { LightningElement, api, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/AccountContact.getContactList';
const accountFields = ['Name', 'NumberOfEmployees', 'My_Field__c', 'Phone', 'BillingStreet', 'BillingCity',
    'BillingState', 'BillingPostalCode'];
const columns = [
    { label: 'Last Name', fieldName: 'LastName', initialWidth: 200 },
    { label: 'Title', fieldName: 'Title', initialWidth: 200 },
];
export default class AccountContact extends LightningElement {
    @api recordId;
    @track accountFields = accountFields;
    @track error;
    @track contactCustomerSuccess;
    @track contactApplicationDeveloper;
    @track totalContacts;
    columns = columns;
    @track contacts;

    @wire(getContactList, { accId: '$recordId' })
    wiredAccounts({ error, data }) {
        if (data) {
            console.log(JSON.stringify(data));
            this.totalContacts = data.length;
            this.contacts = data;
            let success = [];
            let developer = [];
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].Title == 'Customer Success') {
                    success.push(this.contacts[i]);
                }
                else if (this.contacts[i].Title == 'Application Developer') {
                    developer.push(this.contacts[i]);
                }
            }
            this.contactCustomerSuccess = success;
            this.contactApplicationDeveloper = developer;
            console.log('successss--->', JSON.stringify(this.contactCustomerSuccess));
            console.log('successss2--->', JSON.stringify(this.contactApplicationDeveloper));
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }

}