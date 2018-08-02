import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';
    private products: IProduct[];


    constructor(private http: HttpClient) { }

    // getProducts(): Observable<IProduct[]> {
      getProducts(): Observable<IProduct[]> {
      if (this.products) {
          return of(this.products);
      }
      return this.http.get<IProduct[]>(this.productsUrl)
                      .pipe(
                        tap(data => console.log(JSON.stringify(data))),
                        tap(data => this.products = data),
                        this.handleError<IProduct[]>()
                      );

                      // this.catchHttpError<IProduct[]>()
                    //  this.handleError<IProduct[]>()
                      // catchError(err => throwError(new Error('lol')))
      // .pipe(
      //     tap(data => console.log(JSON.stringify(data))),
      //     tap(data => this.products = data),
      //     catchError(this.handleError)
      // );

      // return this.http.get(this.productsUrl)
      //                 .pipe(
      //                     tap(data => console.log(JSON.stringify(data))),
      //                     tap(data => this.products = data),
      //                     catchError(this.handleError)
      //                 );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
    return of(this.initializeProduct());
    // return Observable.create((observer: any) => {
    //     observer.next(this.initializeProduct());
    //     observer.complete();
    // });
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        map(this.extractData),
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(err => throwError(new Error('lol')))
      );
}

deleteProduct(id: number): Observable<IProduct> {
  console.log('deleteProduct :', id );
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  const url = `${this.productsUrl}/${id}`;
  return this.http.delete<IProduct>(url, {headers: headers})
      .pipe(
        tap(data => console.log('deleteProduct: ' + data)), // JSON.stringify(data))),
        catchError(err => throwError(new Error('lol')))
      );
}

saveProduct(product: IProduct): Observable<IProduct> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  if (product.id === 0) {
      return this.createProduct(product, headers);
  }
  return this.updateProduct(product, headers);
}

private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
  console.log('createProduct *');
  product.id = undefined;
  return this.http.post<IProduct>(this.productsUrl, product,  { headers: headers})
    .pipe(
      map(this.extractData),
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(err => throwError(new Error('lol')))
    );
}

private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
  const url = `${this.productsUrl}/${product.id}`;
  return this.http.put(url, product,  { headers: headers})
    .pipe(
      map(() => product),
      tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
      catchError(err => throwError(new Error('lol')))
    );
}


private extractData(response: Response) {
  // console.log('extractData');
  // console.log('response: ', response);
  // console.log('response.json(): ', response.json());
  // const body = response.json();
 //  console.log(body);
 // return body || {};
 return response || {};
}

initializeProduct(): IProduct {
  // Return an initialized object
  return {
      id: 0,
      productName: null,
      productCode: null,
      releaseDate: null,
      description: null,
      price: null,
      starRating: null,
      imageUrl: null,
      category: null,
      tags: ['']
  };
}

  private catchHttpError = <T>() =>
  catchError<T, T>((error: HttpErrorResponse) => {
    const msg = `${error.status} ${error.statusText} -  ${error.url}`;

    return throwError(new Error(msg));
  })

  private handleError = <T>() =>
  catchError<T, T>((error: HttpErrorResponse) => {

     // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
  } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
  }
    const msg = `${error.status} ${error.statusText} -  ${error.url}`;
    console.log(msg);
    return throwError(new Error(msg));
  })

//  // private handleError(err: HttpErrorResponse): any {
//     private handleError(err: HttpErrorResponse): any {
//     // in a real world app, we may send the server to some remote logging infrastructure
//     // instead of just logging it to the console
//     let errorMessage: string;
//     if (err.error instanceof Error) {
//         // A client-side or network error occurred. Handle it accordingly.
//         errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//         // The backend returned an unsuccessful response code.
//         // The response body may contain clues as to what went wrong,
//         errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
//     }
//     console.error(err);
//     return throwError(new Error(errorMessage));
//     // return new ErrorObservable(errorMessage);
// }
}
