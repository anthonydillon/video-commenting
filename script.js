$(document).ready(function() {
	
	var video = comment = results = commentsArray = null;
    init();
    
    function init() {
    	video = document.getElementById('video');
		comment = $('#comment');
		results = $('#results');
		commentsArray = new Array();
    	setup();
    }
    
    function setup() {
    	video.addEventListener('click', function(e){
		    e.preventDefault();
		    if(video.paused){ 
		    	closeComment();
		    }else{ 
		    	openComment(); 
		    }
	    }, false);
	
		comment.find('.cancel').click(function(e){
			closeComment();
		});
		
		comment.find('.save').click(function(e){
			saveComment();
		});
		
		comment.keypress(function(e) {
	        if(e.which == 10 || e.which == 13) {
	            saveComment();
	        }
	    });
	    
	    
    }
	
	function saveComment() {
		commentsArray.push(new Comment(commentsArray.length, comment.find('input[type="text"]').val(), Math.round(video.currentTime)));
		refreshCommentList();
		closeComment();
	}
	
	function closeComment() {
		video.play();
	    comment.hide();
	    comment.find('input[type="text"]').val('');
	}
	
	function openComment() {
		video.pause();
	    comment.find('p span').text(' ' + Math.round(video.currentTime) + ' secs');
	    comment.show();
	    comment.find('input[type="text"]').focus();
	}
	
	function refreshCommentList() {
		results.text("");
		for(var i = 0; i < commentsArray.length; i++) {
			results.prepend(commentsArray[i].toString());
		}
		renewClickFunctions();
	}
	
	function renewClickFunctions() {
		results.find('a').unbind('click');
		results.find('a').bind('click',function(e){
			e.preventDefault();
			if($(this).hasClass('edit')){
		    	editClicked($(this).parent().attr('class'));
		    }else if($(this).hasClass('delete')){
		    	deleteClicked($(this).parent().attr('class'));
		    }
	    });
	}
	
	function editClicked($id) {
		console.log('Edit: '+ $id);
	}
	
	function deleteClicked($id) {
		commentsArray[$id].setActive(false);
		refreshCommentList();
	}
});


function Comment($id, $comment, $time, $type, $active) {
	if( $id == undefined ){ $id = 0; }
	if( $comment == undefined ){ $comment = '' }
	if( $time == undefined ){ $time = 0 }
	if( $type == undefined ){ $type = null }
	if( $active == undefined ){ $active = true }
	
	var _id = $id;
	var _comment = $comment;
	var _time = $time;
	var _type = $type;
	var _active = $active;
	
	this.id = function() { return _id }
	this.comment = function() {  return _comment }
	this.timestamp = function() { return _time }
	this.type = function() { return _type }
	this.active = function() {return _active }
	
	this.setID = function($id) { _id = $id }
	this.setComment = function($comment) { _comment = $comment }
	this.setTime = function($time) { _time = $time }
	this.setType = function($type) { _type = $type }
	this.setActive = function($active) { _active = $active }
	
	this.toString = function() {
		if( _active ){
			return '<p class="'+ _id +'"><a href="#" class="edit">Edit</a> - <a href="#" class="delete">Delete</a> | ' + _time + ' secs : <span>' + _comment + '</span></p>';
		}
	}
}
