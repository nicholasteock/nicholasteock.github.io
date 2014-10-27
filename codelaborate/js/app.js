var firebaseUrl = "https://codelaborate-ace.firebaseio.com/"
var firebaseRef = null;
var editor 		= null;
var firepad 	= null;
var userId 		= null;
var userList 	= null;

var $languageSelection = $(".language-selection");

function retrieveExistingProject() {
	var link = $("#loadexisting-link").val();

	if(link.length === 0) {
		$(".loadexisting-error").html("Input is required.");
		return;
	}

	link = link.substr( link.indexOf("#")+1 );

	firebaseRef = new Firebase(firebaseUrl);

	firebaseRef.child(link).once('value', function(ss) {
	    if( ss.val() === null ) {
	    	$(".loadexisting-error").html("Link is invalid. Please try again.");
	    }
	    else {
	    	window.location = "http://nicholasteock.github.io/codelaborate/#" + link;
	    }
	});
};

function createNewProject() {
	var projectName = $("#newproject-name").val();
	var fileName 	= $("#newproject-filename").val();
	var language 	= $("#newproject-language").html();

	// Project parameters validation.
	if(projectName.length === 0) {
		$(".newproject-error").html("All fields are required.");
		return;
	}
	if(fileName.length === 0) {
		$(".newproject-error").html("All fields are required.");
		return;
	}

	firebaseRef = new Firebase(firebaseUrl);
	firebaseRef.child(projectName).set({
		"language": language
	});

	Firebase.goOffline();
	
	window.location = "http://nicholasteock.github.io/codelaborate/#" + projectName + "/" + fileName;
};

function languageChange(language) {
	$languageSelection.find("button").html(language + ' <span class="caret"> </span>');

	switch (language) {
		case "Java":
			editor.getSession().setMode("ace/mode/java");
			break;
		case "C++":
			editor.getSession().setMode("ace/mode/c_cpp");
			break;
		default:
			return;
	}
};

function formRunParams() {
	/*
		Expected shape:
		{
			codePath
			language
			folder_name
			file_name
		}
	*/
};

function init() {
	var name 	= window.location.hash;

	if(name === "") {
		$("#newproject-modal").modal({keyboard: false, backdrop: 'static'});
	}

	name 		= name.substr(1);
	firebaseUrl += name;

	if (firepad) {
		// Clean up.
		firepad.dispose();
		userList.dispose();
	}

	firebaseRef = new Firebase(firebaseUrl);
	editor 		= ace.edit("editor");
	userId 		= firebaseRef.push().name();
	firepad 	= Firepad.fromACE(firebaseRef, editor, {userId: userId});
	userList 	= FirepadUserList.fromDiv(
					firebaseRef.child('users'),
      				document.getElementById("user-list"),
      				userId
      			);

	editor.setTheme("ace/theme/monokai");
	editor.gotoLine(0,0,false);
	
	// Remove watermark created by firepad.
	$(".powered-by-firepad").remove();
	editor.focus();
	resizeHandler();

	// Retrieves language of project and updates editor accordingly
	firebaseRef.parent().child("language").on('value', function (snapshot) {
		languageChange(snapshot.val());
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	});
};

/******************************************************************************
*	EVENT HANDLERS
******************************************************************************/

function startNewProjectHandler() {
	$(".modal-title").addClass("hide");
	$(".newproject-title").removeClass("hide");
	$(".load-existing").addClass("hide");
	$(".start-new").addClass("hide");
	$(".loadexisting").addClass("hide");
	$(".newproject").removeClass("hide");
};

function loadExistingProjectHandler() {
	$(".modal-title").addClass("hide");
	$(".loadexisting-title").removeClass("hide");
	$(".start-new").addClass("hide");
	$(".load-existing").addClass("hide");
	$(".newproject").addClass("hide");
	$(".loadexisting").removeClass("hide");
};

function changeNewProjectLanguage(ev) {
	$("#newproject-language").html(ev.target.innerText);
};

function resizeHandler() {
	$('.quarter-panel').height($(window).height() / 2);
};

function languageChangeHandler(ev) {
	languageChange(ev.target.innerText);
};

function runClickHandler(ev) {
	var runParams = formRunParams();
	// compileAndExecute(runParams);
}

/******************************************************************************
*	EVENTS
******************************************************************************/
$(window).resize(resizeHandler);
$("#run").click(runClickHandler);
$(".start-new").click(startNewProjectHandler);
$(".load-existing").click(loadExistingProjectHandler);
$(".newproject-create").click(createNewProject);
$(".loadexisting-load").click(retrieveExistingProject);
$(".language-selection ul").click(languageChangeHandler);
$(".newproject-languagelist a").click(changeNewProjectLanguage);

window.onload = init;