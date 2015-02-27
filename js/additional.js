
(function ($) {

	$(window).ready(function() {
		$(".form-item-field-burgera-tips-tid").each(function(i){
			$(this).prepend('<img src="sites/all/themes/software-responsive-theme/images/icons/pin1.png"/>');
			$(this).addClass("burg-filter" +(i+1));
		});
		
        $('input').click(function () {
            $('input:not(:checked)').parent().removeClass("style1");
            $('input:checked').parent().addClass("style1");
        });
        $('input:checked').parent().addClass("style1");				
	});
})(jQuery);

