export const transactionStatusData = [
    {
        option: 'Completed',
        value: 'COMPLETED',
        css: 'green'
    },
    {
        option: 'Failed',
        value: 'FAILED',
        css: 'red'
    },
    {
        option: 'In progress',
        value: 'IN_PROGRESS',
        css: 'orange'
    },
    {
        option: 'Exception',
        value: 'EXCEPTION',
        css: 'red'
    },
    {
        option: '',
        value: 'UNKNOWN',
        hidden: true
    }
];

export const paymentStatusData = [
    {option: 'Received', value: 'RECEIVED', css: 'green'},
    {option: 'Successful transfer', value: 'SUCCESSFUL_TRANSFER', css: 'green'},
    {option: 'In progress', value: 'IN_PROGRESS', css: 'green'},
    {option: 'Suspended', value: 'SUSPENDED', css: 'green'},
    {option: 'Waiting for Fincrime decision', value: 'WAITING_FOR_FINCRIME_DECISION', css: 'green'}
];

export const paymentSchemeData = [
    {option: 'HCT_INST', value: 'HCT_INST', css: 'green'},
    {option: 'IG2', value: 'IG2', css: 'green'},
    {option: 'ON_US', value: 'ON_US', css: 'green'},
    {option: 'IG2:RETURN', value: 'IG2:RETURN', css: 'green'}
];
