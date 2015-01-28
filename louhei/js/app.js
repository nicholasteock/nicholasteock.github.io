(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
// Hosted on: http://bitly.com/1z99Dhc
var ingredientCount 		= 4;
var currentIngredientIdx 	= 0;
var currentStageIdx 		= 0;
var tossIdx 				= 0;
var maxTosses 				= 3;
var stageNames 				= ['main', 'ingredients', 'toss', 'share'];
var url 					= encodeURIComponent('http://bitly.com/1z99Dhc');
var shareMessage 			= "Hi there! Let's Lou Hei together at: " + url;

var initialize = function() {
	$('.stage').addClass('hide');
	$('.plate').addClass('hide');
	$('.share-container').removeClass('in');
	$('.credits').removeClass('in');
	$('.ingredient-banner').addClass('hide');
	$('.desc-banner').addClass('hide');
	$('.main-plate').addClass('hide');
	$('.mini-plate').addClass('hide');
	$('.chunk-plate').removeClass('hide');
	$('.bounce').removeClass('bounce');

	$('.main-stage').removeClass('hide');
	// $('.toss-stage').removeClass('hide');
	$('.js-plate-0').removeClass('hide');
	$('.js-main-0').removeClass('hide');

	currentIngredientIdx 	= 0;
	currentStageIdx 		= 0;
	tossIdx 				= 0;

	$(document).trigger('disable_shaker');
};

var plateClickHandler = function() {
	var i = 0;
	var lastIngredient = 6;

	var showIngredients = function () {
		var lastIngredient = 6;

		// Transit to next stage (adding ingredients)
		if (i >= lastIngredient) {
			setTimeout( function() {
				nextStage();
				showIngredient();
			}, 1400);
			return;
		}

		setTimeout(function () {
			$('.js-plate-'+i).addClass('hide');
			i++;
			$('.js-plate-'+i).removeClass('hide');
			showIngredients();
		}, 400);
	};

	showIngredients();
};

var showIngredient = function() {
	$('.ingredient-banner').addClass('hide');
	$('.js-ingredient-'+currentIngredientIdx).removeClass('hide');
	
	$('.desc-banner').removeClass('bounce').addClass('hide');
	$('.js-desc-'+currentIngredientIdx).addClass('bounce').removeClass('hide');
	
	$('.mini-plate').addClass('hide');
	$('.js-mini-'+currentIngredientIdx).removeClass('hide');

	$('.ingredient-name-container').addClass('in');
	$('.ingredient-desc-container').addClass('hide');
	$('.mini-plate-container').addClass('in');
};

var showIngredientDesc = function() {
	$('.ingredient-name-container').removeClass('in');
	$('.ingredient-desc-container').removeClass('hide');
	$('.main-plate').addClass('hide');
	$('.js-main-'+(currentIngredientIdx+1)).removeClass('hide');
	$('.mini-plate-container').removeClass('in');

	currentIngredientIdx++;
	setTimeout(function() {
		isLastIngredient() ? nextStage() : showIngredient();
	}, 2400);
};

var showShareButtons = function() {
	var $plate = $(".chunk-plate-container");

	var hideChunks = function (chunkIdx, totalChunks) {
		setTimeout(function () {
			if (chunkIdx === totalChunks) {
				$('.js-message-0').addClass('hide');
				$('.js-message-1').removeClass('hide').addClass('bounce');
				$('.share-container').addClass('in');
				$('.credits').addClass('in');
				return;
			}
			$plate.find('.js-chunk-'+chunkIdx).addClass('hide');
			hideChunks(chunkIdx+1, totalChunks);
		}, 222);
	};
	hideChunks(1,5); // Start from 1, total 5 chunks
};

var doToss = function() {
	var $plate = $(".toss-plate-container");

	var toss = function(frameIdx, totalFrames) {
		setTimeout(function() {
			if(frameIdx === (totalFrames-1)) {
				$plate.find('.js-toss-'+(totalFrames-1)).addClass('hide');
				$plate.find('.js-toss-0').removeClass('hide');
				return;
			}
			$plate.find('.js-toss-'+frameIdx).addClass('hide');
            $plate.find('.js-toss-'+(frameIdx+1)).removeClass('hide');
			toss(frameIdx+1, totalFrames);
		}, 246);
	};

	toss(0,4); // Start from frame 0 with total 4 frames.
};

var isLastIngredient = function() {
	return currentIngredientIdx === ingredientCount;
};

var nextStage = function() {
	$('.' + stageNames[currentStageIdx] + '-stage').addClass('hide');
	currentStageIdx++;
	$('.' + stageNames[currentStageIdx] + '-stage').removeClass('hide');

	if(stageNames[currentStageIdx] === 'toss') {
		$(document).trigger('enable_shaker');
	}
	return;
};

var shareLink = function(type) {
	// Prefix message with url scheme.
	switch (type) {
		case 'whatsapp':
			url = "whatsapp://send?text=" + shareMessage;
			break;
		case 'sms':
			if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				url = "sms:;body=" + shareMessage;
			}
			else if (/Android/i.test(navigator.userAgent)) {
				url = "sms:?body=" + shareMessage;
			}
			break;
		default:
			break;
	};
	location.href = url;
};

var toss = function() {
	console.log('Play animation.');
	doToss();
	tossIdx += 1;
	$("#tossStatus").html(tossIdx+'/'+maxTosses);

	if(tossIdx > maxTosses) {
		$("#tossStatus").html('Going to next stage...');
		$(document).trigger('disable_shaker');
		nextStage();
	}
	else {
		setTimeout( function() {
			$(document).trigger('enable_shaker');
		}, 1000);
	}
};

module.exports = {
	initialize 			: initialize,
	plateClickHandler 	: plateClickHandler,
	showIngredient 		: showIngredient,
	showIngredientDesc 	: showIngredientDesc,
	isLastIngredient 	: isLastIngredient,
	nextStage 			: nextStage,
	toss 				: toss,
	showShareButtons 	: showShareButtons,
	shareLink			: shareLink
};

});

require.register("initialize", function(exports, require, module) {
var shaker 			= require('shaker');
var application 	= require('application');

$(function() {
	$('.loading-overlay').addClass('hide');
	
	application.initialize();

	$('.main-stage .js-plate-0').click(function() {
		application.plateClickHandler();
	});

	$('.ingredients-stage .mini-plate-container').click(function() {
		application.showIngredientDesc();
	});

	$('.share-stage .chunk-plate-container').click(function() {
		application.showShareButtons();
	});

	$('.js-share-whatsapp').click(function() {
		setTimeout( function() {
			application.shareLink('whatsapp');
		}, 100);
	});

	$('.js-share-sms').click(function(el) {
		setTimeout( function() {
			application.shareLink('sms');
		}, 100);
	});

	$(document).on('enable_shaker', function() {
		shaker.enable();
	});

	$(document).on('disable_shaker', function() {
		shaker.disable();
	});

	$(document).on('protoss', function() {
		application.toss();
	});

	// Temp event to test transitions (gray box)
	// $('.nextStage').click(function() {
	// 	$('.toss-stage').addClass('hide');
	// 	$('.share-stage').removeClass('hide');
	// });
});

});

require.register("preload", function(exports, require, module) {
module.exports = function(imageArr, callback){
	var $progress = $('#progress').text('0%'),
		loader = new PxLoader();

	// loader.addProgressListener(function(e) { 
 // 		console.log(e.completedCount + ' / ' + e.totalCount);
	//     // the event provides stats on the number of completed items 
	//     $progress.innerHt(e.completedCount + ' / ' + e.totalCount); 
	// });

	loader.addCompletionListener(callback);

	for(var i= 0; i < imageArr.length; i++){
		var pxImage = new PxLoaderImage(imageArr[i]); 
		loader.addImage(pxImage);
	}

	this.start = function() {
		loader.start();
	};

	return this;
}


// PRELOADER PRELOADER PRELOADER PRELOADER PRELOADER
});

;require.register("preloader", function(exports, require, module) {
module.exports = function(callback) {

	var Preload = require('preload');

	var preload = new Preload(
		[
			'images/rotate_device.png',
			'images/bg_text_00.png',
			'images/loadingplates_01.png',
			'images/loadingplates_02.png',
			'images/loadingplates_03.png',
			'images/loadingplates_04.png',
			'images/loadingplates_05.png',
			'images/loadingplates_06.png',
			'images/loadingplates_07.png',
			'images/bg_text_short_01.png',
			'images/bg_text_short_02.png',
			'images/bg_text_short_03.png',
			'images/bg_text_short_04.png',
			'images/bg_text_short.png',
			'images/mainplate_ingredients_00.png',
			'images/mainplate_ingredients_01.png',
			'images/mainplate_ingredients_02.png',
			'images/mainplate_ingredients_03.png',
			'images/mainplate_ingredients_04.png',
			'images/fish_text.png',
			'images/pepper_text.png',
			'images/sauce_text.png',
			'images/crackers_text.png',
			'images/miniplate_0.png',
			'images/miniplate_1.png',
			'images/miniplate_2.png',
			'images/miniplate_3.png',
			'images/tossing/tossing_01.png',
			'images/tossing/tossing_02.png',
			'images/tossing/tossing_03.png',
			'images/tossing/tossing_04.png',
			'images/bg_text_short_07.png',
			'images/bg_text_short_08.png',
			'images/mainplate_eaten_last.png',
			'images/mainplate_eatenpiece_01.png',
			'images/mainplate_eatenpiece_02.png',
			'images/mainplate_eatenpiece_03.png',
			'images/mainplate_eatenpiece_04.png',
			'images/mainplate_eatenpiece_05.png',
			'images/icon_wa.png',
			'images/icon_sms.png',
			'images/2359logo.png'
		],
		callback
	);

	preload.start();
};
});

require.register("shaker", function(exports, require, module) {
/******************************************************************************
	shaker.js
	
	- Handles device orientation.

	- When device orientation changes, we monitor the change and sense the
	  orientation.

	- Depending on orientation ( forwards / backwards ) we can then make the 
	  required trigger which is handled in index.js

******************************************************************************/

var deviceType,
	ANDROID = 0,
	IOS = 1,
	WINDOWS = 2,
	UNKNOWN = -1;

if (/Android/i.test(navigator.userAgent)) {
	deviceType = ANDROID;
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	deviceType = IOS;
}else if (/Windows/i.test(navigator.userAgent)) {
	deviceType = WINDOWS;
} else {
	deviceType = UNKNOWN;
}

var enabled 			= false;
var highpointReached 	= false;
var preventToss 		= false;

var enable = function() {
	enabled = true;
	if (window.DeviceMotionEvent) {
	  // Listen for the event and handle DeviceOrientationEvent object
	  // window.addEventListener( 'deviceorientation', tiltHandler );
	  window.addEventListener( 'devicemotion', tiltHandler );
	}
	else {
		console.error('DeviceMotionEvent undefined');
	}
	return;
};

var disable = function() {
	enabled = false;
	if (window.DeviceMotionEvent) {
	  // Listen for the event and handle DeviceOrientationEvent object
	  // window.addEventListener( 'deviceorientation', tiltHandler );
	  window.removeEventListener( 'devicemotion', tiltHandler );
	}
	else {
		console.error('DeviceMotionEvent undefined');
	}
	return;
};

var androidTiltHandler = function(evt) {
	var zAcceleration = Math.round(evt.accelerationIncludingGravity.z);

	// $("#debug2").html("<h3>Android Acceleration</h3><ul><li>X: "+Math.round(evt.accelerationIncludingGravity.x)+"</li><li>Y: "+Math.round(evt.accelerationIncludingGravity.y)+"</li><li>Z: "+Math.round(evt.accelerationIncludingGravity.z)+"</li></ul>");
	// $("#debug3").html("<h3>Rotation</h3><ul><li>X: "+Math.round(evt.rotationRate.alpha)+"</li><li>Y: "+Math.round(evt.rotationRate.beta)+"</li><li>Z: "+Math.round(evt.rotationRate.gamma)+"</li></ul>");
	// $("#debug4").html("<h3>Prevent Toss</h3><ul><li>"+preventToss+"</li></ul>");

	if(zAcceleration > -10) {
		if(!highpointReached) {
			highpointReached = true;
		}
		return;
	}
	if(zAcceleration < 16 && highpointReached) {
		highpointReached = false;
		disable(); // Disable further tosses while showing toss.
		$(document).trigger('protoss'); // Trigger tossing
	}
}

var iosTiltHandler = function(evt) {
	var zAcceleration = Math.round(evt.accelerationIncludingGravity.z);

	// $("#debug2").html("<h3>IOS Acceleration</h3><ul><li>X: "+Math.round(evt.accelerationIncludingGravity.x)+"</li><li>Y: "+Math.round(evt.accelerationIncludingGravity.y)+"</li><li>Z: "+Math.round(evt.accelerationIncludingGravity.z)+"</li></ul>");
	// $("#debug3").html("<h3>Rotation</h3><ul><li>X: "+Math.round(evt.rotationRate.alpha)+"</li><li>Y: "+Math.round(evt.rotationRate.beta)+"</li><li>Z: "+Math.round(evt.rotationRate.gamma)+"</li></ul>");
	// $("#debug4").html("<h3>Prevent Toss</h3><ul><li>"+preventToss+"</li></ul>");

	if(zAcceleration >= 5) {
		if(!highpointReached) {
			highpointReached = true;
		}
		return;
	}
	if(zAcceleration <= -15 && highpointReached) {
		highpointReached = false;
		disable(); // Disable further tosses while showing toss.
		$(document).trigger('protoss'); // Trigger tossing
	}
};

function tiltHandler( evt ) {
	if(!enabled) return;

	if (deviceType === ANDROID) {
		androidTiltHandler(evt);
	} else if (deviceType === IOS || deviceType === WINDOWS) {
		iosTiltHandler(evt);
	}
};

var supportsTilt = function() {
	return (window.DeviceOrientationEvent && typeof window.orientation !== "undefined");
};

module.exports = {
	supportsTilt: supportsTilt,
	enable 		: enable,
	disable 	: disable
};
});


//# sourceMappingURL=app.js.map