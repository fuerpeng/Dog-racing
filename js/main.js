// var config = {
// 	rank:[6,3,4,5,2,1],  // 数组按狗的顺序(从上到下) 给狗排名
// 	prize:['苹果','苹果1','苹果4','苹果5','苹果6','苹果0']
// }
var runTime = 5000; //持续时间
var config = [{   // 比赛结果数组，按rank排名，奖品prize。(根据name查找对应dom，没有修改name的必要)
    rank: 5, 
    prize: '苹果6',
    name: 'dog1'
}, {
    rank: 6, 
    prize: '苹果5',
    name: 'dog2'
}, {
    rank: 4, 
    prize: '苹果4',
    name: 'dog3'
}, {
    rank: 3, 
    prize: '苹果3',
    name: 'dog4'
}, {
    rank: 2, 
    prize: '苹果2',
    name: 'dog5'
}, {
    rank: 1, 
    prize: '苹果1',
    name: 'dog6'
},]

var mydog;
var arr = ['#dog1', '#dog2', '#dog3', '#dog4', '#dog5', '#dog6'];
var house_arr = ['house1', 'house2', 'house3'];
var rank_arr = ['.rank1', '.rank2', '.rank3', '.rank4', '.rank5', '.rank6'];
var v_arr = ['dog_v1', 'dog_v2', 'dog_v3', 'dog_v4', 'dog_v5', 'dog_v6'];
var audio = document.getElementById('audio');
var interval_start = []; //起步
var interval_middle = []; //过程中
var dogs = arr.map(function(e) { //生成每个dog实例
    var speed = Math.random() * 25 + 50;
    var dog = new Dog($(e), speed);
    return dog;
});
var interval_house = [];
var houses = house_arr.map(function(e) { //房屋 dom
    return $('.' + e);
})
dog_talk(); //狗狗说话
choice_dog()
 

$('#start').on('click', function(e) {
    if (!scene.canStart) {
        return;
    }
    if(!mydog){
        alert('请押注一条狗^.^')
        return;
    }
    var index = 3;
    $('#start').hide();
    $('#reset').hide();
    $('.dog').off();
    var timer = setInterval(function() {
        if (index == 0) {
            clearInterval(timer);
            $('.count').html("");
            audio.play();
            setTimeout(function() {
                scene.init();
                scene.start();
            // setTimeout(function () {
            // 	scene.end();
            // },runTime)
            }, 200)
            return;
        }
        $('.count').html("<img id='count' class='animated fadeIn' src=" + "./images/c" + index + ".png" + " />")
        index--;
    }, 1000) 
})

$('#reset').on('click', function(e) {
    dog_talk();
    choice_dog();
    mydog = undefined;
    $('.start_line').css({'background-image':"url('./images/startline.png')"})
    $('.road_line').css({'background-image':"url('./images/runline.png')"})
     
    $('.result').removeClass('fadeInDown show');
    $('.road_line').css({
        left: '380px'
    });
    $('.start_line').css({
        left: '0px'
    })
    $('.house1').css({
        left: '20px'
    })
    $('.house2').css({
        left: '230px'
    })
    $('.house3').css({
        left: '555px'
    })
    arr.forEach(function(e) {
        $(e).css({
            left: '10px'
        });
    // $(e).removeClass().addClass('dog dog_start')
    });
    $('#reset').hide();
    $('#start').show();
})



var width = $('#app').width();

var scene = {
    canStart: true,
    canReset: false,
    init: function() {

        $('.result').removeClass('fadeInDown show');
        $('.road_line').css({
            left: '380px'
        });
        $('.start_line').css({
            left: '0px'
        })
        $('.house1').css({
            left: '20px'
        })
        $('.house2').css({
            left: '230px'
        })
        $('.house3').css({
            left: '555px'
        })
        arr.forEach(function(e) {
            $(e).css({
                left: '10px'
            });
            $(e).removeClass().addClass('dog dog_start')
        });
        dogs.forEach(function(e) {
            e.over = false;
        })
    },
    start: function() {
        var position_arr = [];
        arr.forEach(function(e, index) {
            var s = 200 + Math.round(Math.random() * 150);
            position_arr.push(s);
            $(e).css({
                'left': s
            });
        })
        position_arr.sort(function(a, b) {
            return a - b;
        })

        setTimeout(function() {
            scene.middle();
            setTimeout(function() {
                scene.end();
            }, runTime);

            setTimeout(function() {
                config.forEach(function(e) {
                    var dog = $('#' + e.name);
                    var left = dog.position().left;
                    if (e.rank == 1) {
                        dog.css({
                            'left': position_arr[5] + 180
                        })
                    } else if (e.rank == 2) {
                        dog.css({
                            'left': position_arr[5] + 150
                        })
                    } else if (e.rank == 3) {
                        dog.css({
                            'left': position_arr[5] + 120
                        })
                    } else if (e.rank == 4) {
                        dog.css({
                            'left': position_arr[5] + 90
                        })
                    } else if (e.rank == 5) {
                        dog.css({
                            'left': position_arr[5] + 60
                        })
                    } else if (e.rank == 6) {
                        dog.css({
                            'left': position_arr[5] + 0
                        })
                    }
                })
            }, 3000)

        }, 200)
    },
    middle: function() {
        scene.lineMove();
        scene.houseMove();
    },
    lineMove: function() {
        var start = $('.start_line'),
            road = $('.road_line');
        var b = setInterval(function() {
            var start_left = start.position().left;
            var road_left = road.position().left;
            if (start_left <= -380 || road_left <= 0) {
                clearTimeout(b);
                return;
            }
            start.css({
                left: start_left - 20
            })
            road.css({
                left: road_left - 20
            })
        }, 50)
    },
    houseMove: function() {
        houses.forEach(function(e, index) {
            var timer = setInterval(function() {
                var left = e.position().left;
                if (index == 0) {
                    if (left !== 'auto' && left <= -188) {
                        e.css({
                            right: -188,
                            left: 'auto'
                        })
                    } else {
                        e.css({
                            left: left - 8
                        })
                    }
                } else if (index == 1) {
                    if (left !== 'auto' && left <= -281) {
                        e.css({
                            right: -281,
                            left: 'auto'
                        })
                    } else {
                        e.css({
                            left: left - 8
                        })
                    }
                } else if (index == 2) {
                    if (left !== 'auto' && left <= -139) {
                        e.css({
                            right: -310,
                            left: 'auto'
                        })
                    } else {
                        e.css({
                            left: left - 8
                        })
                    }
                }
            }, 50)
            interval_house.push(timer);
        })
    },
    end: function() {
        scene.canStart = true;
        scene.canReset = false;

        setTimeout(function() {
            arr.forEach(function(e, index) {
                $(e).css({
                    'left': '1000px'
                })
            })
            dogs.forEach(function(e) {
                clearInterval(e.interval_middle);
                e.runEnd();
            })
            scene.canReset = true;
        }, 200)
        setTimeout(function(argument) {
            interval_house.forEach(function(e) {
                clearInterval(e)
            })
        }, 3000)
        var rank_dog = config.sort(function(a, b) {
            return a.rank - b.rank
        }) //按排名排序
        rank_dog.forEach(function(e) {
            $('#' + e.name).removeClass('dog_mid').addClass(v_arr[e.rank - 1]);
        }) //按排名给速度，决定排名
        var timer = setInterval(function() {
            var over = true;
            dogs.forEach(function(e) {
                if (!e.over) {
                    over = false;
                }
            });
            if (over) {
                audio.pause();
                clearInterval(timer)
                rank_arr.forEach(function(e, index) {
                    $(e).html("<h2>第" + (index + 1) + "名</h2>" + "<h3>奖励" + rank_dog[index].prize + "</h3>" + "<img src='./images/" + rank_dog[index].name + ".png' />")
                });
                arr.forEach(function(e) {
                    $(e).removeClass().addClass('dog')
                })
                $('.result').addClass('fadeInDown show');
                $('#start').hide();
                $('#reset').show();
            }
        }, 100)

    }
}
 
function Dog(dog, speed) {
    this.speed = speed; //速度
    this.left = dog.position().left;
    this.interval_start = false; //起跑阶段
    this.interval_middle = false; // 中途阶段
    this.interval_end = false; // 结束阶段
    this.over = false; //判断狗是否超出终点

    this.runMiddle = function() {
        var self = this;
        // dog.removeClass('dog_start');
        // dog.addClass('dog_mid')
        var const_left = dog.position().left;
        this.interval_middle = setInterval(function() {
            if (const_left >= 400) {
                dog.css({
                    'left': const_left - Math.random() * self.speed * 2
                })
            } else {
                dog.css({
                    'left': const_left + Math.random() * self.speed * 2
                })
            }

        }, 500)
    };
    this.runEnd = function(n, nextDog) {
        var self = this;

        self.interval_end = setInterval(function() {
            var left = dog.position().left;
            if (left >= 863) {
                clearInterval(self.interval_end);
                self.over = true;
                return;
            }
        }, 100)

    }
}

function dog_talk() {
    $('.dog').on('mouseenter', function(e) {
        $(this).children('img').addClass('show_talk')
    })
    $('.dog').on('mouseleave', function(e) {
        $(this).children('img').removeClass('show_talk')
    })
}

function choice_dog() {
	arr.forEach(function(e,index) {
		$(e).on('click',function(event) {
            var n = index + 1;
            var r = confirm('你选择了'+ n +'号狗');
            if(r){
            	$('.road_line').css({'background-image':"url('./images/runline"+ n +".png')"})
                $('.start_line').css({'background-image':"url('./images/startline"+ n +".png')"})
                mydog = e;
                /*
                  确定之后在这里调接口
                */
            }else{

            }
        })
	})
}

 