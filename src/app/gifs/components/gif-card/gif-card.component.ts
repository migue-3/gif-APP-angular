import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit {

  @Input()
  public gif!: Gif; //Usamos el operador not null '!' para decirle que siempre va a recibir el gif
  
  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required');
  }
}
