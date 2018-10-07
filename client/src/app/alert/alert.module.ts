import { NgModule } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [AlertComponent],
    declarations: [AlertComponent],
    providers: [AlertService],
})
export class AlertModule { }
