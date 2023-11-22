/** Angular Imports */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/** rxjs Imports */
import { merge, of } from 'rxjs';

/** Custom Services */
import { RequestToPayService } from '../service/request-to-pay.service';
import { formatDateForDisplay } from '../../../shared/date-format/date-format.helper';

/** Custom Data Source */
import { transactionStatusData as statuses } from "../helper/incoming-request.helper";
import { paymentStatusData as paymenStatuses } from "../helper/incoming-request.helper";

import { DfspEntry } from '../model/dfsp.model';

@Component({
  selector: 'mifosx-outgoing-request-to-pay',
  templateUrl: './outgoing-request-to-pay.component.html',
  styleUrls: ['./outgoing-request-to-pay.component.scss']
})
export class OutgoingRequestToPayComponent implements OnInit {

  /** Minimum transaction date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum transaction date allowed. */
  maxDate = new Date();
  filterForm: FormGroup;
  /* Requests to pay data. */
  requestToPayData: any;
  /* Requests to outgoing data. */
  requestToPayOutgoingData: Array<any> = [];

  /** Columns to be displayed in request to pay table. */
  displayedColumns: string[] = ['startedAt', 'completedAt', 'transactionId', 'payerPartyId', 'payeePartyId', 'payerDfspId','payerDfspName', 'amount', 'currency', 'state'];

  /** Data source for request to pay table. */
  dataSource: MatTableDataSource<any>;

  transactionStatusData = statuses;
  paymentStatusData = paymenStatuses;

  dfspEntriesData:  DfspEntry[];
  currenciesData: any;
  /** Paginator for requesttopay table. */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Sorter for requesttopay table. */
  @ViewChild(MatSort) sort: MatSort;

  constructor(private requestToPayService: RequestToPayService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
      this.filterForm = this.formBuilder.group({
        status: new FormControl(),
        paymentStatus: new FormControl(),
        transactionDateFrom: new FormControl(),
        transactionDateTo: new FormControl()
      });
    this.route.data.subscribe((data: { requestsToPay: any,dfspEntries: DfspEntry[],currencies: any }) => {
      this.requestToPayData = data.requestsToPay.content;
      this.currenciesData = data.currencies;
      this.dfspEntriesData = data.dfspEntries;
    });
    for(let request of this.requestToPayData) {
    	if(request.direction==="OUTGOING")
    		this.requestToPayOutgoingData.push(request);
    };
    console.log(this.requestToPayOutgoingData);
  }

  ngOnInit() {
    this.setRequestToPay();
    //console.log(this.dataSource);
  }

  /**
   * Initializes the data source, paginator and sorter for request to pay table.
   */
  setRequestToPay() {
    this.dataSource = new MatTableDataSource(this.requestToPayOutgoingData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  formatDate(date: string): string {
    return formatDateForDisplay(date);
  }

  shortenValue(value: any) {
    return value && value.length > 15 ? value.slice(0, 13) + '...' : value;
  }

  displayCurrencyName(currency?: any): string | undefined {
    return currency ? currency.Currency + ' (' + currency.AlphabeticCode + ')' : undefined;
  }

  getDfpsEntry(dfpsId?: any): DfspEntry | undefined {
    const elements = this.dfspEntriesData.filter((option) => option.id === dfpsId);
    return elements.length > 0 ? elements[0] : undefined;
  }

  /**
   * Displays office name in form control input.
   * @param {any} office Office data.
   * @returns {string} Office name if valid otherwise undefined.
   */
  displayDfspName(entry?: any): string | undefined {
    return entry ? entry.name : undefined;
  }

}
