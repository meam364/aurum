var isOpen = $('.wrap').hasClass('toggled') ?  true : false;
var mobHide = false;
changeCount();
sidebar();
checkResolution();

$(window).on('load', function() {
	checkResolution();
	hideOnMobile();
});

$(window).on('resize', function() {
	checkResolution();
	hideOnMobile();
});


function sidebar() {
	$('.sidebar__ctrl__in').on('click', function(e) {
		if(e.which === 1) {
			var sidebar = $('.sidebar')
			sidebar.toggleClass('toggle');
			$('.wrap').toggleClass('toggled');
			isOpen = isOpen ? false : true;
			checkResolution();
			$.fn.matchHeight._update()
		}
			return;
	});
}
function hideOnMobile() {
	if(isOpen && $(window).width() < 690) {
		mobHide = true;
		$('.sidebar__ctrl__in').trigger({
			type: 'click',
			which: 1
		});
	}else if(mobHide && $(window).width() > 690) {
		mobHide = false;
		$('.sidebar__ctrl__in').trigger({
			type: 'click',
			which: 1
		});
	}
}
function checkResolution() {

	if(isOpen && $(window).width() < 1000 && $(window).width() > 760) {
		$('.item').css('width', '100%');
		$('.detail').css('width', '100%');
	}else if(!isOpen && $(window).width() < 1000 && $(window).width() > 760) {
		$('.item').css('width', '50%');
		$('.detail').css('width', '50%');
	}
	else {
		$('.item').css('width', '50%');
		$('.detail').css('width', '50%');
	}
}

function changeCount() {
	var el = $('.detail__counter');
	el.on('selectstart', false);

	el.on('mousedown', '.detail__change-num', function() {
		var num = $(this).parent().find('.detail__count');

		var current = num.text();

		if($(this).data('change-num') === '+') {
			current++;
			num.text(current)
		}else if($(this).data('change-num') === '-') {
			current--;
			if(current < 0) {
				current= 0;
			}
			num.text(current);
		}
	})
}

