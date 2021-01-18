import { Component, OnInit } from '@angular/core';
import { gameConfig } from '../../game/configurations/game-config';
import { ResizeGame } from 'src/game/configurations/resize-game';
import { AngularFireDatabase } from '@angular/fire/database';
import { dataBaseService } from 'src/game/services/user-service/firebase-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  private game: Phaser.Game;

  ngOnInit(): void { }

  constructor() {
    this.startGame();
  }

  private startGame() {
    setTimeout(
      () => {
        this.game = new Phaser.Game(gameConfig);
        this.resizeGame();
      }, 1
    );
  }

  private resizeGame() {
    document.oncontextmenu = function(){return true} // "false" deshabilita el clic derecho del mouse
    setTimeout(
      () => {
        ResizeGame(this)();
        window.addEventListener('resize', ResizeGame(this), false);
      }, 1
    );
  }

}
