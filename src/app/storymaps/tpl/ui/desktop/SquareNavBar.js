define([
        "lib-build/css!./SquareNavBar",
        "storymaps/common/utils/CommonHelper"
    ],
	function(
		viewCss,
		CommonHelper
	){
		return function SquareNavBar(container, navigationCallback)
		{
			var _this = this,
				_params = null,
				_nbSections = null;

			this.init = function(params)
			{
				_params = params;
				_params.sections = _params.sections || [];
				_params.tooltipPosition = _params.tooltipPosition || "right";

				_nbSections = params.sections.length;

				render(params.sectionIndex || 0);
				setColor();

				initEvents();
			};

			this.setActive = function(index)
			{
				if ( ! _nbSections )
					return;

				if ( ! container.find('.square[data-index='+index+']').length ){
					render(index);
					return;
				}

				container.find('.square').removeClass('active');
				container.find('.square[data-index='+index+']').addClass('active');

        /* These two statements are meaningless since we've decided in advance to have 5 key sections. Keeping them for future cases where that may change. */
				container.find('.navSquareUp').toggleClass('disabled', index === 0);
				container.find('.navSquareDown').toggleClass('disabled', index == _nbSections - 1);
			};

			this.update = function(params)
			{
				if ( ! _params )
					return;

				params = params || {};

				_params.bgColor = params.bgColor || _params.bgColor;
				_params.tooltipBgColor = params.tooltipBgColor || _params.tooltipBgColor;
				_params.tooltipFontColor = params.tooltipFontColor || _params.tooltipFontColor;
				_params.dotColor = params.dotColor || _params.dotColor;

				setColor();
			};

			this.resize = function()
			{
				//
			};

			this.destroy = function()
			{
				container.off('click');
				container.empty();
			};

			this.updateTooltipPlacement = function(placement)
			{
				container.find('.square').tooltip('destroy').tooltip({
					placement: placement,
					trigger: 'hover'
				});
			};

			function render(sectionIndex)
			{

        var squareHTML = "";

				for(var i=0; i < 5; i++){
					var title = $("<div>" + _params.sections[i].title + "</div>").text();
					squareHTML += '<div class="square" title="' + title + '" data-index="' + i + '">&#32;</div>';
				}



        /* Here's the actual html that drops the dots on the page */
				container.html(
					'<div class="navSquareInner">'
          + squareHTML
          + '</div>'
				);

        /* hover text for the squares */
				container.find('.square').tooltip({
					placement: _params.tooltipPosition,
					trigger: 'hover'
				});

				setColor();

				_this.setActive(sectionIndex);
			}

      /* old colors info. This uses the CommonHelper to add CSS Rules.  */
			function setColor()
			{
				container.css("background-color", _params.bgColor);
				container.find(".square").css("color", _params.dotColor);

				// Tooltip
				CommonHelper.addCSSRule(".navSquares .tooltip-inner { background-color: " + _params.tooltipBgColor + "; color: " + _params.tooltipFontColor + "; }");
				if ( _params.tooltipPosition && _params.tooltipPosition != "left" && _params.tooltipPosition != "right" )
					CommonHelper.addCSSRule(".navSquares .tooltip-arrow { border-top-color: " + _params.tooltipBgColor + " !important; border-bottom-color: " + _params.tooltipBgColor + " !important; }");
				else
					CommonHelper.addCSSRule(".navSquares .tooltip-arrow { border-left-color: " + _params.tooltipBgColor + " !important; border-right-color: " + _params.tooltipBgColor + " !important; }");
			}

			function initEvents()
			{
				container.off('click').click(function(e){
					var target = $(e.target);

					if (target.hasClass('square'))
						navigationCallback($(e.target).data('index'));
				});
			}
		};
	}
);


/*
<div class="square0">
  <a href="#">.</a>
</div>
<div class="square1">
  <a href="#">.</a>
</div>
<div class="square2">
  <a href="#">.</a>
</div>
<div class="square3">
  <a href="#">.</a>
</div>
<div class="square4">
  <a href="#">.</a>
</div>
*/
