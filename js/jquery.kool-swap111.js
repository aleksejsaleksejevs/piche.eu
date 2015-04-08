/*
Kool Swap v0.5.6
by Joscha Schmidt - http://www.joschaschmidt.de

For more information, visit:
http://kool-swap.joschaschmidt.de

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact

*/
(function( $ ){




	var ksGlobal = {
		defaults: {
				swapBox : '',
				loadBox : '',
				swapTriggerBox : '.kool-swap',
				swapTrigger : 'a',
				direction: '',
				inDuration : 700,
				outDuration : 500,
				inEasing : 'easeInSine',
				outEasing : 'easeInSine',
				bouncingBoxes : '',
				bouncingBoxHandling: 'fade',
				preloadImages : true,
				positionType: 'fixed',
				moveSwapBoxClasses: '',
				history: false,
				outerWidth: false,
				loadErrorMessage : 'The requested page was not found.',
				loadErrorBacklinkText : 'Go back to the last page',
		},
		listenToPopState: function(settings, $swapTrigger) {
			$(window)
			.off('popstate')
			.on('popstate', function(e) { // Listen to popstate
				var $swapBoxIn;
				switch (settings.direction) {
				    case 'left-to-right':
						$swapBoxIn = 'ks-swap-box-in-l-pushstate';
						break;
				    case 'right-to-left':
						$swapBoxIn = 'ks-swap-box-in-r-pushstate';
						break;
				    case 'top-to-bottom':
						$swapBoxIn = 'ks-swap-box-in-t-pushstate';
						break;
				    case 'bottom-to-top':
						$swapBoxIn = 'ks-swap-box-in-b-pushstate';
						break;
				    case '':
						$swapBoxIn = 'ks-swap-box-in-pushstate';
						break;
			        default:
						alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
			        	return false;
			        	break;
				}
				ksPageSwap.swapHistoryPage(settings, $swapTrigger, $swapBoxIn);
				e.stopPropagation();
			});
		}
	};

	var ksPageSwap = {
		defaults: function($this, options) {
			psSettings = $this.data('kool-swap-window');

			if(typeof(psSettings) == 'undefined') {
				psSettings = $.extend({}, ksGlobal.defaults, options);
				$this.data('kool-swap-window', psSettings);
			} else {
				psSettings = $.extend(psSettings, options);
			}

			return psSettings;
		},
		init: function(options) {
			var hasPushstate = (window.history && history.pushState);

			return this.each(function() {
				ksPageSwap.defaults($(this), options);

				var $swapBox = $(psSettings.swapBox), // Use the swapBox option if it is called without selector
					swapTriggerBox = psSettings.swapTriggerBox,
					swapTrigger = psSettings.swapTrigger,
					pageSwap = true;

				if (hasPushstate && $('html').not('[data-ks-initialised]') ) {
					$('html').attr('data-ks-initialised', 'true');
					ksGlobal.listenToPopState(psSettings, $(swapTriggerBox + ' ' + swapTrigger));
				}

				ksMethods.trigger(psSettings, hasPushstate, swapTriggerBox, swapTrigger, pageSwap);
			});
		},
		swapHistoryPage: function(psSettings, $swapTrigger, swapBoxIn) {
			if($('html').is('[data-ks-history-pushed]')) {
				var href = location.pathname;
					$swapTrigger = $swapTrigger.filter('[href="' + href + '"]');

				//var currentpage = locationPath.replace(/^.*[\\\/]/, '');
				ksMethods.ksLoadPage(psSettings, $swapTrigger, href, swapBoxIn);
			}
		},
		destroy : function($this) {
			$(document).off('click', psSettings.swapTriggerBox + ' ' + psSettings.swapTrigger);
			return $(this).each(function() {
				var $this = $(this);
				$this.removeData('kool-swap-window');
			});
		},
	};

	var ksSelectorSwap = {
		defaults: function($this, options) {
			settings = $this.data('kool-swap');

			if(typeof(settings) == 'undefined') {
				settings = $.extend({}, ksGlobal.defaults, options);
				$this.data('kool-swap', settings);
			} else {
				settings = $.extend(settings, options);
			}
			return settings;
		},
		init: function(options) {
			var hasPushstate = (window.history && history.pushState);

			return this.each(function() {
				ksSelectorSwap.defaults($(this), options);

				settings.swapBox = $(this); // use the given selector

				var swapTriggerBox = settings.swapTriggerBox,
					swapTrigger = settings.swapTrigger,
					pageSwap;

				if (settings.history == true) {
					var pageSwap = true;

					if (hasPushstate && $('html').not('[data-ks-initialised]') ) {
						$('html').attr('data-ks-initialised', 'true');
						ksGlobal.listenToPopState(psSettings, $(swapTriggerBox + ' ' + swapTrigger));
					}
				}
				else
				{
					var pageSwap = false;
				}

				ksMethods.trigger(settings, true, swapTriggerBox, swapTrigger, pageSwap);
			});
		},
		destroy : function($this) {
			$(document).off('click', settings.swapTriggerBox + ' ' + settings.swapTrigger);
			return $(this).each(function() {
				var $this = $(this);
				$this.removeData('kool-swap');
			});
		},

	};

	var ksMethods = {
		trigger: function(settings, hasPushstate, swapTriggerBox, swapTrigger, pageSwap) {
			if (hasPushstate) {
				function is_touch_device() { // check if the plugin's running on a touch device
					var el = document.createElement('div');
					el.setAttribute('ongesturestart', 'return;');
					return typeof el.ongesturestart === "function";
				};


				if (is_touch_device()) {
					$(document)
					// for the 404 back link
					.on('touchstart', '.ajaxPageSwitchBacklink', function() {
						window.history.back();
					})
					.off('touchstart', swapTriggerBox + ' ' + swapTrigger)
					.on('touchstart', swapTriggerBox + ' ' + swapTrigger, function(e) {
						e.preventDefault();
						var $swapTrigger = $(this);

						ksMethods.ksDefineSwapBoxIn(settings, $swapTrigger, hasPushstate, pageSwap);
					});
				} else {
					$(document)
					// for the 404 back link
					.on('click', '.ajaxPageSwitchBacklink', function() {
						window.history.back();
					})
					.off('click', swapTriggerBox + ' ' + swapTrigger)
					.on('click', swapTriggerBox + ' ' + swapTrigger, function(e) {
						e.preventDefault();
						var $swapTrigger = $(this);

						ksMethods.ksDefineSwapBoxIn(settings, $swapTrigger, hasPushstate, pageSwap);
					});
				}
			}
		},
		ksDefineSwapBoxIn: function(settings, $swapTrigger, hasPushstate, pageSwap) {
			switch (settings.direction) {
			    case 'left-to-right':
			    case 'right-to-left':
			    case 'top-to-bottom':
			    case 'bottom-to-top':
			    case '':
					$swapBoxIn = 'ks-swap-box-in';
					if (!$('.ks-swap-box-in').length) {
						var item = $(this);
						ksMethods.ksCollectLoadPageInfo(settings, $swapTrigger, hasPushstate, $swapBoxIn, pageSwap);
					} else {
						return false;
					}
					break;
		        default:
					alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
		        	return false;
		        	break;
			}
		},
		ksCollectLoadPageInfo: function(settings, $swapTrigger, hasPushstate, $swapBoxIn, pageSwap) {
			var url = $swapTrigger.attr('href');

			var $swapBoxIn;
			switch (settings.direction) {
			    case 'left-to-right':
					$swapBoxIn = 'ks-swap-box-in-l';
					break;
			    case 'right-to-left':
					$swapBoxIn = 'ks-swap-box-in-r';
					break;
			    case 'top-to-bottom':
					$swapBoxIn = 'ks-swap-box-in-t';
					break;
			    case 'bottom-to-top':
					$swapBoxIn = 'ks-swap-box-in-b';
					break;
			    case '':
					$swapBoxIn = 'ks-swap-box-in';
					break;
		        default:
					alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
		        	return false;
		        	break;
			}

			ksMethods.ksLoadPage(settings, $swapTrigger, url, $swapBoxIn, pageSwap);

			if (pageSwap) {
				history.pushState({'url':url}, null, url); // Update the url
				$('html').attr('data-ks-history-pushed', 'true');
			}
		},
		ksLoadPage: function(settings, $swapTrigger, href, swapBoxIn, pageSwap) {
			var $swapBox = $(settings.swapBox); // redefine $swapBox variable
			if (href != '') {
				ksMethods.ksAddSwapBoxIn(settings, swapBoxIn);
				$.ajax({
					type: 'GET',
					url: href,
					data: {},
					beforeSend: function() {
						ksMethods.ksCreateLoadBox();
					},
					error : function(data, xhrStatusText, xhrStatus) {
						$swapBox.html(settings.loadErrorMessage + '<p>' + xhrStatusText + ': <strong>' + xhrStatus + '</strong></p><p><a class="ajaxPageSwitchBacklink">' + settings.loadErrorBacklinkText + '</a></p>');
					},

					success: function(data) {



						$(settings.swapTriggerBox).find('*').filter('.active').removeClass('active');
						$swapTrigger.addClass('active');

						if (settings.bouncingBoxes) {
							if (settings.bouncingBoxHandling == 'fade') {
								ksMethods.ksFadeSiblings(settings, $swapTrigger, data, swapBoxIn, pageSwap);
							} else if (settings.bouncingBoxHandling == 'slide') {
								ksMethods.ksSlideSiblings(settings, $swapTrigger, data, $swapBox, swapBoxIn, pageSwap);
							}
						} else {
							ksMethods.ksPositionAndPrepare(settings, $swapTrigger, data, swapBoxIn, pageSwap);
						}
					},
					dataType: 'html',
				});
			} else {
				alert('No target defined! Please check the references (i.e. normally href) of the swapTriggers.');
			}
		},
		ksAddSwapBoxIn: function(settings, swapBoxIn) {
			var $swapBox = $(settings.swapBox), // redefine $swapBox variable
				swapBoxClass = $swapBox.attr('class'),
				swapBoxTagName = $swapBox.prop("tagName");

			$(document).find('.ks-swap-box-in').remove();

			if (settings.moveSwapBoxClasses) {
				$swapBox.after('<' + swapBoxTagName.toLowerCase() + ' class="ks-swap-box-in ' + (typeof swapBoxClass != 'undefined' ? swapBoxClass : '') + '" id="' + swapBoxIn + '"></' + swapBoxTagName.toLowerCase() + '>'); // create the temp container
			} else {
				$swapBox.after('<' + swapBoxTagName.toLowerCase() + ' class="ks-swap-box-in" id="' + swapBoxIn + '"></' + swapBoxTagName.toLowerCase() + '>'); // create the temp container
			}

			$swapBox.siblings('.ks-swap-box-in')
			.hide();

		},
		ksFadeSiblings: function(settings, $swapTrigger, data, swapBoxIn, pageSwap) {
			$(document)
			.find(settings.bouncingBoxes)
			.animate({opacity: 0}, 50, function() {
				ksMethods.ksPositionAndPrepare(settings, $swapTrigger, data, swapBoxIn, pageSwap);
			});
		},
		ksSlideSiblings: function(settings, $swapTrigger, data, swapBox, swapBoxIn, pageSwap) {
			swapBox.siblings('ks-ghost-box').remove(); // Remove if still there

			swapBox.wrap('<div class="ks-ghost-box" style="height: ' + swapBox.outerHeight(true) + 'px"></div>');
			ksMethods.ksPositionAndPrepare(settings, $swapTrigger, data, swapBoxIn);
		},
		ksPositionAndPrepare: function(settings, $swapTrigger, data, swapBoxIn, pageSwap) {
			var $swapBox = $(settings.swapBox), // redefine $swapBox variable
				swapBoxId = $swapBox.attr('id'),
				mainOffset = $swapBox.position(),
				mainWidth = $swapBox.width(),
				mainMarginLeft = $swapBox.css('margin-left'),
				mainMarginRight = $swapBox.css('margin-left'),
				swapBoxLeftAbsolute = mainOffset.left + parseFloat(mainMarginLeft);
				swapBoxRightAbsolute = mainOffset.left + parseFloat(mainMarginLeft) + mainWidth - parseFloat(mainMarginRight),
				$swapBoxIn = $('#' + swapBoxIn),
				loadSelector = $swapTrigger.attr('data-ks-load-selector');

			if (settings.outerWidth) {
				var mainWidth = $swapBox.outerWidth();
			}

			if (pageSwap) {
				var	htmlId = data.match(/<\/*html\s+.*id="([^"].*)".*>/), // exclude html classes
					bodyId = data.match(/<\/*body\s+.*id="([^"].*)".*>/), // exclude body classes
					htmlClass = data.match(/<\/*html\s+.*class="([^"].*)".*>/), // exclude html classes
					bodyClass = data.match(/<\/*body\s+.*class="([^"].*)".*>/), // exclude body classes
					pageTitle = data.match(/<\/*title>(.*)<\/title>/); // exclude page title
			}

			$swapBox
			.addClass('ks-swap-box-out')
			.css({
				position: 'absolute',
				top: mainOffset.top,
				left: swapBoxLeftAbsolute,
				marginLeft: 0,
				width: mainWidth,
			});

			if (swapBoxInContents = $(data).filter('#' + swapBoxId).html() != undefined) { // Check if we have to use .filter or .find to get the data
				if (settings.loadBox) {
					var swapBoxInContainer = $(data).filter(settings.loadBox);
				} else if (loadSelector) {
					var swapBoxInContainer = $(data).filter(loadSelector);
				} else {
					var swapBoxInContainer = $(data).filter('#' + swapBoxId);
				}
				swapBoxInContents = swapBoxInContainer.html();
				var swapBoxInClasses = swapBoxInContainer.attr('class');
			} else {
				if (settings.loadBox) {
					var swapBoxInContainer = $(data).find(settings.loadBox);
				} else if (loadSelector) {
					var swapBoxInContainer = $(data).find(loadSelector);
				} else {
					var swapBoxInContainer = $(data).find('#' + swapBoxId);
				}
				swapBoxInContents = swapBoxInContainer.html();
				var swapBoxInClasses = swapBoxInContainer.attr('class');
			}

			$swapBoxIn
			.addClass(swapBoxInClasses) // add the swapBoxIn classes
			.css({
				position: settings.positionType,
				marginLeft: 0,  // Set the margin to 0 because the swapBox was positioned in place
				top: mainOffset.top,
				left: swapBoxLeftAbsolute,
			})
			.html(swapBoxInContents); // Attach the contents to the target temp container

			var swapBoxInImages = $swapBoxIn.find('img'); // Check if there are images in the swapIn box
			var count = 0;

			if (swapBoxInImages.length && settings.preloadImages == true) {
				swapBoxInImages.on('load', function() {
					count++;
			        if (count == swapBoxInImages.length){
						$(document).trigger('ksLoadCallback'); // Trigger the ksLoad callback event
			        	ksMethods.ksSwapContent(settings, swapBoxIn, $swapTrigger, mainOffset, swapBoxLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap);
			        }
				});
			} else {
				$(document).trigger('ksLoadCallback'); // Trigger the ksLoad callback event
				ksMethods.ksSwapContent(settings, swapBoxIn, $swapTrigger, mainOffset, swapBoxLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap);
			}
		},
		// Swap the content
		ksSwapContent: function(settings, swapBoxIn, $swapTrigger, mainOffset, swapBoxLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap) {
			var $swapBox = $(settings.swapBox), // redefine $swapBox variable
				swapBoxId = $swapBox.attr('id'),
				$swapBoxIn = $('#' + swapBoxIn),
				swapBoxInHeight = $swapBoxIn.outerHeight(),
				swapBoxInWidth = $swapBoxIn.outerWidth(),
				swapBoxHeight = $swapBox.outerHeight(),
				viewportHeight = $(window).outerHeight(),
				viewportWidth = $(window).outerWidth(),
				hash = $swapTrigger.prop('hash');

			clearTimeout(loadTimer);
			ksMethods.ksRemoveLoadBox();

			if (settings.direction) {
				$swapBoxIn.css({width: mainWidth});

				var swapBoxOutAnimProperties = {}, swapBoxInAnimProperties = {};
				// Define animation value
				var swapBoxOutAnimValue;
				switch (swapBoxIn) {
					case 'ks-swap-box-in-b-pushstate':
				    case 'ks-swap-box-in-t':
						$swapBoxIn.css('top', -swapBoxInHeight * 2);
				    	swapBoxOutAnimValue = viewportHeight * 3;
				    	break;
				    case 'ks-swap-box-in-t-pushstate':
				    case 'ks-swap-box-in-b':
						$swapBoxIn.css('top', swapBoxHeight * 1.5);
				    	swapBoxOutAnimValue = -swapBoxHeight * 1.5;
				    	break;
				    case 'ks-swap-box-in-r-pushstate':
				    case 'ks-swap-box-in-l':
						$swapBoxIn.css('left', -viewportWidth);
				    	swapBoxOutAnimValue = viewportWidth;
				    	break;
				    case 'ks-swap-box-in-l-pushstate':
				    case 'ks-swap-box-in-r':
						$swapBoxIn.css('left', viewportWidth);
				    	swapBoxOutAnimValue = -viewportWidth;
				    	break;
			        default:
						alert('Kool Swap Error: \n The swapBoxIn class is in an undefined format: ' + swapBoxIn + '.');
			        	return false;
			        	break;
				}

				switch (settings.direction) {
				    case 'left-to-right':
				    case 'right-to-left':
						var finalInDuration = settings.inDuration,
							finalOutDuration = settings.outDuration;

						swapBoxOutAnimProperties = {left: swapBoxOutAnimValue};
						swapBoxInAnimProperties = {left: swapBoxLeftAbsolute};

						$swapBoxIn.css('top', mainOffset.top);
						$('body') // Prevent horizontal scrollbars on animation
						.css({
							overflowX: 'hidden',
							overflowY: 'scroll',
						});
			        	break;
				    case 'top-to-bottom':
				    case 'bottom-to-top':
						/* Every page wants to reach the end position in the defined space of time (duration).
						 * This causes that high pages (based on the height in pixels after all content were loaded)
						 * seem to animate faster than low pages.
						 * I thought about a work around and came to the formula DURATION + (HEIGHT OF THE SWAP (IN) BOX / DURATION * 100)
						 * This calculates a final in-duration value that seems to work fine.
						 */

				    	var additionValue = (swapBoxHeight * settings.inDuration / 1000);
				    	var finalVal = additionValue / 100;
						var finalInDuration = settings.inDuration + finalVal;
						var	finalOutDuration = settings.outDuration;

						swapBoxInAnimProperties = {top: mainOffset.top};
						swapBoxOutAnimProperties = {top: swapBoxOutAnimValue};

						$('body').css('overflow-y', 'scroll'); // Prevent vertical scrollbars on animation
			        	break;
				}

				// slide bouncingBoxes
				var swapBoxInFullHeight = $swapBoxIn.outerHeight(true);
				if ($swapBox.parent('.ks-ghost-box')) {
					$ghostBox = $swapBox.parent('.ks-ghost-box');

					$ghostBox
					.animate({
						height: swapBoxInFullHeight,
					});
				}

				$swapBox
				.stop()
				.show()
				.animate(
					swapBoxOutAnimProperties, finalOutDuration, settings.outEasing, function() {
						$(this).remove();
						if (pageSwap) {
							$(document).scrollTop(0); // Scroll the page to top to avoid flickering
							ksMethods.ksSwitchClasses(htmlId, bodyId, htmlClass, bodyClass, pageTitle);
//							ksMethods.ksCheckForSiblings(settings, pageSwap); // This forced a twiced triggering of ksCheckForSiblings
						}
					});

				$swapBoxIn
				.stop()
				.show()
				.animate(
					swapBoxInAnimProperties, finalInDuration, settings.inEasing, function() {
						$ghostBox.remove(); // Remove the ghost box created for bouncingBox sliding
						$(this)
						.css({display: '', left: '', marginLeft: '', position: '', top: '', width: '',}) // Reset all setted styles
						.attr('id', swapBoxId) // Give the swapBox id back to the final animated swapBoxIn
						.removeClass('ks-swap-box-in');

						ksMethods.animationCallback(hash, settings, pageSwap);
					});
			} else {
				$swapBox
				.animate({opacity: 0}, settings.outDuration, function() {
					$(this).remove(); // remove the $swapBox container
					if (pageSwap) {
						ksMethods.ksSwitchClasses(htmlId, bodyId, htmlClass, bodyClass, pageTitle);
					}
					$swapBoxIn
					.css({display: '', left: '', marginLeft: '', opacity: 0, position: '', top: '', width: '',}) // Reset all setted styles
					.animate({opacity: 1}, settings.inDuration, function() {
						ksMethods.animationCallback(hash, settings, pageSwap);
					})
					.attr('id', swapBoxId).removeClass('ks-swap-box-in');
				});
			}
		},
		animationCallback: function(hash, settings, pageSwap) {
			if (hash) {
				$('html:not(:animated),body:not(:animated)').animate({scrollTop: $(hash).offset().top },'normal');
			}
			ksMethods.ksCheckForSiblings(settings, pageSwap);
		},
		ksCheckForSiblings: function(settings, pageSwap) {
			if (settings.bouncingBoxes) {
				$(document)
				.find(settings.bouncingBoxes)
					.animate({opacity: 1}, 400, function() {
						(pageSwap == true ? ksMethods.ksSwapCallback() : ksMethods.ksSwapSectionCallback());
					});
			} else {
				(pageSwap ? ksMethods.ksSwapCallback() : ksMethods.ksSwapSectionCallback());
			}
		},
		ksSwitchClasses : function(htmlId, bodyId, htmlClass, bodyClass, pageTitle) {
			$('html, body').attr({ // remove ids and classes from html and body
				'class': '',
				'id' : '',
			});
			(htmlId ? $('html').attr('id', htmlId[1]) : ''); // Add IDs from the target page
			(bodyId ? $('body').attr('id', bodyId[1]) : ''); // Add IDs from the target page
			(htmlClass ? $('html').addClass(htmlClass[1]) : ''); // Add classes from the target page
			(bodyClass ? $('body').addClass(bodyClass[1]) : ''); // Add classes from the target page
			(pageTitle ? $('title').text(pageTitle[1]) : '');
		},
		ksCreateLoadBox: function() {
			if (!$('#ks-loading-box').length) {
				loadTimer = setTimeout(function() { // Show the loading box if the loadings of contents takes longer than 200ms
					$('html').append('<div id="ks-loading-box"><div class="ks-loading"></div></div>');
					$('#ks-loading-box').fadeIn('fast');
				}, 200);
			} else {
				ksMethods.ksRemoveLoadBox();
				ksMethods.ksCreateLoadBox();
			}
		},
		ksRemoveLoadBox: function() {
			$('#ks-loading-box').fadeOut('fast').remove();
		},
		ksSwapCallback: function() {

// Here we put our Piche script

			//realizetie projekti masonry horizontal layout

			$('.page-node-497 #isotope-container').isotope({
				layoutMode: 'masonryHorizontal',
				itemSelector: '.page-node-497 .isotope-element',
			});

			//filter menu animation

			$( "#piche-left-sidebar" ).mouseenter( function(){
				// $( "#piche-content" ).css({
				// 	"z-index" : "-1"
				// });
				$(".isotope-options li").css({ 'overflow' : 'inherit', 'width' : '300px' });
				$("#piche-left-sidebar").animate({width: '300px'});
				$("#block-menu-menu-pievienot-realiz-to-projekt a").css({ 'visibility' : 'visible'});
			});

			$( "#piche-left-sidebar" ).mouseleave( function(){
				// $( "#piche-content" ).css({
				// 	"z-index" : "1"
				// });
				$("#piche-left-sidebar").animate({width: '50px'});
				$(".isotope-options li").css({ 'overflow' : 'hidden', 'width' : '50px' });
				$("#block-menu-menu-pievienot-realiz-to-projekt a").css({ 'visibility' : 'hidden'});
			});

			/*add classes for isotope filter*/
			$(".isotope-filters > li").addClass(function(i){return "item" + (i + 1);});
			$(".isotope-filters > li").addClass(function(i){return "item_filter";});
			$('.item_filter').prepend('<div id="filter_image">');

			//first menu buttons add class for lazylinepainter

			$("#block-menu-menu-front-page-buttons li.first a").each(function(i){
				$(this).attr('id', 'button_kalk');
			});

			$("#block-menu-menu-front-page-buttons li.last a").each(function(i){
				$(this).attr('id', 'button_burg');
			});

			//call lazylinepainter

			var pathObj0 = {
				"button_kalk": {
					"strokepath": [
						{"path":"M122.49947285655699,38.77000749973021C125.72911859321594,38.77512167739869,128.346,41.395158203125,128.346,44.626000000000005C128.346,44.626000000000005,128.346,135.481,128.346,135.481C128.346,138.715,125.724,141.337,122.49000000000001,141.337C122.49000000000001,141.337,57.114,141.337,57.114,141.337C53.879999999999995,141.337,51.257999999999996,138.71499999999997,51.257999999999996,135.481C51.257999999999996,135.481,51.257999999999996,44.626,51.257999999999996,44.626C51.257999999999996,41.391999999999996,53.879999999999995,38.769999999999996,57.114,38.769999999999996C57.114,38.769999999999996,122.481,38.769999999999996,122.481,38.769999999999996", "duration": 200},
						{"path":"M113.817472856557,47.452007499730215C117.04711859321596,47.45712167739868,119.664,50.077158203124995,119.664,53.308C119.664,53.308,119.664,66.025,119.664,66.025C119.664,69.259,117.042,71.881,113.808,71.881C113.808,71.881,65.796,71.881,65.796,71.881C62.562000000000005,71.881,59.940000000000005,69.259,59.940000000000005,66.025C59.940000000000005,66.025,59.940000000000005,53.308,59.940000000000005,53.308C59.940000000000005,50.074,62.562000000000005,47.452,65.796,47.452C65.796,47.452,113.808,47.452,113.808,47.452", "duration": 200},
						{"path":"M59.94277380752563,83.70400000000001C60.177008056640624,83.704,75.168,83.704,75.168,83.704", "duration": 200},
						{"path":"M81.28777398967742,83.70400000000001C81.52202362060547,83.704,96.514,83.704,96.514,83.704", "duration": 200},
						{"path":"M102.63377380752564,83.70400000000001C102.86800805664063,83.704,117.859,83.704,117.859,83.704", "duration": 200},
						{"path":"M59.94277380752563,94.376C60.177008056640624,94.376,75.168,94.376,75.168,94.376", "duration": 200},
						{"path":"M81.28777398967742,83.70400000000001C81.52202362060547,83.704,96.514,83.704,96.514,83.704", "duration": 200},
						{"path":"M81.28777398967742,83.70400000000001C81.52202362060547,83.704,96.514,83.704,96.514,83.704", "duration": 200},
						{"path":"M81.28777398967742,94.376C81.52202362060547,94.376,96.514,94.376,96.514,94.376", "duration": 200},
						{"path":"M102.63377380752564,94.376C102.86800805664063,94.376,117.859,94.376,117.859,94.376", "duration": 200},
						{"path":"M59.94277380752563,105.049C60.177008056640624,105.049,75.168,105.049,75.168,105.049", "duration": 200},
						{"path":"M81.28777398967742,105.049C81.52202362060547,105.049,96.514,105.049,96.514,105.049", "duration": 200},
						{"path":"M102.63377380752564,105.049C102.86800805664063,105.049,117.859,105.049,117.859,105.049", "duration": 200},
						{"path":"M59.94646766376495,115.722C60.49262969970703,115.722,95.447,115.722,95.447,115.722", "duration": 200},
						{"path":"M59.94646766376495,126.39500000000001C60.49262969970703,126.395,95.447,126.395,95.447,126.395", "duration": 200},
						{"path":"M102.63377380752564,126.39500000000001C102.86800805664063,126.395,117.859,126.395,117.859,126.395", "duration": 200},
						{"path":"M89.81060623911414,3.5760004486364405C136.80881857853012,3.580900413680822,176.279,43.72282794189453,176.279,90.053C176.279,137.813,137.562,176.53,89.80199999999999,176.53C42.04199999999997,176.53,3.325,137.813,3.325,90.053C3.325,42.293000000000006,42.042,3.576,89.802,3.576", "duration": 200}



						],
						"dimensions": {
								"width": 210,
								"height": 210
						}
				}
			};

			var pathObj1 = {
				"button_burg": {
					"strokepath": [
						{"path":"M145.939,78.36603232097625C145.939,78.87543182373047,145.939,111.477,145.939,111.477C145.939,111.477,104.745,122.682,104.745,122.682C104.745,122.682,36.014,115.387,36.014,115.387C36.014,115.387,36.014,70.787,36.014,70.787C36.014,70.787,63.348,57.318,63.348,57.318C63.348,57.318,104.547,58.903,104.547,58.903C104.547,58.903,146.317,78.969,146.317,78.969", "duration": 420},
						{"path":"M104.547,58.90591196787358C104.547,59.40030024719238,104.547,122.682,104.547,122.682", "duration": 420},
						{"path":"M146.13442339611052,89.54231527805328C145.49461688232424,89.40004888916016,104.547,80.295,104.547,80.295", "duration": 420},
						{"path":"M146.13442339611052,100.15327923870086C145.49461688232424,100.17685955810548,104.547,101.686,104.547,101.686", "duration": 420},
						{"path":"M36.01712902200222,85.64175587117673C36.54836833190919,85.60030815124512,104.547,80.295,104.547,80.295", "duration": 420},
						{"path":"M104.54387097799778,101.68005456030369C104.01263166809082,101.68931770324707,36.014,102.875,36.014,102.875C36.014,102.875,52.058,102.875,52.058,102.875C52.058,102.875,52.058,116.989,52.058,116.989C52.058,116.989,52.058,62.882,52.058,62.882", "duration": 420},
						{"path":"M77.015,57.71683188521862C77.015,58.197623886108396,77.015,119.739,77.015,119.739", "duration": 420},
						{"path":"M89.05965329675018,3.0510004510950903C136.31484482284634,3.055927269268781,176,43.4178433227539,176,90C176,138.02,137.072,176.949,89.051,176.949C41.03,176.949,2.102,138.02,2.102,90C2.102,41.97999999999999,41.031,3.051,89.051,3.051", "duration": 420},
					],
					"dimensions": {
						"width": 220,
						"height": 219
					}
				}
			};

			$('#button_kalk').lazylinepainter(
			{
			"svgData": pathObj0,
			"strokeWidth": 3,
			"strokeColor": "#fff"
			}).lazylinepainter('paint');

			$('#button_burg').lazylinepainter(
			{
				"svgData": pathObj1,
				"strokeWidth": 3,
				"strokeColor": "#fff"
			}).lazylinepainter('paint');

			var $container = $('.page-node-498 #isotope-container'),
			  colWidth = function () {
			    var w = $container.width(),
			      columnNum = 1,
			      columnWidth = 0;
			    if (w > 1500) {
			      columnNum  = 6;
			    } else if (w > 1200) {
			      columnNum  = 5;
			    } else if (w > 900) {
			      columnNum  = 4;
			    } else if (w > 600) {
			      columnNum  = 3;
			    } else if (w > 300) {
			      columnNum  = 2;
			    }
			    columnWidth = Math.floor(w/columnNum);
			    $container.find('.page-node-498 .isotope-element').each(function() {
			      var $item = $(this),
			        multiplier_w = 2,
			        multiplier_h = $item.attr('class').match(/item-h(\d)/),
			        width = multiplier_w ? columnWidth*multiplier_w[1]-4 : columnWidth-4,
			        height = 100;
			      $item.css({
			        width: width,
			        height: height
			      });
			    });
			    return columnWidth;
			  },
			  isotope = function () {
			    $container.isotope({
			      itemSelector: '.page-node-498 .isotope-element',
			      masonry: {
			        columnWidth: colWidth()
			      }
			    });
			  };
			  isotope();
			  $(window).on('debouncedresize', isotope);


//end of Piche script

			$('body').css({
				// overflowY: 'auto',
				overflowX: 'auto',
			}); // Prevent scrollbars on animation
			$(document).trigger('ksSwapCallback'); // Trigger the swap callback event
		},
		ksSwapSectionCallback: function() {
			$(document).trigger('ksSwapSectionCallback'); // Trigger the swap callback event
		},
	};

	$.koolSwap = function(method) {
		if (ksPageSwap[method]) {
			return ksPageSwap[method].apply($(window), Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return ksPageSwap.init.apply($(window), arguments, false);
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.KoolSwap' );
		}
	};

	$.fn.koolSwap = function(method) {
		if (ksSelectorSwap[method]) {
			return ksSelectorSwap[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return ksSelectorSwap.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.KoolSwap' );
		}
	};
})( jQuery );
