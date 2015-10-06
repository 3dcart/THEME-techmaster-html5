jQuery(function () {
	// see whether device supports touch events (a bit simplistic, but...)
	var hasTouch = ("ontouchstart" in window);
	var iOS5 = /iPad|iPod|iPhone/.test(navigator.platform) && "matchMedia" in window;
	 
	// hook touch events for drop-down menus
	// NB: if has touch events, then has standards event handling too
	if (hasTouch && document.querySelectorAll) {
		var i, len, element,
			dropdowns = document.querySelectorAll("#navbar > li > a");
	 
		function menuTouch(event) {
			// toggle flag for preventing click for this link
			var i, len, noclick = !(this.dataNoclick);
	 
			// reset flag on all links
			for (i = 0, len = dropdowns.length; i < len; ++i) {
				dropdowns[i].dataNoclick = false;
			}
	 
			// set new flag value and focus on dropdown menu
			this.dataNoclick = noclick;
			this.focus();
		}
	
		function menuClick(event) {
			// if click isn't wanted, prevent it
			if (this.dataNoclick) {
				event.preventDefault();
			}
		}
	 
		for (i = 0, len = dropdowns.length; i < len; ++i) {
			element = dropdowns[i];
			element.dataNoclick = false;
			element.addEventListener("touchstart", menuTouch, false);
			element.addEventListener("click", menuClick, false);
		}
	}

	hiConfig = {
			sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
			interval: 250, // number = milliseconds for onMouseOver polling interval
			timeout: 200, // number = milliseconds delay before onMouseOut
			over: function() {
				jQuery(this).removeClass("top-level");
				jQuery(this).addClass("top-level_over");
				jQuery(this).find(".test").css('display' , '');
			}, 
			out: function() { 
				jQuery(this).removeClass("top-level_over");
				jQuery(this).addClass("top-level");
				jQuery(this).find(".test").css('display' , 'none');
		},
	};	
	jQuery("#navbar > li").each(function() {
		jQuery(this).hoverIntent(hiConfig);

//		jQuery(this).find(".flyout .close").handleCancel(evt);
	  // onMouseOver="this.className='top-level_over'; OpenDiv('flyout-container')" onMouseOut="this.className='top-level'"
	});
	jQuery(".flyout .close").on('click', function () {
		jQuery("#navbar > li").removeClass("top-level_over");
		jQuery("#navbar > li").addClass("top-level");
		jQuery("#navbar .test").css('display' , 'none');
	});
});

jQuery(function () {
    /* IE Fix for the use of attribute ='placeholder' */
    if (!jQuery.support.placeholder) {
        var active = document.activeElement;

        jQuery(':text').focus(function () {
            if (jQuery(this).attr('placeholder') != '' && jQuery(this).val() == jQuery(this).attr('placeholder')) {
                jQuery(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if (jQuery(this).attr('placeholder') != '' && (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder'))) {
                jQuery(this).val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });
        jQuery(':text').blur();

        jQuery(active).focus();
    }


    resizeMainContent();

	if (jQuery(window).width() <= 980) {
//		jQuery('#MOBILE-NAV .nav-links2').html(jQuery('.nav-links').html());
		jQuery('.menu-links').appendTo('#MOBILE-MENU');
		jQuery('.welcome').appendTo('#MOBILE-WELCOME');
	}
	if (jQuery(window).width() > 980) {
		jQuery('.menu-links').appendTo('#FULL_MENU');
		jQuery('.welcome').appendTo('#FULL_WELCOME');
	}
	if (jQuery(window).width() <= 768) {
	}
	if (jQuery(window).width() > 768) {
	}


    /* On the window resize event. */
    jQuery(window).resize(function () {
                
        if (jQuery(window).width() <= 980) {
//			jQuery('#MOBILE-NAV .nav-links2').html(jQuery('.nav-links').html());
			jQuery('.menu-links').appendTo('#MOBILE-MENU');
			jQuery('.welcome').appendTo('#MOBILE-WELCOME');
            resizeMainContent();
		}
        if (jQuery(window).width() > 980) {
			jQuery('.menu-links').appendTo('#FULL_MENU');
			jQuery('.welcome').appendTo('#FULL_WELCOME');
            resizeMainContent();
		}
		if (jQuery(window).width() <= 768) {
		}
		if (jQuery(window).width() > 768) {
		}
    });

    /* On the device orientation change event. */
    jQuery(window).bind('orientationchange', function (event) {

        if (jQuery(window).width() <= 980) {
//			jQuery('#MOBILE-NAV .nav-links2').html(jQuery('.nav-links').html());
			jQuery('.menu-links').appendTo('#MOBILE-MENU');
			jQuery('.welcome').appendTo('#MOBILE-WELCOME');
            resizeMainContent();
		}
        if (jQuery(window).width() > 980) {
			jQuery("#mobileMenu").removeAttr('style');
			jQuery('.menu-links').appendTo('#FULL_MENU');
			jQuery('.welcome').appendTo('#FULL_WELCOME');
            resizeMainContent();
		}
        if (jQuery(window).width() <= 768) {
            resizeMainContent();
		}
        if (jQuery(window).width() > 768) {
			jQuery("#mobileMenu").removeAttr('style');
            resizeMainContent();
		}
		if (jQuery(window).width() <= 768) {
			jQuery('#TAB_ICONS .icons-data').prependTo('#MOBILE_ICONS');
		}
		if (jQuery(window).width() > 768) {
			jQuery('#MOBILE_ICONS .icons-data').prependTo('#TAB_ICONS');
		}
    });

    /* Initiates toggle for slide out menu */
/*
    jQuery('a#slideMenu').on('click', function () {
        jQuery('#mobileMenu').css({
            'display': 'block',
            '-webkit-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)'
        });
    });

    jQuery('a#closeSlideMenu').on('click', function () {
        jQuery('#mobileMenu').css({
            'display': 'none',
            '-webkit-transform': 'translate3d(-100%, 0, 0)',
            'transform': 'translate3d(-100%, 0, 0)'
        });
    });
*/


    /* Initiates <select> for Sub-Category & Blog menus at a specified width. */
    if (jQuery(window).width() <= 768) {

        jQuery('#blog .blogNav ul').each(function () {
            var list = jQuery(this),
            select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

            jQuery('>li a', this).each(function () {
                var target = jQuery(this).attr('target'),
                option = jQuery(document.createElement('option'))
                 .appendTo(select)
                 .val(this.href)
                 .html(jQuery(this).html())
                 .click(function () {
                 });
            });
            list.remove();
        });

        jQuery('#blog .blogNav select:eq(0)').prepend('<option> --- Select Category ---</option>');
        jQuery('#blog .blogNav select:eq(1)').prepend('<option> --- Select Recent Posts ---</option>');
        jQuery('#blog .blogNav select:eq(2)').prepend('<option> --- Select Archives ---</option>');

//        jQuery('#subcategoriesBlock select').prepend('<option> --- Select Sub-Category ---</option>');

        jQuery('#blog .blogNav select').change(function () {
            window.location.href = jQuery(this).val();
        });
    }
    else {
        return;
    }

});

function resizeMainContent() {
    /* Site content section resizing depending on Left Bar or Right Bar is enabled. */
    var sw = jQuery('#mainContainer').width();
    var mcElem = jQuery('#midContent');
    var lbElem = jQuery('#leftContent');
    var rbElem = jQuery('#rightContent');
    var lb = (lbElem.length > 0 && lbElem.css("display") != 'none') ? lbElem.outerWidth(true) : 0;
    var rb = (rbElem.length > 0 && rbElem.css("display") != 'none') ? rbElem.outerWidth(true) : 0;
    var mw = sw - (lb + rb);

    var hsWidth = jQuery('.hs-item').width();
    jQuery('.hs-item .img').css('width', hsWidth + 'px');

    if (lbElem.length == 0 || rbElem.length == 0) {
        if (lbElem.length == 0 && rbElem.length == 0) {
            jQuery('#midContent').css('width', '100%');
        }
        else {
            jQuery('#midContent').css('width', mw + 'px');
        }
    }
    else {
        jQuery('#midContent').css('width', '100%');
    }

    if ((lbElem.css('display') == 'none' && rbElem.css('display') == 'none')) {
        jQuery('#midContent').css('width', '100%');
    }
    else {
        if ((lbElem.css('display') == 'block' || rbElem.css('display') == 'block')) {
            jQuery('#midContent').css('width', mw + 'px');
        }
    }
	
    /* Creates mobile/tablet left Slide Menu. */
    var menuLeft = document.getElementById('mobileMenu'),
        body = document.body;

    jQuery('#slideMenu').on('click', function () {
        jQuery('#mobileMenu').addClass('cbp-spmenu-open');
		jQuery('.hidden-mobile-bg').show();
    });	

    jQuery('#slideMenu2').on('click', function () {
        jQuery('#mobileMenu').addClass('cbp-spmenu-open');
		jQuery('.hidden-mobile-bg').show();
    });	

    jQuery('#closeSlideMenu').on('click', function () {
        jQuery('#mobileMenu').removeClass('cbp-spmenu-open');
		jQuery('.hidden-mobile-bg').hide();
    });	

	var mouse_is_inside = false;
	jQuery(document).ready(function()
	{
		jQuery('#mobileMenu').hover(function(){
			mouse_is_inside=true;
		}, function(){
			mouse_is_inside=false;
		});
		jQuery(document).mouseup(function(){
			if(!mouse_is_inside) jQuery('#mobileMenu').removeClass('cbp-spmenu-open');
			if(!mouse_is_inside) jQuery('.hidden-mobile-bg').hide();
		});
	});

	/* Equal heights on product dispays. */
	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	
	if (jQuery('.product-item .name').length > 0) {
	
		jQuery('.product-item .name').each(function () {
	
			$el = jQuery(this);
			topPostion = $el.position().top;
	
			if (currentRowStart != topPostion) {
	
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
	
				rowDivs.length = 0;
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
	
			} else {
	
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
	
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
	
		});
	}
}

jQuery("#Show-Brands").click(function() {
	jQuery("#Brands-List").slideToggle("fast")
});
jQuery(document).mouseup(function (e)
{
	var container1 = jQuery("#Brands_items");
	var container2 = jQuery("#Brands-List");

	if (container1.has(e.target).length === 0)
	{
		container2.hide();
	}
});

jQuery("#Show-Brands2").click(function() {
	jQuery("#Brands-List2").slideToggle("fast")
});
jQuery(document).mouseup(function (e)
{
	var container3 = jQuery("#Brands_items2");
	var container4 = jQuery("#Brands-List2");

	if (container3.has(e.target).length === 0)
	{
		container4.hide();
	}
});

jQuery("#mobileSearch").click(function() {
	if (jQuery(window).width() > 768) {	
		jQuery("#mobile_Search").slideToggle("fast")
	}
});
jQuery(document).mouseup(function (e)
{
	var container5 = jQuery("#mobile-Search-Area");
	var container6 = jQuery("#mobile_Search");

	if (container5.has(e.target).length === 0)
	{
		container6.hide();
	}
});

jQuery(function () {
	if (jQuery(window).width() <= 768) {
	
		jQuery(".footer-titles").click(function() {
			jQuery(this).toggleClass('active');
			jQuery(this).next().slideToggle("fast");
		});
	}
});