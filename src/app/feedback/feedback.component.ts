import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackForm = new FormGroup({
    email: new FormControl(''),
    screenshot: new FormControl('')
  });

  private screenshotSource;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) { }

  onFileChange(event){
    if(event.target.files.length > 0){
      this.screenshotSource = (window.URL || window.webkitURL).createObjectURL(event.target.files[0]);
      // const reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      
      // reader.onload = () => {
      //   this.screenshotSource = reader.result;
      // };

      // this.cd.markForCheck();
    }
  }

  onSubmit() {
    const body = new HttpParams()
      .set('form-name', 'feedbackForm')
      .append('email', this.feedbackForm.value.email)
      .append('screenshot', this.screenshotSource);

    this.http.post('/', body.toString(), { headers: { 'Content-Type': 'multipart/form-data' } }).subscribe(
      res => { },
      err => {
        if (err instanceof ErrorEvent) {
          //client side error
          alert("Something went wrong when sending your message.");
          console.log(err.error.message);
        } else {
          //backend error. If status is 200, then the message successfully sent
          if (err.status === 200) {
            alert("Your message has been sent!");
          } else {
            alert("Something went wrong when sending your message.");
            console.log('Error status:');
            console.log(err.status);
            console.log('Error body:');
            console.log(err.error);
          }
        }
      }
    );
  
  }
}
