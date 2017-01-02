/*jslint */
/*global $, console */

$(document).ready(function () {
    'use strict';
    
    var twitchModule = {
        
        state: [],
        
        users: ['ogamingsc2', 'ESL_SC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'Reckful', 'noobs2ninjas', 'brunofin'],
        
        api: {
            user    : 'https://wind-bow.gomix.me/twitch-api/users/',
            channel : 'https://wind-bow.gomix.me/twitch-api/channels/',
            stream  : 'https://wind-bow.gomix.me/twitch-api/streams/'
        },
        
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.users.forEach(this.getChannel.bind(this));
        },
        
        cacheDom: function () {
            this.$el           = $("#twitchModule");
            this.$channelList  = this.$el.find("#channelList");
            this.$clickAll     = this.$el.find("#clickAll");
            this.$clickOnline  = this.$el.find("#clickOnline");
            this.$clickOffline = this.$el.find("#clickOffline");
        },
        
        bindEvents: function () {
            this.$clickAll.on("click", this.filter.bind(this));
            this.$clickOnline.on("click", {cond: "online"}, this.filter.bind(this));
            this.$clickOffline.on("click", {cond: "offline"}, this.filter.bind(this));
        },
        
        render: function (data) {
            console.log('Channels: ' + data.length, data);
            
            var list = this.$channelList,
                div     = $("<div class='user'></div>");
            
            list.empty();
            
            data.forEach(function (c) {
                
                div
                    .append('<img src="' + c.channel.logo + '" class="pic" />')
                    .append('<a href="' + c.channel.url + '" target="_blank">'
                            + c.channel.display_name
                            + '</a>')
                    .append('<p class="bio">' + c.channel.status + '</p>');
//                    .append('<p class="status">Status: ' + c.channel.data.status + '</p>');
                
                if (c.stream.stream) {
                    div.append('<p class="stream">Game: ' + c.stream.stream.game + '</p>');
                }
                
                list.append(div);
            
            });
            
        },
                
        getChannel: function (user) {
            $.getJSON(this.api.channel + user, this.getStream.bind(this));
        },
        
        getStream: function (channel) {
            $.getJSON(this.api.stream + channel.name)
                .then(function (stream) {
                    return {
                        channel: channel,
                        stream: stream
                    };
                })
                .then(this.bindData.bind(this));
        },
        
        bindData: function (data) {
            this.state.push(data);
            return data;
        },
        
        filter: function (event) {
            
            var cond = (event.data) ? event.data.cond : '',
                filteredArr = [];
            
            if (cond === 'online') {
//                filteredArr = this.state.filter();
                this.render(filteredArr);
            } else if (cond === 'offline') {
//                filteredArr = this.state.filter();
                this.render(filteredArr);
            } else {
                this.render(this.state);
            }
        }
        
    };
    
    twitchModule.init();
    
});
    
//    function updateDom(data, status) {
//        
//        var outputEl = $('#twitchModule'),
//            div     = $("<div class='user'></div>"),
//            obj = {},
//            mess;
//        
////        console.log(data ? data : '');
////        console.log(outputEl);
//        
//        if (data && !data.channel.error) {
//            
//            obj = {
//                name   : data.channel.name,
//                display_name: data.channel.display_name,
//                logo   : data.channel.logo,
//                bio    : data.channel.status ? data.channel.status : '',
//                url    : data.channel.url,
//                status : data.stream.stream ? 'Online' : 'Offline'
//            };
//
//            if (data.stream.stream) {
//                obj.stream = data.stream.stream.game;
//            }
//                        
//            div.append('<img src="' + obj.logo + '" class="pic" />')
//                .append('<a href="' + obj.url + '" target="_blank">'
//                        + obj.display_name
//                        + '</a>')
//                .append('<p class="bio">' + obj.bio + '</p>')
//                .append('<p class="status">Status: ' + obj.status + '</p>');
//            
//            if (obj.stream) {
//                div.append('<p class="stream">Game: ' + obj.stream + '</p>');
//            }
//                
//            outputEl.append(div);
//                
//        } else if (data) {
//            
//            mess = [
//                '<div class="user" style="background-color:#ff6961;">',
//                '<p style="text-align: center;">' + data.channel.message + '</p>', '</div>'
//            ].join('');
//            
//            outputEl.append(mess);
//        }
//        
//                
//    }