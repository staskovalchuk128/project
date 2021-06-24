import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from "@angular/common/http"
import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/map";

@Injectable()
export class AjaxRequests {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = '/application/ajax.php';
  }

  send(requestData: Object): Observable<any> {
    return this.sendRequest("POST", requestData)
  }


  private sendRequest(method, body?): Observable<any>{

    let params: HttpParams = new HttpParams();
    if(body){
      params = params.appendAll(body);
    }

    const httpOptions = {
      headers: new HttpHeaders()
    };


    switch(method){
      case "POST":
      return this.http.post(this.url, params, httpOptions);
      break;
      case "PUT":
      return this.http.put(this.url, body, httpOptions);
      break;
      case "DELETE":
      return this.http.delete(this.url, httpOptions);
      break;
      default:
      return this.http.get(this.url, httpOptions);
      break;
    }

  }

}
