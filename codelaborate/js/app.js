var currentLanguage = "Java";

var firebaseUrl = "https://codelaborate-ace.firebaseio.com/"
var firebaseRef = null;
var editor 		= null;
var firepad 	= null;

var $languageSelection = $(".language-selection");

function languageChange( language ) {
	$languageSelection.find("button").html(language + ' <span class="caret"> </span>');

	switch (language) {
		case "Java":
			editor.getSession().setMode("ace/mode/java");
			break;
		case "C++":
			editor.getSession().setMode("ace/mode/c_cpp");
			break;
		case "Javascript":
			editor.getSession().setMode("ace/mode/javascript");
			break;
		default:
			return;
	}
};

function init() {
	var name 	= window.location.hash;

	if( name == "" ) {
		$(".not-found").removeClass("hide");
		$(".stage").addClass("hide");
	}

	name = name.substr(1);
	firebaseUrl += name;

	editor 	= ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.gotoLine(0,0,false);

	firebaseRef = new Firebase(firebaseUrl);
	firepad = Firepad.fromACE(firebaseRef, editor, {});

	// Remove watermark created by firepad.
	$(".powered-by-firepad").remove();
	editor.focus();
	resizeHandler();
	languageChange(currentLanguage);
};



/******************************************************************************
*	EVENT HANDLERS
******************************************************************************/

function resizeHandler() {
	$('.quarter-panel').height($(window).height() / 2);
};

function languageChangeHandler(ev) {
	languageChange(ev.target.innerText);
}

/******************************************************************************
*	EVENTS
******************************************************************************/
$(window).resize(resizeHandler);
$(".language-selection ul").click(languageChangeHandler);

window.onload = init;