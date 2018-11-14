import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

/*
  Generated class for the HeroServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class HeroService {
  data: any;
  public_key = '84b2a8c8f545b7ea967f2b3c13a36876';
  private_key = '9c69ee8d6d109893f8521518daeb7702554623e0';

  constructor(public http: HttpClient) {
    console.log('Hello HeroServiceProvider Provider');
  }

  load() {
    if(this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      var timestamp = Number(new Date());
      var hash = Md5.hashStr(timestamp + this.private_key + this.public_key);

      this.http.get(`http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${this.public_key}&hash=${hash}`)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  getDescription(id: number) {
    return new Promise(resolve => {
      var timestamp = Number(new Date());
      var hash = Md5.hashStr(timestamp + this.private_key + this.public_key);

      this.http.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&limit=20&apikey=${this.public_key}&hash=${hash}`)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
