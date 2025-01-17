import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Dates } from 'app/core/utils/dates';
import { TransfersService } from './transfers.service';
import { Transfer, TransferData } from './model/transfer.model';
import { UntypedFormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'mifosx-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Minimum transaction date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum transaction date allowed. */
  maxDate = new Date();

  payeePartyId = new UntypedFormControl();
  payerPartyId = new UntypedFormControl();
  payerDfspId = new UntypedFormControl();
  payerDfspName = new UntypedFormControl();

  amount = new UntypedFormControl();
  /** Transaction date from form control. */
  transactionDateFrom = new UntypedFormControl(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  /** Transaction date to form control. */
  transactionDateTo = new UntypedFormControl(new Date());
  /** Source Ministry form control. */
  sourceMinistry = new UntypedFormControl();
  /** Batch Reference Number form control. */
  batchReferenceNumber = new UntypedFormControl();
  /** Bulk Amount form control. */
  bulkAmount = new UntypedFormControl();

  /** Transaction Type form control. */
  transactionType = new UntypedFormControl();
  /** Transaction ID form control. */
  transactionId = new UntypedFormControl();
  /** Columns to be displayed in transactions table. */
  displayedColumns: string[] = ['batchReferenceNumber', 'startedAt', 'completedAt', 'sourceMinistry', 'bulkAmount', 'payerFspId', 'status'];
  /** Data source for transactions table. */
  dataSource = new MatTableDataSource();

  totalRows: number = 0;
  currentPage: number = 0;

  pageSize = 50;
  isLoading = false;

  constructor(private dates: Dates,
    private transfersService: TransfersService) { }

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches(): void {
    this.isLoading = true;
    this.transfersService.getTransfers(this.currentPage, this.pageSize, 'requestFile', 'asc')
    .subscribe((transfers: TransferData) => {
      this.dataSource = new MatTableDataSource(transfers.content);
      this.totalRows = transfers.totalElements;
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  convertTimestampToUTCDate(timestamp: any) {
    if (!timestamp) {
      return undefined;
    }
    return this.dates.formatUTCDate(new Date(timestamp));
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getBatches();
  }

  status(item: Transfer): string {
    if (item.status === 'COMPLETED') {
      return 'green';
    } else if (item.status === 'ON_GOING') {
      return 'yellow';
    }
    return 'red';
  }

  searchTransactions(): void {
    
  }

}
