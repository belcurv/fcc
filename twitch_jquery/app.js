/*jslint */
/*global $, console */

$(document).ready(function () {
    'use strict';
    
    var twitchModule = {
        
        state: [],
        
        users: ['ogamingsc2', 'ESL_SC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin'],
        
        api: {
            channel : 'https://wind-bow.gomix.me/twitch-api/channels/',
            stream  : 'https://wind-bow.gomix.me/twitch-api/streams/'
        },
        
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.users.forEach(this.getChannel.bind(this));
        },
        
        cacheDom: function () {
            this.$el         = $("#twitchModule");
            this.$table      = this.$el.find("#table");
            this.$btnAll     = this.$el.find("#btnAll");
            this.$btnOnline  = this.$el.find("#btnOnline");
            this.$btnOffline = this.$el.find("#btnOffline");
        },
        
        bindEvents: function () {
            this.$btnAll.on("click",     {cond: "all"},     this.filter.bind(this));
            this.$btnOnline.on("click",  {cond: "online"},  this.filter.bind(this));
            this.$btnOffline.on("click", {cond: "offline"}, this.filter.bind(this));
        },
        
        getChannel: function (user) {
            $.getJSON(this.api.channel + user, this.getStream.bind(this));
        },
        
        getStream: function (channel) {
            $.getJSON(this.api.stream + channel.name)
                .then(stream => ({ channel: channel, stream: stream }))
                .then(this.bindData.bind(this))
                .then(this.loadAll.bind(this));
        },
        
        bindData: function (data) {
            this.state.push(data);
        },
        
        loadAll: function () {
            this.$btnAll.trigger('click');
        },
        
        filter: function (event) {
            var filteredArr = [];
            
            if (event.data.cond === 'online') {
                this.render(this.state.filter(c => c.stream.stream ));
            } else if (event.data.cond === 'offline') {
                this.render(this.state.filter(c => !c.stream.stream ));
            } else {
                this.render(this.state);
            }
        },
        
        render: function (data) {
            var $table = this.$table,
                $thead = $table.find('thead'),
                $tbody = $table.find('tbody');
            
            $tbody.empty();
                        
            $thead
                .empty()
                .append('<th>Channel</th>')
                .append('<th></th>')
                .append('<th>Status</th>')
                .append('<th>Online</th>');
            
            $table
                .empty()
                .addClass('table')
                .append($thead);
 
            data.forEach(function (c) {
                
                if (c && !c.channel.error) {
                    var $tr       = $('<tr></tr>'),
                        $tdImage  = $('<td></td>'),
                        $tdName   = $('<td></td>'),
                        $tdStatus = $('<td></td>'),
                        $tdOnline = $('<td></td>'),
                        $image    = $('<img />'),
                        $anchor   = $('<a></a>'),
                        $pStatus  = $('<p></p>'),
                        $pGame    = $('<p></p>');
                    
                    $image
                        .addClass('logo')
                        .attr('src', c.channel.logo)
                        .attr('alt', c.channel.display_name + 'logo');
                    $anchor
                        .attr('href', c.channel.url)
                        .attr('target', '_blank')
                        .append(c.channel.display_name);
                    
                    $tdImage
                        .append($image);
                    
                    $tdName
                        .append($anchor);
                    
                    $tdStatus
                        .append(c.channel.status);
                    
                    $tdOnline
                        .addClass('online')
                    
                    if (c.stream.stream) {
                        $pGame
                            .addClass('now-streaming')
                            .append(c.stream.stream.game);
                        $tdStatus
                            .append($pGame);
                        $tdOnline
                            .append('<span class="greendot"></span>');
                    } else {
                        $tdOnline
                            .append('<span class="reddot"></span>');
                    }

                    $tr
                        .append($tdImage)
                        .append($tdName)
                        .append($tdStatus)
                        .append($tdOnline);
                    
                    $tbody.append($tr);
                    $table.append($tbody);
            
                } else {
                    
                    var $tr       = $('<tr></tr>'),
                        $tdStatus = $('<td></td>');
                        
                    $tdStatus
                        .attr('colspan', 4)
                        .addClass('online')
                        .append(c.channel.message);
                    $tr
                        .append($tdStatus);
                    
                    $tbody.append($tr);
                    $table.append($tbody);
                }
            });
        }
    };
    
    twitchModule.init();
    
});