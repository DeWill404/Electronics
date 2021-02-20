import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtricleComponent } from './atricle/atricle.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { DesignComponent } from './design/design.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProjectComponent } from './project/project.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
	{path: '', component:AtricleComponent},
	{path: 'video', component:VideoComponent},
	{path: 'design', component:DesignComponent},
	{path: 'datasheet', component:DatasheetComponent},
	{path: 'project', component:ProjectComponent},
	{path: 'feedback', component:FeedbackComponent},
	{path: '**', redirectTo:''}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
