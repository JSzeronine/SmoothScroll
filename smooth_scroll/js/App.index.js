


( function( $window, $document, $ ){

    var index = (function(){

        var _w;
        function Init()
        {
            create();
            addEvent();
        }

        function create()
        {
            _w = $( $window );
        }

        function addEvent()
        {
            _w.load( loadWindow );
        }

        function loadWindow( $e )
        {
            // 이벤트 받기
            $( App.scroll ).on( "SCROLL_EVENT", scrollListener );

            // 사용하기
            App.scroll.Show({
                spec : 100,         // 스크롤 간격
                mTime : 0.35        // 모션 시간
            });
        }

        function scrollListener( $e, $sT )
        {
            console.log( $sT );
        }

        return{
            Init : Init
        }
    })();

    $( $document ).ready( function(){
        App.index = index;
        App.index.Init();
    });

})( window, document, jQuery );