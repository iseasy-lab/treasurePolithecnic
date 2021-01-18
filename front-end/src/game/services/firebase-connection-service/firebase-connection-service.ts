import { AngularFireDatabase } from '@angular/fire/database/database';

export class FirebaseConectionService {

    private dataBaseService: AngularFireDatabase; //: firebase.database.Database;

    constructor(private _dataBaseService: AngularFireDatabase) {
        this.dataBaseService = _dataBaseService;
    }

    public getDataBaseConection(userId: string): firebase.database.Reference {
        const referencia = this.dataBaseService.database.ref('players/'+userId);
        return referencia;
    }
}