import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apikey: string = 'XwmFhfNIrBs3m5rhpvJNnWZqqpEa1tDt';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        console.log('Gifs service ready')
     }

    get tagsHistory() {
        return [...this._tagsHistory]; //usamos el operador spreed para crear una copia del valor de los _tagsHistory
    }

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();
        if (this._tagsHistory.includes(tag) ) {
            this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
        }
        this._tagsHistory.unshift( tag );
        this._tagsHistory = this.tagsHistory.splice(0,15);
        this.saveLocalStorage();
    }

    private saveLocalStorage():void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage():void{
        if (!localStorage.getItem('history')) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')! ); //USAMOS EL OPERADOR NOT NULL '!' PARA DECIR QUE SIEMPRE VIENE DATA
        
        if (this._tagsHistory.length === 0) return; //condicion para siempre mostrar un gif en pantalla
        this.searchTag( this._tagsHistory[0] ); 
    }

    searchTag(tag: string):void{
        if(tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apikey)
            .set('limit', 25)
            .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
            .subscribe( resp => {

                this.gifList = resp.data;
                console.log({gifs: this.gifList});
            });

    }
    
}