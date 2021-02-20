import { Component, OnInit } from '@angular/core';
import { ScrollingService } from './video.service';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	title = "Electronics | Video";
	scrollService:ScrollingService;
	INDEX = -1;
	videoContainer:any;
	videoPlayer:any;
	videoList:any;


	constructor(scrollService:ScrollingService) { 
		this.scrollService = scrollService;
	}

	ngOnInit(): void {
		this.videoContainer = <HTMLDivElement>document.getElementById("video-overlay");
		this.videoPlayer =  <HTMLVideoElement>document.getElementById("videoPlayer");
		this.videoList =  document.getElementsByClassName("videos");
	}

	/* Function to play Video in Lightbox */
	playVideo(index:number) {
		this.INDEX = index-1;
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
