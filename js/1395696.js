if (FCJSLoader === undefined) {
    var FCJSLoader = function() {};

    function is_defined(p) {
        if (eval("typeof " + p) == "undefined") return false;
        if (p.indexOf(".") > 0) return true;
        return typeof window[p].tagName != "string";
    }
    (function(FCJSLoader, w, d) {
        var _jsi = 0;
        var _jsd = 0;
        var _jsl = [];
        var _jsc = [];
        var _jsp = [];
        var _js = [];
        FCJSLoader.load = function(src, callback, provides) {
            var i, j, scripts;
            if (typeof src == "string") src = [src];
            if (!provides) provides = "";
            _jsl[_jsi] = [];
            _jsc[_jsi] = callback;
            _jsp[_jsi] = [provides];
            for (i = 0; i < src.length; i++) {
                var s = src[i];
                var p = s.split("#");
                s = p[0];
                if (p.length > 2) {
                    var b = false;
                    if (p[2].charAt(0) == '!') {
                        p[2] = p[2].substr(1);
                        b = true;
                    }
                    var r = new RegExp(p[2]);
                    if (r.test(navigator.userAgent) == b) {
                        continue;
                    }
                }
                if (!_jsp[_jsi][i]) _jsp[_jsi][i] = (p.length > 1) ? p[1] : "";
                var ok = true;
                for (j = 0; j < _js.length; j++) {
                    if (_js[j] == s) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    var full_src = s;
                    if (full_src.indexOf("://") < 0) {
                        if (full_src.indexOf("//") === 0) {
                            full_src = location.protocol + full_src;
                        } else if (full_src[0] == "/") {
                            full_src = location.protocol + "//" + location.host + full_src;
                        }
                    }
                    if (scripts === undefined) scripts = d.getElementsByTagName("script");
                    for (j = 0; j < scripts.length; j++) {
                        if (scripts[j].src == full_src) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (ok) {
                    _jsl[_jsi][i] = s;
                    _js.push(s);
                } else {
                    _jsl[_jsi][i] = "";
                }
            }
            if (_jsi == _jsd) {
                _loadJS(_jsi++);
            } else {
                _jsi++;
            }
        };

        function _loadJS(i) {
            if (_jsl[i].length == 0) {
                var callback = _jsc[i];
                _jsc[i] = undefined;
                if (callback) {
                    callback();
                }
                if (i == _jsd) {
                    _jsd++;
                    if (_jsl.length > i + 1) {
                        _loadJS(_jsd)
                    }
                }
                return;
            }
            var src = _jsl[i].shift();
            var p = _jsp[i].shift();
            if ((p) && (is_defined(p))) {
                _loadJS(i);
                return;
            }
            if (!src) {
                if (p) {
                    var n = 0;
                    var t = setInterval(function() {
                        if ((is_defined(p)) || (++n > 200)) {
                            clearInterval(t);
                            _loadJS(i);
                        }
                    }, 10);
                } else {
                    _loadJS(i);
                }
                return;
            }
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.onload = s.onreadystatechange = s.onerror = function(e) {
                if (e && e.type == 'error') {
                    s.onload = s.onreadystatechange = s.onerror = null;
                    _loadJS(i);
                    return;
                }
                if ((s.readyState) && (!/loaded|complete/.test(s.readyState))) return;
                s.onload = s.onreadystatechange = s.onerror = null;
                var n = 0;
                var t = setInterval(function() {
                    if ((!p) || (is_defined(p)) || (++n > 200)) {
                        clearInterval(t);
                        _loadJS(i);
                    }
                }, 10);
            };
            d.getElementsByTagName('head')[0].appendChild(s);
            s.src = src;
        }
    })(FCJSLoader, window, document);
}
var _fc_id = _fc_id || [];
var playerTracker = playerTracker || {};
var time_server_url = "//player.freecaster.com/time_js.php";
var fc_locale = {
    "player": {
        "play": "Play",
        "pause": "Pause",
        "stop": "Stop",
        "mute": "Mute",
        "unmute": "Unmute",
        "fullscreen": "Enter Fullscreen Mode",
        "normalscreen": "Leave Fullscreen Mode",
        "time": "Position",
        "volume": "Volume",
        "captions": "Subtitles",
        "captions_on": "Hide subtitles",
        "captions_off": "Show subtitles",
        "timebar": "Time Slider",
        "transcript": "Transcript",
        "transcript_download": "Download as PDF"
    }
};
FCJSLoader.load("\/\/media.freecaster.com\/js\/jquery-1.7.2.min.js", function() {
    (function(d, w) {
        if (!w._gaq) {
            w._gaq = [];
            (function() {
                var ga = d.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == d.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = d.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }
        w._gaq.push(function() {
            playerTracker = _gat._createTracker('UA-439312-13');
        });
    })(document, window);
    var _fc_c = ["\/\/player.freecaster.com\/flown-2.9.5\/style\/flowplayer.css", "\/\/media.freecaster.com\/css\/fpplayer.css"];
    for (var i = 0; i < _fc_c.length; i++) {
        var c = document.createElement('link');
        c.rel = 'stylesheet';
        c.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(c);
        c.href = _fc_c[i];
    }
    var _fc_s = ["\/\/player.freecaster.com\/plugins\/any\/freecaster.flow.js#fc_freecaster_flow", "\/\/player.freecaster.com\/plugins\/any\/freecaster.js#fc_freecaster", "\/\/player.freecaster.com\/media\/js\/anyplayer.js#anyplayer", "\/\/player.freecaster.com\/plugins\/any\/jw7toAny.js#jw7shim", "\/\/player.freecaster.com\/flown-2.9.5\/flowplayer.min.js#flowplayer", "\/\/player.freecaster.com\/flown-2.9.5\/translations.all.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/hls.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/dash.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/keyboard.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/asel.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/qsel.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/message.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/subtitles-html.min.js", "\/\/player.freecaster.com\/flown-2.9.5\/plugins\/thumbnails.min.js", "\/\/player.freecaster.com\/plugins\/flowplayer-mux.js", "\/\/player.freecaster.com\/plugins\/any\/mux.flow.js", "\/\/player.freecaster.com\/plugins\/any\/ga.js#fc_ga", "\/\/player.freecaster.com\/plugins\/any\/analytics.js?v=20190203#FCAnalytics"];
    FCJSLoader.load(_fc_s, function() {
        jQuery("#Home_Carousel_4G_BAG_15scd_JP_desktop_container").html("<div id=\"Home_Carousel_4G_BAG_15scd_JP_desktop_wrapper\" class=\"fcplayer\"><div id=\"Home_Carousel_4G_BAG_15scd_JP_desktop\" style=\"width:100%;height:100%;\" class=\"flow-skin-givenchy\"><\/div><\/div><script type=\"text\/javascript\">FCJSLoader.load([\"\\\/\\\/player.freecaster.com\\\/plugins\\\/any\\\/freecaster.flow.js\",\"\\\/\\\/player.freecaster.com\\\/plugins\\\/any\\\/freecaster.js\",\"\\\/\\\/player.freecaster.com\\\/media\\\/js\\\/anyplayer.js\",\"\\\/\\\/player.freecaster.com\\\/plugins\\\/any\\\/jw7toAny.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/flowplayer.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/translations.all.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/hls.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/dash.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/keyboard.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/asel.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/qsel.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/message.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/subtitles-html.min.js\",\"\\\/\\\/player.freecaster.com\\\/flown-2.9.5\\\/plugins\\\/thumbnails.min.js\"],function(){var links=document.getElementsByTagName('link');var href=\"\\\/\\\/player.freecaster.com\\\/skins\\\/givenchy-fp.css\";var i=links.length-1;for(;i>=0;i--)if(links[i].href==href)break;if((!links[i])||(links[i].href!=href))\n{var l=document.createElement('link');l.rel='stylesheet';l.type='text\/css';l.media='all';l.href=href;document.getElementsByTagName('head')[0].appendChild(l);}\n(function(){var player_id=\"Home_Carousel_4G_BAG_15scd_JP_desktop\";var config={\"loop\":true,\"muted\":true,\"stretching\":\"cover\",\"fc_ga\":{\"tracker\":\"1395696\\\/4g-campaign-15s-video-169\\\/4g-bag-campaign\\\/c1000000\\\/c1000001\\\/c1009063\\\/c1009553\\\/c1395212\\\/\",\"trackingobject\":\"playerTracker\"},\"plugins\":{\"analytics\":{\"audience_url\":\"https:\\\/\\\/t.freecaster.com\\\/a\",\"metrics_url\":\"https:\\\/\\\/t.freecaster.com\\\/m\",\"tracking_url\":\"https:\\\/\\\/t.freecaster.com\\\/t\",\"interval\":5}},\"skin\":\"givenchy\",\"share\":{\"link\":true,\"facebook\":true,\"twitter\":true},\"freecaster\":{\"player_root\":\"\\\/\\\/player.freecaster.com\\\/\",\"servicepath\":\"http:\\\/\\\/freecaster.tv\\\/player\\\/\",\"noactions\":true,\"template_livedate\":\"%a %e %b %Y @ %H:%M\",\"template_countdown\":\"%days<span class=\\\"small\\\">D<\\\/span> %hours<span class=\\\"small\\\">H<\\\/span> %minutes<span class=\\\"small\\\">M<\\\/span> %seconds<span class=\\\"small\\\">S<\\\/span>\",\"live_done_message\":\"Thanks for watching!\",\"live_done_image\":null,\"geolock_message\":\"Sorry, this video is not available in your country.\",\"premium_unlock\":\"Unlock Content\",\"premium_token_url\":\"http:\\\/\\\/freecaster.tv\\\/player\\\/token.php\",\"playerpath\":\"Flow\",\"uiorder\":[\"play\",\"rewind\",\"live\",\"timeline\",\"quality\",\"captions\",\"transcript\",\"audiotracks\",\"volume\",\"fullscreen\"],\"cdn\":\"level3\"},\"subtitles\":[],\"token\":\"eyJraWQiOiJVREllV29lRTZNYzEiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjIjoie1wiYWNsXCI6NixcImlkXCI6XCJVREllV29lRTZNYzFcIn0iLCJpc3MiOiJGbG93cGxheWVyIn0.62wwYjlSdhArQ1j62Nq1lMegXqP6arF3s0mtioJOAiqAIOe2sCA9UxVGhFHRHQmbzbFmjCdwrkTl3_lLohVLzA\",\"description\":\"4G Campaign 15s video 16:9\",\"src\":[\"\\\/\\\/vod.fl.freecaster.net\\\/vod\\\/givenchy\\\/geo\\\/open\\\/BymNQp7IBj_1080p.mp4\",\"\\\/\\\/vod.fl.freecaster.net\\\/vod\\\/givenchy\\\/geo\\\/open\\\/BymNQp7IBj_720p.mp4\"],\"autoplay\":true,\"poster\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/1280x720\\\/1395\\\/1395696.jpg?1619444985\",\"item\":{\"title\":\"4G Campaign 15s video 16:9\",\"image\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/640x360\\\/1395\\\/1395696.jpg?1619444985\",\"duration\":\"15.04\",\"tracks\":[],\"live\":false,\"live_done\":false,\"countdown\":false,\"countdown_date\":null,\"countdown_url\":null,\"posterframes\":{\"640\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/640x360\\\/1395\\\/1395696.jpg?1619444985\",\"704\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/704x396\\\/1395\\\/1395696.jpg?1619444985\",\"2400\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/2400x1350\\\/1395\\\/1395696.jpg?1619444985\",\"1920\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/1920x1080\\\/1395\\\/1395696.jpg?1619444985\",\"1280\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/1280x720\\\/1395\\\/1395696.jpg?1619444985\",\"1600\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/1600x900\\\/1395\\\/1395696.jpg?1619444985\",\"1024\":\"\\\/\\\/media.freecaster.com\\\/img\\\/poster\\\/video\\\/1024x576\\\/1395\\\/1395696.jpg?1619444985\"},\"sources\":[{\"file\":\"\\\/\\\/vod.fl.freecaster.net\\\/vod\\\/givenchy\\\/geo\\\/open\\\/BymNQp7IBj_1080p.mp4\",\"label\":\"1080p\",\"type\":null,\"width\":\"1920\",\"height\":\"1080\"},{\"file\":\"\\\/\\\/vod.fl.freecaster.net\\\/vod\\\/givenchy\\\/geo\\\/open\\\/BymNQp7IBj_720p.mp4\",\"label\":\"720p\",\"type\":null,\"width\":\"1280\",\"height\":\"720\"}],\"youbora\":{\"content.title\":\"4G Campaign 15s video 16:9\",\"content.isLive\":false,\"content.metadata\":{\"content_id\":\"1395696\"},\"content.customDimension.1\":\"1395696\",\"content.customDimension.2\":\"c1000000\\\/c1000001\\\/c1009063\\\/c1009553\\\/c1395212\\\/\",\"content.customDimension.3\":\"givenchy\",\"content.customDimension.4\":\"1395212\",\"accountCode\":\"freecaster\",\"enableAnalytics\":true,\"obfuscateIp\":false,\"username\":\"\",\"transactionCode\":\"\"},\"mux\":{\"env_key\":\"57lf73irdepe3f7q5b1eckfhu\",\"client\":\"givenchy\",\"channels\":\"c1000000\\\/c1000001\\\/c1009063\\\/c1009553\\\/c1395212\\\/\"},\"tracker\":\"1395696\\\/4g-campaign-15s-video-169\\\/4g-bag-campaign\\\/c1000000\\\/c1000001\\\/c1009063\\\/c1009553\\\/c1395212\\\/\",\"chapters\":[],\"analytics\":{\"channel_id\":\"1395212\",\"client\":\"givenchy\"},\"videoid\":\"1395696\"},\"transcript\":null,\"seconds_to_dvr\":120,\"thumbnails\":{\"src\":\"\\\/\\\/player.freecaster.com\\\/strips\\\/1395696.vtt\"},\"multiplay\":true,\"lang\":\"en\",\"hls\":{\"native\":false,\"maxBufferHole\":0.5,\"startLevel\":-1},\"qsel\":{\"labels\":[\"1080p\",\"720p\",\"480p\",\"360p\",\"288p\"]}};if(config.hls&&config.hls.withCredentials)\n{config.hls.xhrSetup=function(xhr){xhr.withCredentials=true;}}\nvar playerID=document.getElementById(\"Home_Carousel_4G_BAG_15scd_JP_desktop\");function defineFcLoader(){var fcLoader=function(opts,root,video,src){if(arguments.length==4)\n{return load_from_api(video,src);}};fcLoader.wants=function(_,src){return src.type==='fc\/load';};function load_from_api(video,sourceObject){fcplayer(video.parentElement.id).emit('loadVideo',sourceObject)};flowplayer(fcLoader);}\ndefineFcLoader();var video=flowplayer(playerID,config);video.conf=config;addPlayer(video);if(!window.fcplayers)return;window.fcplayers[player_id]=video;})();});<\/script>\n");
    });
}, 'jQuery');