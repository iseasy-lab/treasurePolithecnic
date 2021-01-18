import { registerFormSpecifications, loginFormSpecifications, titleBarSpecifications, resetPasswordFormSpecifications } from './game-access-scene-element-description';
import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { newUserData } from 'src/game/strings/new-user-data';
import { FirebaseApp, ScenesStrings, GameStatus, EventsTouchedGameObjectsStrings, GameAccessElements } from 'src/game/strings/game';
import { GameScoreTableInterface } from 'src/game/interfaces/database-interface/game-score-table-interface';
import { GameButtonComponent } from 'src/game/components/game-button/game-button-component';
import { GameFacade } from 'src/game/facade/game-facade';
import { addPointerOverOnInteractiveObject } from 'src/game/functions/interactive-object/interactive-object-functions';
import { generateHtmlDOM } from 'src/game/functions/html-dom/html-dom-functions';
import { RestorePasswordComponent } from 'src/game/components/restore-password-component/restore-password-component';
import { globalReturnButtonSpecifications } from 'src/game/strings/global-elements/game-elements-specifications';

export class GameAccesScene extends Phaser.Scene {
    
    private registerElement: any;
    private loginElement: any;
    private titleBar: GameButtonComponent;
    private returnButton: GameButtonComponent;
    
    init() {
        GameStatus.currentScene = this.scene.key;
    }

    constructor() {
        super({
            key: ScenesStrings.GAME_ACCESS_SCENE
        })
    }

    create() {
        const gameFacade = new GameFacade(this);
        
        this.titleBar = gameFacade.generateGameObject(titleBarSpecifications) as GameButtonComponent;
        gameFacade.addGameObject(this.titleBar);
        
        this.returnButton = gameFacade.generateGameObject(globalReturnButtonSpecifications) as GameButtonComponent;
        gameFacade.addGameObject(this.returnButton);

        const registerhtmlDOMSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(registerFormSpecifications));
        registerhtmlDOMSpecifications.scale = scaleGameObject(this, registerhtmlDOMSpecifications.scale);
        this.registerElement = generateHtmlDOM(this, registerhtmlDOMSpecifications, this.cameras.main.width * 0.45);
    
        const loginhtmlDOMSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(loginFormSpecifications));
        loginhtmlDOMSpecifications.scale = scaleGameObject(this, loginhtmlDOMSpecifications.scale);
        this.loginElement = generateHtmlDOM(this, loginhtmlDOMSpecifications, this.cameras.main.width * 0.45);
        
        GameAccessElements.scene = this;
        GameAccessElements.returnButton = this.returnButton;
        GameAccessElements.registerElement = this.registerElement;
        GameAccessElements.loginElement = this.loginElement;

        this.addFuncionality();
    }

    private addFuncionality(){
        this.addRegisterFuncionality();
        this.addLoginFuncionality();
    }

    private addRegisterFuncionality() {
        const registerFistName = this.registerElement.getChildByID('register-first-name');
        const registerLastName = this.registerElement.getChildByID('register-last-name');
        const registerEmail = this.registerElement.getChildByID('register-email');
        const registerPassword = this.registerElement.getChildByID('register-password');
        const registerRepeatedPassword = this.registerElement.getChildByID('register-password-confirmed');
        const registerMemberOf = this.registerElement.getChildByID('register-memberOf');
        const registerRelationshipEpn = this.registerElement.getChildByID('register-relationshipEpn');
        const formNote = this.registerElement.getChildByID('register-form-note');
        
        const registerNote = this.registerElement.getChildByID('register-note');
        
        registerRepeatedPassword.onkeyup = function() {
            if (registerRepeatedPassword.value === registerPassword.value) {
                registerRepeatedPassword.setCustomValidity('');
            } else {
                registerRepeatedPassword.setCustomValidity('El password debe ser el mismo al anterior');
            }
        }

        const registerForm = this.registerElement.getChildByID('register-form');
        registerForm.onsubmit = e => {
            e.preventDefault();
            GameStatus.accessType = 'register';
            FirebaseApp
                .firebaseApp
                .auth()
                .createUserWithEmailAndPassword(registerEmail.value, registerRepeatedPassword.value)
                .then(
                    userData => {

                        newUserData.player_id = userData.user.uid;

                        newUserData.player_name = registerFistName.value;
                        newUserData.player_lastName = registerLastName.value;
                        newUserData.player_emailAddress = registerEmail.value;
                        newUserData.player_memberOf = registerMemberOf.value;
                        newUserData.player_relationshipEpn = registerRelationshipEpn.value;
                        
                        FirebaseApp.firebaseApp.database().ref('players/'+userData.user.uid).set(newUserData);
                        GameStatus.accessType = 'register';
                        
                        const playerScore: GameScoreTableInterface = {
                            player_id: userData.user.uid,
                            player_name: registerFistName.value + ' ' + registerLastName.value,
                            player_memberOf: registerMemberOf.value,
                            player_relationshipEpn: registerRelationshipEpn.value,
                            player_totalScore: 0,
                        };
                        FirebaseApp.firebaseApp.database().ref('score_table/'+userData.user.uid).set(playerScore);
                    }
                ).catch(
                    e => {
                        let errorMessage = 'Se produjo un error en el registro, intenta nuevamente.';
                        if (e.code == 'auth/email-already-in-use') {
                            errorMessage = 'El correo ingresado pertenece a una cuenta ya registrada, cámbialo o inicia sesión con esa cuenta.';
                        }
                        formNote.innerHTML = errorMessage;
                        registerNote.style.visibility = 'visible';
                    }
                );
        }

    }

    private addLoginFuncionality() {
        addPointerOverOnInteractiveObject(this.returnButton);
        this.returnButton.setInteractive().on(
            EventsTouchedGameObjectsStrings.POINTERDOWN, () => {
                GameAccessElements.returnButton = null;
                GameAccessElements.registerElement = null;
                GameAccessElements.loginElement = null;
                this.scene.stop(this.scene.key);
                this.scene.start(ScenesStrings.START_SCENE);
            }
        );

        const loginEmail = this.loginElement.getChildByID('login-email');
        const loginPassword = this.loginElement.getChildByID('login-password');
        const loginForm = this.loginElement.getChildByID('login-form');
        const restorePasswordButton = this.loginElement.getChildByID('restore-password');
        const loginNote = this.loginElement.getChildByID('login-note');
        const loginformNote = this.loginElement.getChildByID('login-form-note');
        
        restorePasswordButton.onclick = () => {
            const restorePasswordComponent = new RestorePasswordComponent(this, resetPasswordFormSpecifications);
            this.add.existing(restorePasswordComponent);
            this.returnButton.setVisible(false);
            this.registerElement.setVisible(false);
            this.loginElement.setVisible(false);
            
            restorePasswordComponent.activateComponent(this.registerElement, this.loginElement, this.returnButton);
        }

        loginForm.onsubmit = e => {
            e.preventDefault();
            FirebaseApp
                .firebaseApp
                .auth()
                .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
                .catch(
                    e => {
                        let errorMessage = 'Se produjo un error al inicar sesión, intenta nuevamente.';
                        if (e.code == 'auth/wrong-password') {
                            errorMessage = 'Correo o contraseña son incorrectos, corrígelos e intenta nuevamente.';
                        }
                        if (e.code == 'auth/too-many-requests') {
                            errorMessage = 'Has intendado iniciar sesión sin exito muchas veces.\nTu cuenta se bloqueará temporalmente, intentalo más tarde.';
                        }
                        if (e.code == 'auth/user-not-found') {
                            errorMessage = 'El correo electrónico que has introducido no coincide con ninguna cuenta, cámbialo o registrate para crear una cuenta.';
                        }
                        
                        loginformNote.innerHTML = errorMessage;
                        loginNote.style.visibility = 'visible';
                    }
                )
        }
    }

    
}