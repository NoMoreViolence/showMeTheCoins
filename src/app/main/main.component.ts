import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  @ViewChild('main')
  main: ElementRef;
  constructor(private store: Store) {}

  ngAfterViewInit() {
    this.store.setResizeElement(this.main);
  }
}
