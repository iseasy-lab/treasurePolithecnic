import { GameElementSpecificationsInterface } from 'src/game/interfaces/game-element-specifications-interface';
import { scaleGameObject } from 'src/game/functions/scale/scale-functions';
import { generateGameObjectImage } from 'src/game/functions/image/image-functions';
import { generateHtmlDOM } from 'src/game/functions/html-dom/html-dom-functions';
import { restorePasswordBackgroundSpecifications } from './restore-password-elements-specifications';
import { FirebaseApp } from 'src/game/strings/game';
import { ColorsValue } from 'src/game/strings/font-styles';

export class RestorePasswordComponent extends Phaser.GameObjects.Container {

    protected scene: Phaser.Scene;
    protected restorePasswordSpecifications: GameElementSpecificationsInterface;
    protected restorePasswordBackground: Phaser.GameObjects.Image;
    protected restorePasswordForm: any;

    constructor(_scene: Phaser.Scene, _restorePasswordSpecifications: GameElementSpecificationsInterface) {
        super(_scene, _restorePasswordSpecifications.scale.objectPositionX, _restorePasswordSpecifications.scale.objectPositionY);

        this.scene = _scene;
        this.restorePasswordSpecifications = _restorePasswordSpecifications;
        this.generateComponent();
    }

    private generateComponent() {
        const componenteBackgrundSpecifications: GameElementSpecificationsInterface = JSON.parse(JSON.stringify(restorePasswordBackgroundSpecifications));
        componenteBackgrundSpecifications.scale = scaleGameObject(this.scene, componenteBackgrundSpecifications.scale);
        this.restorePasswordBackground = generateGameObjectImage(this.scene, componenteBackgrundSpecifications);
        this.restorePasswordBackground.setTint(ColorsValue.BLACK_HEXADECIMAL_VALUE)
        this.restorePasswordBackground.setPosition(0, 0);

        this.add(this.restorePasswordBackground);
        this.setPosition(componenteBackgrundSpecifications.scale.objectPositionX, componenteBackgrundSpecifications.scale.objectPositionY)
        this.setSize(componenteBackgrundSpecifications.scale.objectWidth, componenteBackgrundSpecifications.scale.objectHeight)

        this.restorePasswordForm = generateHtmlDOM(this.scene, this.restorePasswordSpecifications, this.scene.cameras.main.width * 0.55);
        this.restorePasswordForm.setPosition(0, 0);
        this.add(this.restorePasswordForm);
        this.setVisible(false);
    }

    public activateComponent(registerElement: any, loginElement: any, returnButton: any) {
        this.setDepth(1);
        this.setVisible(true);
        
        const restoreForm = this.restorePasswordForm.getChildByID('restore-password-form');
        const restoreEmail = this.restorePasswordForm.getChildByID('restore-email');
        
        const cancelButton = this.restorePasswordForm.getChildByID('cancel-restore-button');
        const sendButton = this.restorePasswordForm.getChildByID('send-button');
        const inputContainer = this.restorePasswordForm.getChildByID('input-contenedor');
    
        const labelMessage = this.restorePasswordForm.getChildByID('label-message');

        const passwordRestoreNote = this.restorePasswordForm.getChildByID('password-restore-note');
        const passwordRestoreformNote = this.restorePasswordForm.getChildByID('password-restore-form-note');

        let updateCancel = false;

        cancelButton.onclick = () => {
            updateCancel = true;
            if (returnButton !== null) {
                returnButton.setVisible(true);
            }

            if (registerElement !== null ) {
                registerElement.setVisible(true);
            }

            if (loginElement !== null ) {
                loginElement.setVisible(true);
            }

            setTimeout(() => {
                this.destroy();
            }, 1);
        }

        restoreForm.onsubmit = e => {
            e.preventDefault();
            if (!updateCancel) {
                FirebaseApp
                    .firebaseApp
                    .auth()
                    .sendPasswordResetEmail(restoreEmail.value)
                    .then(
                        () => {
                            passwordRestoreNote.style.visibility = 'hidden';
                            passwordRestoreNote.style.margin = '0px';
                            passwordRestoreformNote.style.padding = '0px';
                            passwordRestoreformNote.style.fontSize = '0px';

                            sendButton.style.display = "none";
                            inputContainer.style.display = "none";
                            labelMessage.innerText = 'El enlace de actualización de contraseña fue enviado a: \n'+ restoreEmail.value +'.\n\nSi no has recibido el enlace de recuperación\nrevisa la carpeta de SPAM o vuele a reenviarlo.';
                            
                            cancelButton.className = 'send-button';
                            cancelButton.innerText = 'Continuar';
                        }
                    )
                    .catch(
                        e => {
                            let errorMessage = 'Se produjo un error intenta de nuevo';
                            if (e.code == 'auth/user-not-found') {
                                errorMessage = 'El correo electrónico que has introducido no coincide con ninguna cuenta, corrígelo e intenta nuevamente';
                            }

                            passwordRestoreformNote.innerHTML = errorMessage;
                            passwordRestoreNote.style.visibility = 'visible';
                        }
                    );

            }
        }
    }
}