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
var freeze 					= false;
var ingredientCount 		= 5;
var currentIngredientIdx 	= 0;
var currentStageIdx 		= 0;
var tossCount 				= 0;
var maxTosses 				= 4;
var stageNames 				= ['main', 'ingredients', 'tossing', 'share'];
var url 					= encodeURIComponent('http://bitly.com/1z99Dhc');
var shareMessage 			= "Hi there! Let's Lou Hei together at: " + url;

var initialize = function() {

	$('.app-stage').click();
	$('.stage').addClass('hide');
	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	// $('.main-stage').removeClass('hide');
	// $('.ingredients-stage').removeClass('hide');
	// $('.tossing-stage').removeClass('hide');
	// $('.main-stage').addClass('hide');
	// $('.share-stage').removeClass('hide');

	currentIngredientIdx 	= 0;
	currentStageIdx 		= 0;
	tossIdx 				= 0;

	$('.app-stage').removeClass('hide');
	$(document).trigger('disable_shaker');
};

var plateClickHandler = function() {
	if(freeze) return; // Event lock
	freeze = true; // Enable lock

	var i = 0;
	var lastIngredient = 6;

	var showIngredients = function () {
		var lastIngredient = 6;

		// Transit to next stage (adding ingredients)
		if (i >= lastIngredient) {
			setTimeout( function() {
				freeze = false; // Release lock
				nextStage();
				showIngredient();
			}, 1000);
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
	if(freeze) return; // Event lock
	freeze = true; // Enable lock

	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	$('.js-ingredient-'+currentIngredientIdx).removeClass('hide').addClass('in');

	setTimeout(function() {
		freeze = false; // Release lock
		return;
	}, 1200);
};

var showIngredientDesc = function() {
	if(freeze) return;
	freeze = true;

	$('.in').removeClass('in');
	$('.bounce').removeClass('bounce');

	$('.js-ingredient-'+currentIngredientIdx).addClass('hide').addClass('in');
	$('.js-desc-'+currentIngredientIdx).addClass('bounce');
	$('.js-main-'+(currentIngredientIdx)).addClass('hide');
	$('.js-main-'+(currentIngredientIdx+1)).removeClass('hide');

	currentIngredientIdx++;
	setTimeout(function() {
		freeze = false;
		isLastIngredient() ? nextStage() : showIngredient();
	}, 2400);
};

var showShareButtons = function() {
	var $plate = $(".chunks-container");

	var hideChunks = function (chunkIdx, totalChunks) {
		$plate.find('.js-chunk-'+chunkIdx).addClass('hide');
		setTimeout(function() {
			if (chunkIdx === totalChunks-1) {
				$('.js-message-0').addClass('hide');
				$('.js-message-1').removeClass('hide').addClass('bounce');
				$('.share-container').addClass('in');
				$('.credits').addClass('in');
				return;
			}
			else {
				hideChunks(chunkIdx+1, totalChunks);
			}
		}, 250);
	};
	hideChunks(0,6); // Start from 1, total 5 chunks
};

var doToss = function() {
	var toss = function(currentFrameIdx, totalFrames) {
		$('.js-toss-'+currentFrameIdx).addClass('hide');
        $('.js-toss-'+(currentFrameIdx+1)).removeClass('hide');
		setTimeout(function() {
			if(currentFrameIdx !== totalFrames-1) {
				toss(currentFrameIdx+1, totalFrames);
			}
			else {
				$('.js-tossbase').addClass('hide');
			}
		}, 110);
	};

	$('.js-tossbase').removeClass('hide');
	toss(-1,17); // Start from frame 0 with total 16 frames.
};

var isLastIngredient = function() {
	return currentIngredientIdx === ingredientCount;
};

var nextStage = function() {
	$('.' + stageNames[currentStageIdx] + '-stage').addClass('hide');
	currentStageIdx++;
	$('.' + stageNames[currentStageIdx] + '-stage').removeClass('hide');

	if(stageNames[currentStageIdx] === 'tossing') {
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
	$(document).trigger('disable_shaker'); // Disable shaker while tossing.

	if(tossCount === 0) {
		$('.js-tossmessage-0').addClass('hide');
		$('.js-tossbase-0').addClass('hide');
		$('.js-tossbase-1').removeClass('hide');
	}
	else {
		$('.js-tossmessage-1').addClass('hide');
	}

	doToss(); // Animate
	
	tossCount += 1;

	setTimeout(function() {
		if(tossCount >= maxTosses) {
			$('.js-tossbase-2').removeClass('hide');
			nextStage();
		}
		else {
			$('.js-tossmessage-1').removeClass('hide');
			$('.js-tossbase-1').removeClass('hide');
			$(document).trigger('enable_shaker');
		}
	}, 2000);
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
// require('swiper');

$(function() {
	$('.loading-overlay').addClass('hide');
	
	application.initialize();

	$('.main-stage .js-plate-0').click(function() {
		$(".audio-player")[0].play();
		application.plateClickHandler();
	});

	$('.ingredients-stage .small-plate').click(function() {
		application.showIngredientDesc();
	});

	$('.share-stage .chunks-container').click(function() {
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

	$('.share-link').click(function(el) {
   		// $(this).focus();
   		// $(this).select();
   		this.setSelectionRange(0, 25);
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
			'images/firstpage/logo.png',
			'images/firstpage/firstpage_welcome_text.png',
			'images/firstpage/loadingplates_01.png',
			'images/firstpage/loadingplates_02.png',
			'images/firstpage/loadingplates_03.png',
			'images/firstpage/loadingplates_04.png',
			'images/firstpage/loadingplates_05.png',
			'images/firstpage/loadingplates_06.png',
			'images/firstpage/loadingplates_07.png',
			'images/ingredients/add_fish_text.png',
			'images/ingredients/add_lime_text.png',
			'images/ingredients/add_peppercinnamon_text.png',
			'images/ingredients/add_sauce_text.png',
			'images/ingredients/add_crackers_text.png',
			'images/ingredients/fish_text.png',
			'images/ingredients/lime_text.png',
			'images/ingredients/peppercinnamon_text.png',
			'images/ingredients/sauce_text.png',
			'images/ingredients/crackers_text.png',
			'images/ingredients/mainplate_ingredients_0.png',
			'images/ingredients/mainplate_ingredients_1.png',
			'images/ingredients/mainplate_ingredients_2.png',
			'images/ingredients/mainplate_ingredients_3.png',
			'images/ingredients/mainplate_ingredients_4.png',
			'images/ingredients/mainplate_ingredients_5.png',
			'images/ingredients/miniplate_0.png',
			'images/ingredients/miniplate_1.png',
			'images/ingredients/miniplate_2.png',
			'images/ingredients/miniplate_3.png',
			'images/ingredients/miniplate_4.png',
			'images/tossing/tossing_start_text.png',
			'images/tossing/tossing_halfway_text.png',
			'images/tossing/mainplate_tossed_start.png',
			'images/tossing/mainplate_tossed_halfway.png',
			'images/tossing/mainplate_tossed_completely.png',
			'images/tossing/tossing_0.png',
			'images/tossing/tossing_1.png',
			'images/tossing/tossing_2.png',
			'images/tossing/tossing_3.png',
			'images/tossing/tossing_4.png',
			'images/tossing/tossing_5.png',
			'images/tossing/tossing_6.png',
			'images/tossing/tossing_7.png',
			'images/tossing/tossing_8.png',
			'images/sharing/share_start_text.png',
			'images/sharing/share_end_text.png',
			'images/sharing/mainplate_eaten.png',
			'images/mainplate_eatenpiece_0.png',
			'images/mainplate_eatenpiece_1.png',
			'images/mainplate_eatenpiece_2.png',
			'images/mainplate_eatenpiece_3.png',
			'images/mainplate_eatenpiece_4.png',
			'images/mainplate_eatenpiece_5.png',
			'images/sharing/icon_wa.png',
			'images/sharing/icon_sms.png',
			'images/sharing/logo.png'
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

	if(zAcceleration > 0) {
		if(!highpointReached) {
			highpointReached = true;
		}
		return;
	}
	if(zAcceleration < 10 && highpointReached) {
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

	if(zAcceleration >= 2) {
		if(!highpointReached) {
			highpointReached = true;
		}
		return;
	}
	if(zAcceleration <= -12 && highpointReached) {
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

require.register("swiper", function(exports, require, module) {
var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var screen = document.querySelector(".ingredients-stage");
var el = document.getElementById('mini-plate-container');

// var START_X = Math.round(el.offsetWidth);
// var START_Y = Math.round(el.offsetHeight);

var START_X = 0;
var START_Y = -1100;

var miniPlateContainer = new Hammer(el);

miniPlateContainer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

miniPlateContainer.on('swipe', onSwipe);

var ticking = false;
var transform;
var timer;

function resetElement() {
    el.className = 'animate';
    transform = {
        translate: { x: START_X, y: START_Y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    requestElementUpdate();
};

function updateElementTransform() {
    var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];

    value = value.join(" ");
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    ticking = false;
};

function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
};

function onSwipe(ev) {
    var angle = 50;
    transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
    transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
    transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

    clearTimeout(timer);
    timer = setTimeout(function () {
        resetElement();
    }, 300);

    requestElementUpdate();
};

resetElement();




});


//# sourceMappingURL=app.js.map