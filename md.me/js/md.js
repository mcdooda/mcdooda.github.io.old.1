var md = {
	
	init: function() {
		var $ul = $('#links');
		var $li = $ul.find('li');
		var height = Math.ceil($li.length / 2) * 105;
		$ul.height(height);
		$('#descriptions > div').height(height - 125);
		
		$li.css({
			position: 'absolute',
			float:    'none',
			height:    50
		}).append('<span>&#8624; back</span>').addClass('first-half').each(function(k) {
			var left;
			var colClass;
			if (k % 2 == 0) {
				left = 0;
				colClass = 'left-col';
			} else {
				left = 205;
				colClass = 'right-col';
			}
			var top = Math.floor(k / 2) * 105;
			
			var $that = $(this);
			var project = md.getProjectName($that);
			$that.addClass(colClass).css({
				left: left,
				top:  top,
				background: 'url(md.me/img/projects/' + project + '.png) -' + left + 'px -' + top + 'px'
			}).data('left', left).data('top', top);
			
			var $next = $('<li class="second-half"><span>&#8624; back</span></li>');
			$next.addClass(colClass).css({
				left:     left,
				top:      top + 50,
				height:   50,
				position: 'absolute',
				background: 'url(md.me/img/projects/' + project + '.png) -' + left + 'px -' + (top + 50) + 'px'
			}).data('left', left).data('top', top + 50);
			$next.insertAfter($that);
			
			$([$that[0], $next[0]]).click(function() {
				md.show($that, $next);
			});
		});
	},
	
	getProjectName: function($li) {
		return $li.find('a').attr('href').substr(1);
	},
	
	show: function($that, $next) {
		if ($('#links li:animated').length == 0) {
			$('.first-half').each(function() {
				if (this != $that[0]) {
					$(this).fadeOut('slow');
				}
			});
			$('.second-half').each(function() {
				if (this != $next[0]) {
					$(this).fadeOut('slow');
				}
			});
			$('#links li').css({
				'z-index': 0
			});
					
			$([$that[0], $next[0]]).css({
				'z-index': 1,
				'border-radius': '7px'
			}).unbind('click').click(function() {
				md.hide($that, $next);
			});
			
			$that.animate({
				left: 0,
				top: 0,
				'background-position': '0px 0px',
				width: 405
			}, 'slow', function() {
				$(this).addClass('open');
			});
			
			var top = $next.parent().height() - 55;
			$next.animate({
				left: 0,
				top: top,
				'background-position': '0px -' + top + 'px',
				width: 405
			}, 'slow', function() {
				$(this).addClass('open');
				var project = md.getProjectName($that);
				$('#' + project).fadeIn();
			});
		}
	},
	
	hide: function($that, $next) {
		$('#descriptions > div:visible').fadeOut(function() {
			$('.first-half').each(function() {
				if (this != $that[0]) {
					$(this).fadeIn('slow');
				}
			});
			$('.second-half').each(function() {
				if (this != $next[0]) {
					$(this).fadeIn('slow');
				}
			});
		
			var project = md.getProjectName($that);
			
			$([$that[0], $next[0]]).each(function() {
				var left = $(this).data('left');
				var top = $(this).data('top');
				var style = {
					left: left,
					top:  top,
					'background-position': '-' + left + 'px -' + top + 'px',
					width: 200
				};
				if ($(this).hasClass('first-half')) {
					style['border-bottom-left-radius'] = 0;
					style['border-bottom-right-radius'] = 0;
				} else {
					style['border-top-left-radius'] = 0;
					style['border-top-right-radius'] = 0;
				}
				$(this).removeClass('open').animate(style, 'slow', function() {
					$(this).css({
						'z-index': 0
					});
				});
			}).unbind('click').click(function() {
				md.show($that, $next);
			});
		});
	}
	
};

$(md.init);


