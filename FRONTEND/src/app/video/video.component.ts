import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { ScrollingService } from './video.service';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	title = "Electronics | Video";
	scrollService:ScrollingService;
	VIDEOS:any[] = [];
	INDEX = -1;
	videoContainer:any;
	videoPlayer:any;
	videoList:any;


	constructor(scrollService:ScrollingService, private loginService:LoginService) { 
		this.scrollService = scrollService;
	}

	ngOnInit(): void {
		// Get palyers TAGS
		this.videoContainer = <HTMLDivElement>document.getElementById("video-overlay");
		this.videoPlayer =  <HTMLVideoElement>document.getElementById("videoPlayer");
		this.videoList =  document.getElementsByClassName("videos");

		// Get all videos from DB
		this.scrollService.getVideos().subscribe((data:any) => {
			this.VIDEOS = data;
		});
	}


	/* Metho to upload new videos */
	uploadVideo() {
		if ( this.loginService.isLogged() ) {
			// Show inputs
			(<HTMLButtonElement>document.getElementById('uploadBtn')).classList.add('visually-hidden');
			(<HTMLButtonElement>document.getElementById('inputField')).classList.remove('visually-hidden');
			(<HTMLButtonElement>document.getElementById('btn-container')).classList.remove('visually-hidden');
			(<HTMLButtonElement>document.getElementById('inputField')).value = '';
			} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to upload new video.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Method to save verified video */
	saveVideo() {
		// Get toast variable
		const toast = <HTMLDivElement>document.getElementById("toast");

		// Verify if input is entered
		if ((<HTMLButtonElement>document.getElementById('inputField')).value != '') {
			this.scrollService.uploadVideos( { 'url':(<HTMLButtonElement>document.getElementById('inputField')).value } ).subscribe((data:any) => {
				if (data != null) {
					// Successfull
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Link added successfully";
					toast.classList.remove('hide');
					toast.classList.add('show');

					// Reset visibility
					(<HTMLButtonElement>document.getElementById('uploadBtn')).classList.remove('visually-hidden');
					(<HTMLButtonElement>document.getElementById('inputField')).classList.add('visually-hidden');
					(<HTMLButtonElement>document.getElementById('btn-container')).classList.add('visually-hidden');
				} else {
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured";
					toast.classList.remove('hide');
					toast.classList.add('show');
				}
			});

		} else {
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please enter the video link";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Function to Cancel Input field */
	cancelInput() {
		(<HTMLButtonElement>document.getElementById('uploadBtn')).classList.remove('visually-hidden');
		(<HTMLButtonElement>document.getElementById('inputField')).classList.add('visually-hidden');
		(<HTMLButtonElement>document.getElementById('btn-container')).classList.add('visually-hidden');
	}


	/* Function to play Video in Lightbox */
	playVideo(index:number) {
		console.log('s');
		this.INDEX = index;
		this.videoPlayer.src = (<HTMLVideoElement>this.videoList[this.INDEX]).src;
		this.videoContainer.classList.remove("visually-hidden");
		this.scrollService.disable();
	}


	/* Function to play previous video */
	preVideo() {
		this.INDEX = this.INDEX==0 ? this.videoList.length-1 : this.INDEX-1;
		this.videoPlayer.src = (<HTMLVideoElement>this.videoList[this.INDEX]).src;
	}


	/* Function to play next video */
	nextVideo() {
		this.INDEX = this.INDEX==this.videoList.length-1 ? 0 : this.INDEX+1;
		this.videoPlayer.src = (<HTMLVideoElement>this.videoList[this.INDEX]).src;
	}


	/* Function to cancel lightbox overlay */
	cancelOverlay() {
		this.videoPlayer.pause();
		this.videoContainer.classList.add("visually-hidden");
		this.scrollService.enable();
	}

}
