import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { gameConfig } from 'src/game/configurations/game-config';
import { ResizeGame } from 'src/game/configurations/resize-game';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready();
  }
}
