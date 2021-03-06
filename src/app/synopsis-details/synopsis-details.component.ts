import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-details',
  templateUrl: './synopsis-details.component.html',
  styleUrls: ['./synopsis-details.component.scss']
})
export class SynopsisDetailsComponent implements OnInit {

  /**
   * injects data from movie-card to synopsis-details
   * @param {any} data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
