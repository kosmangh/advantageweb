import { HttpClient } from "@angular/common/http";
import { Observable, timeout } from "rxjs";
import { environment } from "src/environments/environment";

function createOptions(options: any) {
  if (!options) return '';
  let string = '?';
  Object.keys(options).forEach((key, id, s) => {
    if (s.length == id) string += `${key}=${options[ key ]}`;
    else string += `${key}=${options[ key ]}&`;
  });
  return string;
}

export abstract class GenericService<T> {



  
  private baseUrl = environment.mock_url;
  constructor(private httpClient: HttpClient, protected url: string) { }

  public post(resource: Partial<T>): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${this.url}`, resource).pipe(
      timeout(environment.timeout),
    );
  }

  public get(options?: any): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${this.baseUrl}${this.url}${createOptions(options)}`
    );
  }

  public getAll(options?: any): Observable<T> {
    return this.httpClient.get<T>(
      `${this.baseUrl}${this.url}${createOptions(options)}`
    );
  }
  public getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${this.url}/${id}`);
  }

  public update(resource: Partial<T>, id: number): Observable<T> {
    return this.httpClient.put<T>(
      `${this.baseUrl}${this.url}/${id}`,
      resource
    );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}${this.url}/${id}`);
  }
}