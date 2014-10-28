var firebaseRootUrl = "https://codelaborate-ace.firebaseio.com/"
var firebaseUrl 	= "";
var firebaseRef 	= null;
var editor 			= null;
var firepad 		= null;
var userId 			= null;
var userList 		= null;

var $languageSelection = $(".language-selection");

function verifyFirebaseLink(link, callback) {
	console.log("verifyFirebaseLink. Checking : ", link);
	
	firebaseRef = new Firebase(firebaseRootUrl);
	firebaseRef.root().child(link).once('value', function(ss) {
	    if( ss.val() === null ) {
	    	return callback(false);
	    }
	    else {
	    	return callback(true);
	    }
	});
};

function loadProject(link) {
	$(".loadexisting-error").html("");		
	
	verifyFirebaseLink(link, function(result) {
		if(!result) {
	    	$(".loadexisting-error").html("Link is invalid. Please try again.");			
			return;
		}
		else {
			$("#newproject-modal").modal("hide");
	    	setTimeout( function() {
	    		// window.location = "file:///Users/Nicholas/Workspace/fyp/codelaborate/index.html#" + link;
	    		window.location = "http://nicholasteock.github.io/codelaborate/#" + link;
	    		return false;
	    	}, 500);
		}
		return false;
	});
	return false;
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

	$("#newproject-modal").modal("hide");

	firebaseRef = new Firebase(firebaseRootUrl);

	firebaseRef.child(projectName).set({language: language});
	firebaseRef.child("projectLanguageRef").child(projectName).set(language);
	firebaseRef.child("projectLanguageRef").once('child_added', function() {
		// Firebase.goOffline();
		setTimeout( function() {
			// window.location = "file:///Users/Nicholas/Workspace/fyp/codelaborate/index.html#" + projectName + "/" + fileName;
			window.location = "http://nicholasteock.github.io/codelaborate/#" + projectName + "/" + fileName;
			return false;
		}, 1000 );
		return false;
	});
	return false;
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
	var projectName;

	if(name === "") {
		$("#newproject-modal").modal({keyboard: false, backdrop: 'static'});
		return;
	}

	name 		= name.substr(1);
	projectName = name.substring(0, name.indexOf("/"));
	fileName 	= name.substr(name.indexOf("/")+1);
	firebaseUrl = firebaseRootUrl + name;

	if (firepad) {
		// Clean up.
		firepad.dispose();
		userList.dispose();
	}

	verifyFirebaseLink(projectName, function(result) {
		if( !result ) {
			$(".loadingstage").addClass("hide");
			$(".invalidlinkstage").removeClass("hide");
			return;
		}
		else {
			// Retrieves language of project and updates editor accordingly
			firebaseRef = new Firebase(firebaseRootUrl);
			firebaseRef.child("projectLanguageRef").child(projectName).once('value', function (snapshot) {
				var editorId = "editor-"+fileName;
				$("#editor").data("codePath", name);
				$("#editor").attr("id", editorId);
				editor 		= ace.edit(editorId);
				userId 		= firebaseRef.child(projectName).child(fileName).push().name();
				firepad 	= Firepad.fromACE(firebaseRef.child(projectName).child(fileName), editor, {userId: userId});
				userList 	= FirepadUserList.fromDiv(
								firebaseRef.child(projectName).child(fileName).child('users'),
			      				document.getElementById("user-list"),
			      				userId
			      			);

				editor.setTheme("ace/theme/monokai");
				editor.gotoLine(0,0,false);

				// Remove watermark created by firepad.
				$(".powered-by-firepad").remove();
				$(".editor-nav").append('<li class="active"><a><span>'+fileName+'</span>' +
										'<span class="glyphicon glyphicon-remove"> </span></a></li>');
				editor.focus();
				resizeHandler();
				languageChange(snapshot.val());
				$(".loadingstage").addClass("hide");
				$(".stage").removeClass("hide");
			}, function (errorObject) {
				console.log('The read failed: ' + errorObject.code);
			});
		}
	});
};

/******************************************************************************
*	EVENT HANDLERS
******************************************************************************/

function startnewOptionHandler() {
	$(".modal-title").addClass("hide");
	$(".newproject-title").removeClass("hide");
	$(".load-option").addClass("hide");
	$(".startnew-option").addClass("hide");
	$(".loadexisting").addClass("hide");
	$(".newproject").removeClass("hide");
	$(".back-option").removeClass("hide");
};

function loadOptionHandler() {
	$(".modal-title").addClass("hide");
	$(".loadexisting-title").removeClass("hide");
	$(".startnew-option").addClass("hide");
	$(".load-option").addClass("hide");
	$(".newproject").addClass("hide");
	$(".loadexisting").removeClass("hide");
	$(".back-option").removeClass("hide");
};

function backOptionHandler() {
	$(".modal-title").addClass("hide");
	$(".welcome-title").removeClass("hide");
	$(".startnew-option").removeClass("hide");
	$(".load-option").removeClass("hide");
	$(".newproject").addClass("hide");
	$(".loadexisting").addClass("hide");
	$(".back-option").addClass("hide");
};

function loadExistingHandler() {
	var link = $("#loadexisting-link").val();

	if(link.length === 0) {
		$(".loadexisting-error").html("Input is required.");
		return;
	}

	link = link.substr( link.indexOf("#")+1 );

	if(link.indexOf("/") === -1) {
    	$(".loadexisting-error").html("Link is invalid. Please try again.");
		return;
	}
	else {
		loadProject(link);
	}
};

function showNewProjectHandler() {
	$(".invalidlinkstage").addClass("hide");
	$("#newproject-modal").modal({keyboard: false, backdrop: 'static'});
	startnewOptionHandler();
	return;
};

function loadExistingRetryHandler() {
	var link = $("#retrylink").val();

	if(link.length === 0) {
		$(".loadexisting-error").html("Input is required.");
		return;
	}

	link = link.substr( link.indexOf("#")+1 );

	if(link.indexOf("/") === -1) {
    	$(".loadexisting-error").html("Link is invalid. Please try again.");
		return;
	}
	else {
		loadProject(link);
	}
};

function changeNewProjectLanguage(ev) {
	$("#newproject-language").html(ev.target.innerText);
};

function resizeHandler() {
	$('.misc-panel').height( ($(window).height()-58) / 3);
	$(".editor-panel").height( $(window).height()-52 );
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
$(".startnew-option").click(startnewOptionHandler);
$(".load-option").click(loadOptionHandler);
$(".back-option").click(backOptionHandler);
$(".createproject").click(createNewProject);
$(".loadexisting").click(loadExistingHandler);
$(".shownewproject").click(showNewProjectHandler);
$(".retrylink-submit").click(loadExistingRetryHandler);
$(".language-selection ul").click(languageChangeHandler);
$(".newproject-languagelist a").click(changeNewProjectLanguage);

window.onload = init;