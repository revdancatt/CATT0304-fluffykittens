control = {

    init: function() {

        setInterval( function() {
            control.fetchImage()
        }, 300000);

        this.fetchImage();

    },

    fetchImage: function() {

        //  Go and ge the latest guardian story
        $.getJSON("http://content.guardianapis.com/search?page-size=10&format=json&show-fields=trailText%2Cheadline%2Cthumbnail&callback=?",

        //  TODO: add error checking to this response
        function(json) {

            var thumbnail = null;

            //  check to see if it's in any way valid
            if ('response' in json && 'results' in json.response && json.response.results.length > 0) {

                for (var i in json.response.results) {
                    thisStory = json.response.results[i];
                    if ('fields' in thisStory && 'thumbnail' in thisStory.fields) {
                        thumbnail = thisStory.fields.thumbnail.replace('http://static.guim.co.uk/sys-images/', '');

                        try {
                            console.log(thisStory);
                            console.log(thumbnail);
                        } catch(er) {
                            //  nowt
                        }

                        break;
                    };
                }
            }

            if (thumbnail !== null) {

                $.getJSON("http://guardianimagetodata.appspot.com/img_to_json?img=" + thumbnail + "&callback=?",
                    function(json) {
                        $('img.holder').load(function() {control.copyToCanvas();});
                        $('img.holder').attr('src', json.data);
                    }
                );

            }

        });
    },

    copyToCanvas: function() {
        
        var data = null, r = null, g = null, b = null;
        var c=$('.sourceCanvas')[0];
        var ctx=c.getContext("2d");
        ctx.drawImage($("img.holder")[0], 0, 0, 140, 84, 0, 0, 1, 5);

        //  Get the pixel values and set the background colour of the divs to the them
        data = ctx.getImageData(0, 0, 1, 1).data;
        $('.r1').css( {background: 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', 0.75)' });

        if ((data[0] + data[1] + data[2]) / 2 > 128) {
            $('h1').css( 'color', 'black');
        } else {
            $('h1').css( 'color', 'white');
        }

        data = ctx.getImageData(0, 1, 1, 1).data;
        $('.r2').css( {background: 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', 1)' });

        data = ctx.getImageData(0, 2, 1, 1).data;
        $('.r3').css( {background: 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', 0.8)' });

        data = ctx.getImageData(0, 3, 1, 1).data;
        $('.r4').css( {background: 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', 1)' });

        data = ctx.getImageData(0, 4, 1, 1).data;
        $('.r5').css( {background: 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', 0.8)' });

    }

}