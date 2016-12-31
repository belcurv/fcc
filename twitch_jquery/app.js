/*jslint */
/*global $, console */

$(document).ready(function () {
    'use strict';
    
    // Usernames
    var users = ["ogamingsc2", "ESL_SC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "Reckful", "noobs2ninjas", "brunofin"],
        route = {
            users  : 'https://wind-bow.gomix.me/twitch-api/users/',
            channel: 'https://wind-bow.gomix.me/twitch-api/channels/',
            streams: 'https://wind-bow.gomix.me/twitch-api/streams/'
        };
    
    // ========================== UTILITY FUNCTIONS ===========================

    function getStream(channel) {
        // get the channels stream
        return $.getJSON(route.streams + channel.name)
            .then(function (st) {
                // return object consisting of channel + stream
                return {
                    channel: channel,
                    stream: st
                };
            });
    }

    // filter streams
    function filterObject(data, status) {
        
        if (status === 'all') {
            // no filtering - return all streams
            return data;
        } else if (status === 'Online') {
            // return only online streams
            return (data.stream.stream) ? data : false;
        } else {
            // return only 'null' streams
            return (data.stream.stream === null) ? data : false;
        }
        
    }

    function updateDom(data, status) {
        
        var outputEl = $('.twitch'),
            div     = $("<div class='user'></div>"),
            obj = {},
            mess;
        
//        console.log(data ? data : '');
//        console.log(outputEl);
        
        if (data && !data.channel.error) {
            
            obj = {
                name   : data.channel.name,
                display_name: data.channel.display_name,
                logo   : data.channel.logo,
                bio    : data.channel.status ? data.channel.status : '',
                url    : data.channel.url,
                status : data.stream.stream ? 'Online' : 'Offline'
            };

            if (data.stream.stream) {
                obj.stream = data.stream.stream.game;
            }
                        
            div.append('<img src="' + obj.logo + '" class="pic" />')
                .append('<a href="' + obj.url + '" target="_blank">'
                        + obj.display_name
                        + '</a>')
                .append('<p class="bio">' + obj.bio + '</p>')
                .append('<p class="status">Status: ' + obj.status + '</p>');
            
            if (obj.stream) {
                div.append('<p class="stream">Game: ' + obj.stream + '</p>');
            }
                
            outputEl.append(div);
                
        } else if (data) {
            
            mess = [
                '<div class="user" style="background-color:#ff6961;">',
                '<p style="text-align: center;">' + data.channel.message + '</p>', '</div>'
            ].join('');
            
            outputEl.append(mess);
        }
        
                
    }
    
    
    // ============================ EVENT HANDLERS ============================

    // ALL click handler
    $('.clickAll').click(function (event) {
        
        var status = 'all';
        
        // empty the target element
        $('.twitch').empty();
        
        users.forEach(function getChannel(user) {
            $.getJSON(route.channel + user)
                .then(getStream)
                .then(function (data) {return filterObject(data, status); })
                .then(updateDom);
        });
        
    });

    // ONLINE click handler
    $('.clickOnline').click(function (event) {
        
        var status = 'Online';

        // empty the target element
        $('.twitch').empty();

        users.forEach(function getChannel(user) {
            $.getJSON(route.channel + user)
                .then(getStream)
                .then(function (data) {return filterObject(data, status); })
                .then(updateDom);
        });
    });

    // OFFLINE click handler
    $('.clickOffline').click(function (event) {
        
        var status = 'Offline';

        // empty the target element
        $('.twitch').empty();

        users.forEach(function getChannel(user) {
            $.getJSON(route.channel + user)
                .then(getStream)
                .then(function (data) {return filterObject(data); })
                .then(updateDom);
        });
    });


});