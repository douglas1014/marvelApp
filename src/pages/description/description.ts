import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroService } from '../../providers/hero-service/hero-service';
import { Hero } from '../../models/hero';

/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  public id;
  public obj: any;
  public hero = new Hero();
  // public hero: { name: string, thumb: string, description: string };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public heroService: HeroService) {

    
    this.id = navParams.get("id");
    console.log('id: ', this.id)

    this.hero = new Hero();
    this.heroService.getDescription(this.id)
      .then(data => {
        this.obj = data;
        console.log('obj::: ', this.obj);
        this.hero.name = this.obj.data.results[0].name;
        this.hero.thumb = this.obj.data.results[0].thumbnail.path +"."+ this.obj.data.results[0].thumbnail.extension;
        this.hero.description = this.obj.data.results[0].description;

        console.log(this.hero);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
  }

}
