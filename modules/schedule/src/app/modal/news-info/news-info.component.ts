import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Message} from '../../../../../../container/src/app/core/models/message';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css'],
})
export class NewsInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewsInfoComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, ) { }

  ngOnInit() {
  }

  public rerouteToSubject() {
    const message: Message = new Message();
    message.Value = '/Subject?subjectId=' + this.data.itemNews.SubjectId;
    message.Type = 'Route';
    this.sendMessage(message);
  }

  public sendMessage(message: Message): void {
    window.parent.postMessage([{channel: message.Type, value: message.Value}], '*');
  }

}
