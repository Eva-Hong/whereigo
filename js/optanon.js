'use strict';
(function(app, $) {
    var $cache = {};
    var initialized = false;
    var optanonCookieGroupsToDisableSFCCTracking = "1,2,3,4";

    function initializeCache() {
        $cache.document = $(document);
    }

    function initializeEvents() {
        $cache.document.on('optanon.wrapper.event', handleOptanonWrapperEvent);
    }

    function handleOptanonWrapperEvent() {
        if (!optanonCookieGroupsToDisableSFCCTracking) {
            return;
        }
        var cookieOptanonConsent = Cookies.get('OptanonConsent');
        if (cookieOptanonConsent) {
            var cookieOptanonConsentInfos = parseCookieOptanonConsentValue(cookieOptanonConsent, '&', '=');
            if (cookieOptanonConsentInfos.groups) {
                var cookieOptanonConsentGroupsArray = parseCookieOptanonConsentValue(cookieOptanonConsentInfos.groups, ',', ':');
                var groupsToDisableSFCCTracking = optanonCookieGroupsToDisableSFCCTracking;
                var groupsToDisableSFCCTrackingArray = groupsToDisableSFCCTracking.split(',');
                var groupsToDisableForSession = [].filter.call(groupsToDisableSFCCTrackingArray, function(groupToDisable) {
                    return cookieOptanonConsentGroupsArray[groupToDisable] === '0';
                });
                var shouldSessionTrackingAllowed = !(groupsToDisableForSession && groupsToDisableForSession.length);
                var currentSessionTrackingAllowed = (Cookies.get('dw_dnt') === '0');
                if (currentSessionTrackingAllowed != shouldSessionTrackingAllowed) {
                    changeSessionTracking(shouldSessionTrackingAllowed);
                }
            }
        }
    }

    function changeSessionTracking(sessionTrackingAllowed) {
        getJson({
            url: window.Urls.changeSessionTracking,
            data: {
                sessionTrackingAllowed: sessionTrackingAllowed,
            },
            callback: function(response) {}
        });
    }

    function parseCookieOptanonConsentValue(value, separator1, separator2) {
        if (!value || !separator1 || !separator2) {
            return {};
        }
        var object = {};
        var a = value.split(separator1);
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split(separator2);
            object[b[0]] = b[1];
        }
        return object;
    }

    function getJson(options) {
        var currentRequests = [];
        options.url = toAbsoluteUrl(options.url);
        if (!options.url || currentRequests[options.url]) {
            return;
        }
        currentRequests[options.url] = true;
        $.ajax({
            dataType: 'json',
            url: options.url,
            async: (typeof options.async === 'undefined' || options.async === null) ? true : options.async,
            data: options.data || {}
        }).done(function(response) {
            if (options.callback) {
                options.callback(response);
            }
        }).fail(function(xhr, textStatus) {
            if (textStatus === 'parsererror') {
                window.alert(Resources.BAD_RESPONSE);
            }
            if (options.callback) {
                options.callback(null);
            }
        }).always(function() {
            if (currentRequests[options.url]) {
                delete currentRequests[options.url];
            }
        });
    }

    function toAbsoluteUrl(url) {
        if (url.indexOf('http') !== 0 && url.charAt(0) !== '/') {
            url = '/' + url;
        }
        return url;
    }
    app.components = app.components || {};
    app.components.global = app.components.global || {};
    app.components.global.optanon = {
        init: function() {
            initializeCache();
            initializeEvents();
            initialized = true;
        },
        isInitialized: function() {
            return initialized;
        }
    };
}(window.app = window.app || {}, jQuery));