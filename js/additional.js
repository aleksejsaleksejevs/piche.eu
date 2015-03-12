
(function ($) {

	$(window).ready(function() {



		//changed scrollTop to scrollLeft

		var step = 25;
		var scrolling = false;

		// Wire up events for the 'scrollUp' link:
		$("#projects-left img").bind("click", function(event) {
		    event.preventDefault();
		    // Animates the scrollTop property by the specified
		    // step.
		    $(".view-realiz-tie-projekti .view-content").animate({
		        scrollLeft: "-=" + step + "px"
		    });
		}).bind("mouseover", function(event) {
		    scrolling = true;
		    scrollContent("left");
		}).bind("mouseout", function(event) {
		    scrolling = false;
		});


		$("#projects-right img").bind("click", function(event) {
		    event.preventDefault();
		    $(".view-realiz-tie-projekti .view-content").animate({
		        scrollLeft: "+=" + step + "px"
		    });
		}).bind("mouseover", function(event) {
		    scrolling = true;
		    scrollContent("right");
		}).bind("mouseout", function(event) {
		    scrolling = false;
		});

		function scrollContent(direction) {
		    var amount = (direction === "left" ? "-=5px" : "+=5px");
		    $(".view-realiz-tie-projekti .view-content").animate({
		        scrollLeft: amount
		    }, 1, function() {
		        if (scrolling) {
		            scrollContent(direction);
		        }
		    });
		}

		// $('#main-menu').visualNav({
			// // target the .menu class in the menu
			// link : 'ul.menu'
		// });  ///////////////////////////////////not('.menu-navigation-container .menu ul li.last').

		$("#block-menu-menu-front-page-buttons li.first a").each(function(i){
		// $(".form-item-field-burgera-tips-tid label").each(function(i){
			// $(this).prepend('<img src="sites/all/themes/software-responsive-theme/images/icons/pin1.png"/>');
			// $(this).addClass("burg-filter" +(i+1));
			$(this).attr('id', 'button_kalk');
		});

		$("#block-menu-menu-front-page-buttons li.last a").each(function(i){
			$(this).attr('id', 'button_burg');
		});

		$('.jspDrag').each(function(i){
			$(this).prepend('<img src="sites/all/themes/software-responsive-theme/images/scrollmiddle.png" />');
		});

		$(function()
		{
			$('.group-left').jScrollPane();
		});



		// $(".background").each(function(i){
			// $(this).prepend('<img src="sites/all/themes/software-responsive-theme/images/icons/pin1.png"/>');
			// $(this).addClass("burg-filter" +(i+1));
		// });

        $('input').click(function () {
            $('input:not(:checked)').parent().removeClass("style1");
            $('input:checked').parent().addClass("style1");
        });
        $('input:checked').parent().addClass("style1");
	});


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

	$(document).ready(function(){
		$('#button_kalk').lazylinepainter(
		{
		"svgData": pathObj0,
		"strokeWidth": 3,
		"strokeColor": "#fff"
		}).lazylinepainter('paint');
	});

	$(document).ready(function(){
		$('#button_burg').lazylinepainter(
		{
			"svgData": pathObj1,
			"strokeWidth": 3,
			"strokeColor": "#fff"
		}).lazylinepainter('paint');



		$("#videojs-479-field-presentation-video-video").prop('muted', true);
		$("#videojs-478-field-presentation-video-video").prop('muted', true);


	});


})(jQuery);
