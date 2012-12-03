neko = {

    started: false,
    status: 'sitting',
    isActing: false,

    boredTmr: null,
    yawnCounter: 0,

    cursorPosition: {
        x: null,
        y: null
    },

    actionStartTime: null,
    fps: 12,
    speed: 100,
    
    init: function() {

        //  Bind mouse move to the whole screen, so we can keep track of the
        //  mouse position, also reset the boredTmr
        $(document).bind('mousemove', function(e) {

            neko.cursorPosition.x = e.pageX;
            neko.cursorPosition.y = e.pageY;

            clearTimeout(neko.boredTmr);
            neko.boredTmr = setTimeout(function() {
                neko.boredNow()
            }, 5000);

        })

        //  set the bored timer now
        neko.boredTmr = setTimeout(function() {
            neko.boredNow()
        }, 5000);

        //  set this as a default start time
        this.actionStartTime = new Date();

        setInterval( function() {
            neko.tick()
        }, 1000 / this.fps);

    },

    tick: function() {

        var tock = new Date();
        var timeDiff = tock - this.actionStartTime;

        //  check to see what we are doing, and then
        //  respond to that

        //  if we are yawning, stop it once the
        //  time gets over 666ms
        if (this.status == 'yawning') {

            //  if it's been 600ms since we started then...
            //  say we're not action, set us to sitting
            //  stop us yawning, let the system know
            //  that we have now started and reset the
            //  bored timer
            if (timeDiff > 666) {
                neko.isActing = false;
                neko.status = 'sitting';
                neko.started = true;
                clearTimeout(neko.boredTmr);
                neko.boredTmr = setTimeout(function() { neko.boredNow() }, 5000);
                neko.yawnCounter++;
                $('.neko').removeClass('yawning');
            } else {
                $('.neko').addClass('yawning');
            }

            return;

        }



        if (this.status == 'scratching') {

            neko.yawnCounter = 0;

            //  if it's been 600ms since we started then...
            //  say we're not action, set us to sitting
            //  stop us yawning, let the system know
            //  that we have now started and reset the
            //  bored timer
            if (timeDiff > 1666) {
                neko.isActing = false;
                neko.status = 'sitting';
                neko.started = true;
                clearTimeout(neko.boredTmr);
                neko.boredTmr = setTimeout(function() { neko.boredNow() }, 5000);
                neko.yawnCounter++;
                $('.neko').removeClass('scratch1');
                $('.neko').removeClass('scratch2');
            } else {

                //  We have to work out if we are going to do scratch1
                //  or scratch 2
                var opt = parseInt(timeDiff / neko.speed, 10) % 2;

                if (opt == 0) {
                    $('.neko').removeClass('scratch2');
                    $('.neko').addClass('scratch1');
                } else {
                    $('.neko').removeClass('scratch1');
                    $('.neko').addClass('scratch2');
                }

            }

            return;

        }




        if (this.status == 'sleeping') {

            neko.yawnCounter = 0;

            //  if it's been 600ms since we started then...
            //  say we're not action, set us to sitting
            //  stop us yawning, let the system know
            //  that we have now started and reset the
            //  bored timer
            if (timeDiff > 12000) {
                neko.isActing = false;
                neko.status = 'sitting';
                neko.started = true;
                clearTimeout(neko.boredTmr);
                neko.boredTmr = setTimeout(function() { neko.boredNow() }, 5000);
                neko.yawnCounter++;
                $('.neko').removeClass('sleeping1');
                $('.neko').removeClass('sleeping2');
            } else {

                //  We have to work out if we are going to do scratch1
                //  or scratch 2
                var opt = parseInt(timeDiff / neko.speed / 7, 10) % 2;

                if (opt == 0) {
                    $('.neko').removeClass('sleeping2');
                    $('.neko').addClass('sleeping1');
                } else {
                    $('.neko').removeClass('sleeping1');
                    $('.neko').addClass('sleeping2');
                }

            }

            return;

        }

    },



    boredNow: function() {

        this.started = true;

        //  if we are already doing something then
        //  just exit here
        if (this.isActing) return;

        //  otherwise let's do something
        this.isActing = true;
        this.actionStartTime = new Date();

        //  decide what we are going to do
        if (neko.yawnCounter > 3) {
            //  Do sleeping
            this.status = 'sleeping';
        } else {
            if (Math.random() > 0.7) {
                this.status = 'scratching';
            } else {
                this.status = 'yawning';
            }
        }                
    }

}