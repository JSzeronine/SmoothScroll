

( function( $window, $document, $ ){

    var scroll = ( function(){

        var _option = {
            spec : 30,          // 간격
            mTime : 0.5         // 시간
        };

        function Show( $option )
        {
            _option = $.extend( _option, $option );

            create();
            addEvent();
        }

        var _w;
        var _d;
        var _b;
        function create()
        {
            _w = $( $window );
            _d = $( $document );
            _b = $( "html, body" );
            
            Init();
        }

        var _sData = {
            sT : 0,             // 스크롤값
            max : 0,            // 최대값
            min : 0             // 최소값
        };
        
        function Init()
        {
            _sData.sT = _w.scrollTop();
            _sData.max = _d.height() - _w.height();
            _sData.min = 0;
        }

        var _isInitScroll = false;
        function scrollListener( $e )
        {
            if( !_isInitScroll && _w.scrollTop() > 0 )
            {
                _sData.sT = _w.scrollTop();
                _isInitScroll = true;
            }

            $( App.scroll ).trigger( "SCROLL_EVENT", _w.scrollTop() );
        }

        function addEvent()
        {
            _w.on( "mousewheel", wheelListener );
            _w.on( "scroll", scrollListener )
        }

        var _isWheel = false;
        function wheelListener( $e )
        {
            var e = window.event;
            var delta = e.wheelDelta / 120;
            var sT = _w.scrollTop();

            if( !_isWheel )
            {
                _sData.sT = sT;
                _isWheel = true;
            }

            ( delta < 0 ) ? _sData.sT += _option.spec : _sData.sT -= _option.spec;

            if( _sData.sT < _sData.min ) _sData.sT = _sData.min;
            else if( _sData.sT> _sData.max ) _sData.sT = _sData.max;

            TweenMax.killTweensOf( _b );
            TweenMax.to( _b, _option.mTime, { scrollTop : _sData.sT, onComplete:function(){ _isWheel = false }});

            return false;
        }

        return{
            Show : Show,
            Init : Init
        }
    })();

    $( $document ).ready( function(){
        App.scroll = scroll;
    });

})( window, document, jQuery );