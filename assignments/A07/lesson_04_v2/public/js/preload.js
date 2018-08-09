var preload = {
	preload:function(){
		console.log("preload.js");
		game.stage.backgroundColor = game.globals.bg_color;

		var loading_border = this.add.image(game.width/2,game.height/2,'assets/images/loading_border')
		loading_border.anchor.setTo(.5,.5)
		var loading = this.add.sprite(game.width/2,game.height/2,'assets/images/loading')
		loading.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		
		
		// game entities/world
		game.load.image('pause', 'assets/images/pause.png')
		game.load.image('space', 'assets/images/space.jpg')
		game.load.image('bullet', 'assets/images/laserBlue02.png');
		game.load.image('starfield', 'assets/images/starfield.png');
		game.load.image('button', 'assets/images/button.png');
		game.load.image('planet1', 'assets/images/planet1.png');
		game.load.image('planet2', 'assets/images/planet2.png');
		game.load.image('planet3', 'assets/images/planet3.png');
		game.load.image('planet4', 'assets/images/planet4.png');
		// Load all my new obstacles
		// for(i=1;i<4;i++){
		// 	//name = game.globals.obstacle_icons[i];
		// 	//game.load.image('icon-'+name, 'assets/images/icon-'+name+'.png');
		// 	var planet_image = game.load.image('planet'+i, 'assets/images/planet'+i+'.png');
		// 	planet_image.scale.setTo(0.1,0.1);

		// }

		//game.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);
		game.load.spritesheet('bang', 'assets/sprites/explosion.png', 100, 100, 73);
		//game.load.spritesheet('earth', 'assets/sprites/Earth.png', 213,160,13);
		game.load.spritesheet('earth', 'assets/sprites/Earth4.png', 85,85,48);
		game.load.spritesheet('rock', 'assets/sprites/rock.png', 128, 128);
		game.load.spritesheet('red', 'assets/sprites/red.png', 72, 72);
		game.load.spritesheet('blue', 'assets/sprites/blue.png', 72, 72);
		game.load.spritesheet('flame', 'assets/sprites/flame.png', 102.4, 102.4)
		game.load.atlas('ufoAtlas','assets/sprites/ufo-sheet_2.png','assets/sprites/ufo-atlas_2.json');

		// audio
		game.load.audio('bg_spin', 'assets/sounds/spin_bg_music.mp3')
		game.load.audio('bg_edm', 'assets/sounds/edm_bg_music.mp3')
		game.load.audio('score', 'assets/sounds/score.wav')
		game.load.audio('kill', 'assets/sounds/Ouch.ogg')
		game.load.audio('music', 'assets/sounds/abstractionRapidAcrobatics.wav')

		// font
		game.load.bitmapFont('fontUsed', 'assets/font/ganonwhite/font.png', 'assets/font/ganonwhite/font.xml');

	},
	
	create:function(){
		
		game.state.start('mainMenu');
	}
}