import { InteractivityChecker } from '@angular/cdk/a11y';
import { Injectable, signal } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type AlertType= 'success' | 'error' | 'warning' | 'info';
export interface Alert
{
  id:string;
  type:string;
  message:string;
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert | null>();
  alert$=this.alertSubject.asObservable();

  private _alert=signal<Alert[]>([]);
  public readonly alerts=this._alert.asReadonly();

  private alertCounter=0;

  showAlert(message:string, type: AlertType="info", duration= 3000): string{
  const id=`alert-${++this.alertCounter}`;
  const alert:Alert={id,type, message};
  
  this._alert.update(alerts => {
  const updateAlert=[...alerts, alert];
  return updateAlert;
  });

  setTimeout(()=>
  {
  this.removeAlert(id);
  
  }, duration);
  
  return id;

}
  success(message: string, duration=3000):string {   
  return this.showAlert(message, 'success', duration);
  }
  error(message: string, duration=3000):string {
  return this.showAlert(message, 'error', duration); 
  }

  info(message: string, duration=3000):string {
  return this.showAlert(message, 'info', duration);  
  }

  warning(message: string, duration=3000):string {
  return this.showAlert(message, 'warning', duration);  
  }
  
  getAlert(): Observable<Alert | null> {
    return this.alertSubject.asObservable();
  }

  removeAlert(id:string):void
  {
   this._alert.update(alerts=> alerts.filter(alert=> alert.id !==id));
  }

  clearAll(): void {
   this._alert.set([]);
  }
}