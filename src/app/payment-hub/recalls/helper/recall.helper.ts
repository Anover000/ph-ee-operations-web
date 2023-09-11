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

export const recallStatusData = [
    {
        option: 'Accepted',
        value: 'SUCCESSFUL_ACCEPTED',
        css: 'green'
    },
    {
        option: 'Received',
        value: 'RECEIVED',
        css: 'blue'
    },
    {
        option: 'Rejected',
        value: 'SUCCESSFUL_REJECTED',
        css: 'red'
    }
];

export const recallDirectionData = [
    {
        option: 'AFR incoming recall',
        value: 'AFR.incoming.recall',
        css: 'black'
    },
    {
        option: 'AFR outgoing recall',
        value: 'AFR.outgoing.recall',
        css: 'black'
    },
    {
        option: 'IG2 incoming recall',
        value: 'IG2.incoming.recall',
        css: 'black'
    },
    {
        option: 'IG2 outgoing recall',
        value: 'IG2.outgoing.recall',
        css: 'black'
    }
];

export const paymentStatusData = [
    {option: 'Received', value: 'RECEIVED', css: 'green'},
    {option: 'Successful transfer', value: 'SUCCESSFUL_TRANSFER', css: 'green'},
    {option: 'In progress', value: 'IN_PROGRESS', css: 'green'},
    {option: 'Suspended', value: 'SUSPENDED', css: 'green'},
    {option: 'Waiting for Fincrime decision', value: 'WAITING_FOR_FINCRIME_DECISION', css: 'green'}
];
