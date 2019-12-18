$(document).ready(function(){
	// Smooth scrolling using jQuery easing
  	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
	    if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
		      let target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		      if (target.length) {
		        $('html, body').animate({
		          	scrollTop: (target.offset().top - 58)
		        	}, 1000, "easeInOutExpo");
		        return false;
		      }
	    }
  	});	

  	//add input validation to forms
  	window.addEventListener('load', function() {
	    let forms = $('.form-validation');
	    let validation = Array.prototype.filter.call(forms, function(form) {
	      form.addEventListener('submit', function(event) {
	        if (form.checkValidity() === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	        form.classList.add('was-validated');
	      }, false);
	    });
		}, false);

	//slide out submission form
	$("#showSubmissionForm").click(function(){
		$('#submitForm').slideToggle();           
	});

	//Submit post button adds a user submission content onto the discussion board everytime it is clicked
	$('#submitPostButton').click(function(){
		$('#postSection').prepend('<div class="row entry-row"><div id="votes" class="col-lg-1 col-sm-1"><div class="row justify-content-center"><i class="fas fa-chevron-up upvote"> 134</i></div><div class="row justify-content-center"><i class="fas fa-chevron-down downvote"> 42</i></div></div><div class="col-lg-11 col-md-6"><div class="row content-section"><h5>QC > CSCI > General</h5></div><div class="row col-title contentTitle">PSA: Queens College Tech Career Fair</div><div class="row tagContent"><span class="tags">#Announcement #CareerFair #Tech</span></div><div class="row content-body">Hey guys dont forget! The Queens College tech career fair will be held in the student union 2nd floor on November 12th</div><div class="row post-Icons"><i class="fas fa-star"><span class="toolbar-item">Favorite</span></i><i class="fas fa-comment-alt"><span class="toolbar-item">Comment</span></i><i class="fas fa-share-square"><span class="toolbar-item">Share</span></i><i class="fas fa-flag"><span class="toolbar-item">Report</span></i><p class="postAuthor">Submitted by: CKlein230</p></div></div></div>                               ');
	});


	// show and hide reset password form
	$('#resetPasswordContainer').hide();
	$('#showResetForm').click(function(){
		$('#signInContainer').hide();
		$('#resetPasswordContainer').show();
	});
	$('#showSignIn').click(function(){
		$('#resetPasswordContainer').hide();
		$('#signInContainer').show();
	});
});

