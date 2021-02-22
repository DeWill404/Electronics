import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './app.service';
import { VideoComponent } from './video/video.component';
import { DesignComponent } from './design/design.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { ProjectComponent } from './project/project.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AtricleComponent } from './atricle/atricle.component';
import { ScrollingService } from './video/video.service';

@NgModule({
	declarations: [
		AppComponent,
		VideoComponent,
		DesignComponent,
		DatasheetComponent,
		ProjectComponent,
		FeedbackComponent,
		AtricleComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		LoginService,
		ScrollingService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
