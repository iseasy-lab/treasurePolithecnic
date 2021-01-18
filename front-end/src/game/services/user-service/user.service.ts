import { Injectable } from '@angular/core';
import { GameUserInterface } from 'src/game/interfaces/database-interface/game-user-interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { dataBaseService } from './firebase-angular';

export class UserService {
  private firebase: AngularFireDatabase;
  private userId: string;
  private userData: GameUserInterface;

  constructor(_userId: string) {
    // const ref = this.dataBase.database.ref('players');
    // ref.once("value")
    //   .then(
    //     snapshot => {
    //       this.userData = snapshot.child('jugador12345').val();
    //   });
    // console.log(this.userData);
    // this.userId = 
    // this.firebase = dataBaseService.fireBaseDatabase;
    this.userId = 'jugador12345';
    this.userId = _userId;
    this.getUserDataBase();

  }

  public getUserId() {
    return this.userId;
  }

  public getUserData() {
    return this.userData;
  }

  private getUserDataBase() {
    const dataBaseRef = this.firebase.database.ref('players');
   
    // ref.once("value")
    //   .then(
    //     snapshot => {
    //       this.userData = JSON.parse(JSON.stringify(snapshot.child(this.userId)));
    //       // this.userService.setUserData(snapshot.child(usuarioId).val());
    //   });

    dataBaseRef.on(
      'value',
      snapshot => {
        // updateStarCount(postElement, snapshot.val());
        this.userData = JSON.parse(JSON.stringify(snapshot.child(this.userId)));
        // console.log(this.userData);
      }
    );

  }

}

                                // donde guardas el primer user id
/*
export class UserService {
  private userId: string;
  
  private userData: GameUserInterface;

  constructor(private dataBase: AngularFireDatabase) { }

  setUserId(userId: string) {
    this.userId = userId
    // this.dataBase.list('players');
    // console.log(this.dataBase.database.ref('players/' + this.userId));
    // console.log(this.userData);
    // this.userData = JSON.parse(JSON.stringify(this.dataBase.database.ref(('players/' + this.userId))));
    // console.log(this.userData);
  }

  getUserId() {
    return this.userId;
  }

  // getUser() {
  //   return this.http.get("https://randomuser.me/api/?results=20")
  // }


  // getUserData() {
  //   // var ref = this.dataBase.database.ref('players/' + this.userId);
  //   // ref.on(
  //   //   "value",
  //   //   snapshot => {
  //   //     // console.log(snapshot.val());
  //   //     this.userData = snapshot.val();
  //   //     console.log(this.userData);
  //   //   },
  //   //   errorObject => {
  //   //     console.log("The read failed: " + errorObject.code);
  //   //   }
  //   // );
  //   // return this.userData;
  //   const ref = this.dataBase.database.ref('players');
  //   ref.once("value")
  //     .then(function(snapshot) {
  //       this.userData = snapshot.child(this.userId).val();
        
  //     });
  //     return this.userData;
  // }


  setUserData(userData: GameUserInterface) {
    // console.log(userData);
    this.userData = userData;
      // console.log('setuser');
      // console.log(this.userData);
    // return new Promise(
    //   (resolve, reject) => {
    //     const ref = this.dataBase.database.ref('players');
    //     ref.once("value")
    //       .then(
    //         snapshot => {
    //         // this.userData = 
    //           console.log('resolve');
    //           console.log(snapshot.child(this.userId).val());
    //           resolve(snapshot.child(this.userId).val());
    //         }
    //       ).catch(
    //         error => {
              
    //           console.log('catch');
    //           console.log(error);
    //           reject(error);
    //         }
    //       );
    //   }
    // );
  }

  getUserData() {
    // console.log('getuser');
    // console.log(this.userData);
    return this.userData;
  }

}

*/
