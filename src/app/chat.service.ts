import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

// Mock remote service

@Injectable()
export class ChatService {
  private url = "http://3.137.181.227/api/query";
  constructor(private http: HttpClient) { }

  public readonly responses: Subject<string> = new Subject<string>();

  public submit(question: string): void {
    const length = question.length;
    const answer = `"${question}" contains exactly ${length} symbols.`;

    setTimeout(
      () => this.responses.next(answer),
      1000
    );
  }
  sendMessage(msg:string) {
    let payload = {
      query :  msg
    }
    this.http.post(this.url,payload).subscribe((resp:any)=>{
      setTimeout(
        () => this.responses.next(resp.answer),
        1000
      );
    });
  }
}
