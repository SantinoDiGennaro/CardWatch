import {Component, inject} from '@angular/core';
import {CardsService} from '../providers/services/cards.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import {Platform} from '@ionic/angular';
import {BackgroundMode} from '@anuradev/capacitor-background-mode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected title = 'CardWatch';

  readonly #cardsService = inject(CardsService);
  readonly #platform = inject(Platform);

  constructor() {
    this.#platform.ready().then(() => {
      this.init();
    });
  }

  async init() {
    await BackgroundMode.enable({
      title: 'CardWatch attivo in background',
      text: 'Aggiornamenti ogni ora',
      silent: false,
      resume: true
    });

    await LocalNotifications.requestPermissions();

    this.startPolling();
  }

  startPolling() {
    setInterval(async () => {
      try {
        const data = await this.#cardsService.test().toPromise();
        await LocalNotifications.schedule({
          notifications: [
            {
              id: Date.now(),
              title: 'Aggiornamento API',
              body: 'Dati: ' + data,
            },
          ],
        });
      } catch (e) {
        console.error('Errore API:', e);
      }
    }, 1 * 60 * 1000); // modificabile
  }

  // constructor() {
  //   this.#platform.ready().then(() => {
  //     this.initNotifications();
  //     this.testNotification(); // Test immediato
  //   })
  // }
  //
  // private async initNotifications(): Promise<void> {
  //   // Richiedi permessi
  //   const permission = await LocalNotifications.requestPermissions();
  //
  //   if (permission.display === 'granted') {
  //     console.log('Permessi notifiche concessi');
  //     this.notification();
  //   } else {
  //     console.log('Permessi notifiche negati');
  //   }
  // }
  //
  // private notification(): void {
  //   setInterval(() => {
  //     this.#cardsService.test().subscribe(async (response) => {
  //       try {
  //         await LocalNotifications.schedule({
  //           notifications: [
  //             {
  //               title: 'Nuova notifica',
  //               body: 'Ecco i dati dalla tua API! ' + response,
  //               id: Date.now(),
  //               schedule: { at: new Date(Date.now() + 1000), allowWhileIdle: true }, // Tra 1 secondo
  //             },
  //           ],
  //         });
  //         console.log('Notifica programmata');
  //       } catch (error) {
  //         console.error('Errore notifica:', error);
  //       }
  //     });
  //   }, 300000); // 5 minuti
  // }
  //
  // private async testNotification(): Promise<void> {
  //   try {
  //     await LocalNotifications.schedule({
  //       notifications: [
  //         {
  //           title: 'Test notifica',
  //           body: 'Questa è una notifica di test',
  //           id: 1,
  //           schedule: { at: new Date(Date.now() + 2000), allowWhileIdle: true }, // Tra 2 secondi
  //         },
  //       ],
  //     });
  //     LocalNotifications.addListener('localNotificationReceived', (notification) => {
  //       console.log('Notifica ricevuta:', notification);
  //     });
  //     console.log('Notifica di test programmata');
  //   } catch (error) {
  //     console.error('Errore test notifica:', error);
  //   }
  // }
}
