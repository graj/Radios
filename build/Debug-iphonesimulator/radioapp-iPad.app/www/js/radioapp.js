
function onDeviceReady()

{
    
    cache = new LastFMCache();
    /* Create a LastFM object */
    lastfm = new LastFM({
        apiKey    : 'f76b8d609c4af3988283045b8f6123ba',
        apiSecret : '3cbb48bd2736581e0c242c8a9cf3045c',
        cache     : cache
    });
    
    if(isIPad()){
        plugins.AudioStream.onMetaDataChange(function(data) {if(data) {
                var splits=data.split("-");
                document.getElementById("now_playing").innerHTML = data;
        radioapp_displayArtist(splits[0]);}});
        playSound();
    }
}

function playSound() {
    plugins.AudioStream.play("http://zlz-stream11.streamserver.ch/1/drs3/mp3_128");
}

function radioapp_displayArtist(artist) {
    
    
    lastfm.artist.getInfo({artist:  artist}, {success: function(data){
            document.getElementById("artist_name").innerHTML = data.artist.name;
            document.getElementById("artist_bio").innerHTML = data.artist.bio.summary;
            console.log(data.artist);
            //    document.getElementById("artist_bio_long").innerHTML = data.artist.bio.content;
            if(data.artist.image[4] && data.artist.image[4]['#text'])  {
                document.getElementById("artist_image").src = data.artist.image[4]['#text'];
            } else {
                document.getElementById("artist_image").src = "";
            }
            var simi = '';
            if (data.artist.similar && data.artist.similar.artist) {
                similar = data.artist.similar.artist;
                var simi = '<i>Similar Artists:</i> ';
                for (var i = 0; i < similar.length; i++) {
                    simi += '' + similar[i].name + ', ';
                    
                }
            }
            document.getElementById("similar").innerHTML = simi;
            simi = '';
            if (data.artist.tags && data.artist.tags.tag) {
                var tags = data.artist.tags.tag;
                
                simi = '<i>Tags:</i> ';
                for (var i = 0; i < tags.length; i++) {
                    simi += '' + tags[i].name + ', ';
                }
            }
            
            document.getElementById("tags").innerHTML = simi;
            
            lastfm.artist.getImages({artist:data.artist.name}, {success: function(foo) {
                    console.log(foo);
            }
            }
            );
            
    }, error: function(code, message){
        lastfm.artist.search({artist:  artist}, {success: function(data){
                if(data.results.artistmatches.artist && data.results.artistmatches.artist[0]) {
                    radioapp_displayArtist(data.results.artistmatches.artist[0]);
                    
                }
        }});
        
        
        
    }});
    
}

function onWinLoad()
{
    if(isIPad()){
        document.addEventListener("deviceready",onDeviceReady,false);
    } else {
        onDeviceReady();
    }
    
    /*
    testEl = $('testElement');
    testEl.onmousedown = testEl.ontouchstart = startDrag;
    
    var divs = testEl.getElementsByTagName('div');
    for (var i=0;i<divs.length;i+=1) {
        divs[i].style.left = position + 'px';
        position += divs[i].offsetWidth + 10;
    }
    */
    
}

function isIPad() {
    return navigator.userAgent.match(/iPad/i) ||  navigator.userAgent.match(/iPhone/i);
}


