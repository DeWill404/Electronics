import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { AtricleService } from './atricle.service';

@Component({
	selector: 'app-atricle',
	templateUrl: './atricle.component.html',
	styleUrls: ['./atricle.component.css']
})
export class AtricleComponent implements OnInit {

	ARTICLES:any[] = [];
	CHATS:any[] = [];
	articleIndex = -1;
	replyIndex = -1;
	email:string;
	title = "Electronics | Article";

	constructor(private loginService:LoginService, private articleService:AtricleService) {
		this.email = loginService.getEmail();
		// Get all Article data from DB
		this.articleService.getArticles().subscribe((data:any) => {
			this.ARTICLES = data;
		});
	}

	ngOnInit(): void {
		// set date as currentdate
		const d = new Date(2010, 7, 5);
		const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
		const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		(<HTMLInputElement>document.getElementById('inputDate')).value = `${da}-${mo}-${ye}`;
	}


	/* Convert ngFor string to backgroung image style */
	parseImage(url:string) { return `width:200px; background:url(${url}) no-repeat center center/cover`; }


	/* Method to show Preview */
	startPreview() {
		// Input Tags
		let title = <HTMLTextAreaElement>document.getElementById('inputTitle');
		let subTitle = <HTMLTextAreaElement>document.getElementById('inputSubtitle');
		let imageLink = <HTMLInputElement>document.getElementById('inputImage');
		let date = <HTMLTextAreaElement>document.getElementById('inputDate');
		let body = <HTMLTextAreaElement>document.getElementById('article-editor');

		if (title.value=='' || subTitle.value=='' || imageLink.value=='' || body.value=='') {
			// Incomplete article
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Add all the inputs first.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			// Generate code
			let code = `<div class="p-4 p-md-5 mb-4 text-white rounded position-relative"  style="background:linear-gradient(90deg, rgba(33, 37, 41, 1), rgba(33, 37, 41, 0)), url(${imageLink.value}) no-repeat center center/cover;">
							<div class="col-md-6 px-0">
								<h1 class="display-4 fst-italic">${title.value}</h1>
								<p class="lead my-3">${subTitle.value}</p>
								<p class="lead my-3">${date.value}</p>
							</div>
						</div>
						${body.value}`;
	
			// Show code in preview
			(<HTMLDivElement>document.getElementById('article-preview')).innerHTML = code;
			(<HTMLDivElement>document.getElementById('article-preview-overlay')).classList.remove('visually-hidden');
		}
	}


	/* Method switch back to article card */
	cancelNew() {
		// switch visibility
		(<HTMLDivElement>document.getElementById('article-card-container')).classList.remove('visually-hidden');
		(<HTMLDivElement>document.getElementById('article-new-container')).classList.add('visually-hidden');
	}


	/* Method save new article */
	saveNew() {
		// Get toast
		const toast = <HTMLDivElement>document.getElementById("toast");

		// Input Tags
		let title = <HTMLTextAreaElement>document.getElementById('inputTitle');
		let subTitle = <HTMLTextAreaElement>document.getElementById('inputSubtitle');
		let imageLink = <HTMLInputElement>document.getElementById('inputImage');
		let date = <HTMLTextAreaElement>document.getElementById('inputDate');
		let body = <HTMLTextAreaElement>document.getElementById('article-editor');

		// Verify inputs
		if (title.value=='' || subTitle.value=='' || imageLink.value=='' || body.value=='') {
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Add all the inputs first.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			this.articleService.addArticles({ 'title':title.value, 'subtitle':subTitle.value, 'image':imageLink.value, 'date':date.value, 'body':body.value, 'chat':[] }).subscribe((data:any) => {
				if (data != null)	{
					this.ARTICLES.push( { 'title':title.value, 'subtitle':subTitle.value, 'image':imageLink.value, 'date':date.value, 'body':body.value, 'chat':[] } );
					
					// Successfull
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Article posted successfully";
					toast.classList.remove('hide');
					toast.classList.add('show');

					// switch visibility
					(<HTMLDivElement>document.getElementById('article-card-container')).classList.remove('visually-hidden');
					(<HTMLDivElement>document.getElementById('article-new-container')).classList.add('visually-hidden');
				} else {
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured";
					toast.classList.remove('hide');
					toast.classList.add('show');
				}
			});
		}
		
	}


	/* Method to add article */
	addArticle() {
		if ( this.loginService.isLogged() ) {
			// switch visibility
			(<HTMLDivElement>document.getElementById('article-card-container')).classList.add('visually-hidden');
			(<HTMLDivElement>document.getElementById('article-new-container')).classList.remove('visually-hidden');

			// Reset inputs
			(<HTMLTextAreaElement>document.getElementById('inputTitle')).value = '';
			(<HTMLTextAreaElement>document.getElementById('inputSubtitle')).value = '';
			(<HTMLInputElement>document.getElementById('inputImage')).value = '';
			(<HTMLTextAreaElement>document.getElementById('article-editor')).value = '';
		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to create new article.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	// Function to show respective article
	showArticle(index:number) {
		// Set data in tags
		(<HTMLDivElement>document.getElementById('article-header-placeholder')).style.background = `linear-gradient(90deg, rgba(33, 37, 41, 1), rgba(33, 37, 41, 0)), url(${this.ARTICLES[index]['image']}) no-repeat center center/cover`;
		(<HTMLDivElement>document.getElementById('article-title-placeholder')).innerHTML = this.ARTICLES[index]['title'];
		(<HTMLDivElement>document.getElementById('article-subtitle-placeholder')).innerHTML = this.ARTICLES[index]['subtitle'];
		(<HTMLDivElement>document.getElementById('article-date-placeholder')).innerHTML = this.ARTICLES[index]['date'];
		(<HTMLDivElement>document.getElementById('article-body-placeholder')).innerHTML = this.ARTICLES[index]['body'];
		
		// Set chat details from DATA
		this.articleIndex = index;
		this.CHATS = this.ARTICLES[index]['chat'];

		// switch visibility
		(<HTMLDivElement>document.getElementById('article-card-container')).classList.add('visually-hidden');
		(<HTMLDivElement>document.getElementById('article-body-container')).classList.remove('visually-hidden');
	}


	/* Switch back to all articles */
	openCards() {
		// switch visibility
		(<HTMLDivElement>document.getElementById('article-card-container')).classList.remove('visually-hidden');
		(<HTMLDivElement>document.getElementById('article-body-container')).classList.add('visually-hidden');
	}


	/* Method to upload comment */
	newComment() {
		const email = this.loginService.getEmail();
		const comment = (<HTMLInputElement>document.getElementById('comment-input-tag')).value;
		const vote = 0;

		if (comment != '') {
			// Update article in cloud
			this.ARTICLES[this.articleIndex]['chat'].push( {'email':email, 'comment':comment, 'vote':vote, 'reply':[]} );
			this.updateDB();
			// Clear input
			(<HTMLInputElement>document.getElementById('comment-input-tag')).value = '';
		} else {
			// Show promt to add comment
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Type comment first.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Method to add new Reply to comment */
	newReply(commentIndex:number) {
		const toast = <HTMLDivElement>document.getElementById("toast");
		const input = <HTMLInputElement>document.getElementsByClassName('replyInput')[commentIndex];
		
		// If input is empty
		if (input.value == '') {
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Reply is empty.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			// Add reply to list & DB
			this.ARTICLES[this.articleIndex]['chat'][commentIndex]['reply'].push( {'email':this.loginService.getEmail(), 'text':input.value} );
			input.value = '';
			this.updateDB();
			this.showReply(commentIndex);
		}
	}


	/* Method to open reply section */
	showReply(i:number) {
		// If btn is set to Reply
		if ((<HTMLHeadingElement>document.getElementsByClassName('comment-reply')[i]).innerHTML == 'Reply') {
			// Switch reply visibility
			if (this.replyIndex != -1) {
				(<HTMLHeadingElement>document.getElementsByClassName('comment-reply')[this.replyIndex]).innerHTML = 'Reply';
				(<HTMLDivElement>document.getElementsByClassName('reply-input')[this.replyIndex]).classList.add('visually-hidden');
			}
			this.replyIndex = i;
			(<HTMLHeadingElement>document.getElementsByClassName('comment-reply')[this.replyIndex]).innerHTML = 'Cancel';
			(<HTMLDivElement>document.getElementsByClassName('reply-input')[this.replyIndex]).classList.remove('visually-hidden');
		}
		// If btn is set to Cancel
		else {
			(<HTMLHeadingElement>document.getElementsByClassName('comment-reply')[i]).innerHTML = 'Reply';
			(<HTMLDivElement>document.getElementsByClassName('reply-input')[i]).classList.add('visually-hidden');
			this.replyIndex = -1;
		}
	}


	/* Method to upvote comment */
	upVote(i:number) {
		this.ARTICLES[this.articleIndex]['chat'][i]['vote'] += 1;
		this.updateDB();
	}


	/* Method to downvote comment */
	downVote(i:number) {
		this.ARTICLES[this.articleIndex]['chat'][i]['vote'] -= 1;
		this.updateDB();
	}


	/* Method to update article in DB */
	updateDB() {
		this.articleService.updateChats(this.ARTICLES[this.articleIndex]['_id'], {'chat':this.ARTICLES[this.articleIndex]['chat']}).subscribe((data:any) => {
			if (data == null) {
				const toast = <HTMLDivElement>document.getElementById("toast");
				(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured.";
				toast.classList.remove('hide');
				toast.classList.add('show');
			}
		});
	}

}
