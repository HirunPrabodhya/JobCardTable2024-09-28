import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IPiece, ItemSummery } from '../model/pieces';
import { BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {
  private http:HttpClient = inject(HttpClient);
  private baseUrl: string = inject(BASE_URL);
  getPiecesData(): Observable<ItemSummery[]>{
    return this.http.get<IPiece[]>(this.baseUrl)
                    .pipe(
                      tap((data)=>console.log(data)),
                      map(data=>data[0].itemSummeries)
                    );
  }

}
