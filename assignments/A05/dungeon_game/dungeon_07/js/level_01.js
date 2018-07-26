var level_01 = {

	preload: function () {
		console.log("level_01");
		// Load tile map
		game.load.tilemap('level_01', 'assets/maps/tunnel.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
		game.load.image('ground', 'assets/tileset/ground/brown.png');
		game.load.image('iron_lamp', 'assets/tileset/furniture/light/iron_lamp.png');
		game.load.image('flames', 'assets/tileset/furniture/light/flames.png');
		game.load.image('amazon', 'assets/tileset/logic/creature/amazon.png');
		game.load.image('skull_dark', 'assets/tileset/item/corpse/skull_dark.png');
		game.load.image('huge_animal', 'assets/tileset/item/corpse/huge_animal.png');
		game.load.image('rocks_2', 'assets/tileset/ground/rock/rocks_2.png');
		game.load.image('pink_crystal', 'assets/tileset/ground/rock/pink_crystal.png');
		game.load.image('green_crystal', 'assets/tileset/ground/rock/green_crystal.png');
		game.load.image('huge_animal2', 'assets/tileset/logic/creature/huge_animal.png');
		game.load.image('animal', 'assets/tileset/logic/creature/animal.png');
		game.load.image('undead', 'assets/tileset/logic/creature/undead.png');
		game.load.image('elemental', 'assets/tileset/logic/creature/elemental.png');
		game.load.image('int_rock', 'assets/tileset/building/wall/int_rock.png');
		game.load.image('collision', 'assets/tileset/logic/collision.png');
	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_01');
		this.map.addTilesetImage('ground', 'ground');
		this.map.addTilesetImage('logic/collision', 'collision');
		this.map.addTilesetImage('steel lamp', 'iron_lamp');
		this.map.addTilesetImage('flames', 'flames');
		this.map.addTilesetImage('amazoness', 'amazon');
		this.map.addTilesetImage('corpse', 'skull_dark');
		this.map.addTilesetImage('corpse 2', 'huge_animal');
		this.map.addTilesetImage('rocks', 'rocks_2');
		this.map.addTilesetImage('crystal', 'pink_crystal');
		this.map.addTilesetImage('crystal 2', 'green_crystal');
		this.map.addTilesetImage('huge animals', 'huge_animal2');
		this.map.addTilesetImage('animals', 'animal');
		this.map.addTilesetImage('undead', 'undead');
		this.map.addTilesetImage('elements', 'elemental');
		this.map.addTilesetImage('wall/int_rock', 'int_rock');

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			roof_layer: this.map.createLayer('3_roof'),
			collision_layer: this.map.createLayer('collision')
		};

		this.layers.collision_layer.alpha = 0

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(1, true, this.layers.collision_layer);
		this.map.setTileIndexCallback(45, this.hitWall, this);

		this.layers.ground_layer.resizeWorld();

		// Dungeon 3 sprite stuff below
		/////////////////////////////////////////////////

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		game.global.health = 100;

		// Adding enemy (using same sprite as knight)
		//var ex = game.width * Math.random();
		//var ey = game.width * Math.random();
		//if (Math.floor(Math.random() * 100) % 2 == 1) {
		//	ex = 0;
		//} else {
		//	ey = 0;
		//}

		this.enemy = game.add.sprite(690, 1570, 'knight_atlas');

		this.chasePlayer = false;

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('dead', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, true);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, true);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, true);
		this.player.animations.play('idle_left');

		// Add walking and idle animations for the enemy.
		this.enemy.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.enemy.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.enemy.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.enemy.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.enemy.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.enemy.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.enemy.animations.play('idle_left');


		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 1728;
		this.player.y = 1024;

		// turn physics on for enemy
		game.physics.arcade.enable(this.enemy);

		this.enemy.body.collideWorldBounds = true;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);


		game.addPauseButton(game);
		k = game.input.keyboard;
	},

	update: function () {

		this.move();

		// if (k.isDown(67)) {
		// 	this.chasePlayer = true;
		// }
		// if (this.chasePlayer) {
		// 	this.moveTowardPlayer(this.enemy, 200);
		// 	this.checkAttack(this.player, this.enemy);
		// }

		//this.checkAttack(this.player, this.enemy)
		this.checkPlayerTransport(this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);

	},

	/**
	 * Very basic move monster towards player function.
	 * Some options to make it better would be to:
	 *  - Parameterize it so you can pass in values to adjust behaviors
	 *  - Add animations to make gameplay look better
	 *  - Add some random behaviors (like swap direction based on random choices)
	 */
	moveTowardPlayer: function (enemy, speed) {
		if (this.player.x < enemy.x) {
			enemy.body.velocity.x = -speed;
		} else {
			enemy.body.velocity.x = speed;
		}
		if (this.player.y < enemy.y) {
			enemy.body.velocity.y = -speed;
		} else {
			enemy.body.velocity.y = speed;
		}
	},

	killEnemy: function (enemy, player)
	{
		// Get how close players are together 
		var xClose = Math.abs(player.x - enemy.x);
		var yClose = Math.abs(player.y - enemy.y);

		//console.log(xClose-yClose);
		// Based on my arbitrary value of 5, I run an attack animation
		// More precision, and direction of attack need added.
		if (Math.abs(xClose - yClose) < 5) 
		{
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			enemy.destroy();
		}
	},

	/**
	 * basic check for attack (not good)
	 */
	checkAttack: function (player, enemy) {
		// Get how close players are together 
		var xClose = Math.abs(player.x - enemy.x);
		var yClose = Math.abs(player.y - enemy.y);

		//console.log(xClose-yClose);
		// Based on my arbitrary value of 5, I run an attack animation
		// More precision, and direction of attack need added.
		if (Math.abs(xClose - yClose) < 5) {
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			if (player.x < enemy.x) {
				enemy.animations.play('attack_left');
				this.enemy.destroy();
			} else {
				enemy.animations.play('attack_right');
				this.enemy.destroy();
			}
		}
	},

	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x < 411) {
			game.global.current_level = 'level_02';
			game.state.start(game.global.current_level);
		} else if (player.x > game.width) {
			// go somewhere
		} else if (player.y < game.height) {
			// go somewhere
		} else if (player.y > game.height) {
			// go somewhere
		}
	},

	render: function () 
	{
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Go all the way left to exit this level...", game.width / 2, game.height - 10);
	},

	move: function()
	{
		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Walk left
		if (k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.SHIFT))
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 200;
			}
			else{
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}

		// Walk right
		if (k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.SHIFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = -200;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN)){
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 200;
			}
			else
			{
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}

		// Run left
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.LEFT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = -400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_left');
			this.prevDir = 'left'
		}

		// Run right
		if (k.isDown(Phaser.Keyboard.SHIFT) && k.isDown(Phaser.Keyboard.RIGHT)) 
		{
			if(k.isDown(Phaser.Keyboard.UP))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = -400;
			}
			else if(k.isDown(Phaser.Keyboard.DOWN))
			{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 400;
			}
			else{
				this.player.body.velocity.x = 400;
				this.player.body.velocity.y = 0;
			}
			this.player.animations.play('run_right');
			this.prevDir = 'right'
		}

		//walk up
		if (k.isDown(Phaser.Keyboard.UP)) 
		{
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
		}

		// walk down
		if (k.isDown(Phaser.Keyboard.DOWN)) 
		{
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}

		// idle
		if (!k.isDown(Phaser.Keyboard.LEFT) && !k.isDown(Phaser.Keyboard.RIGHT) && !k.isDown(Phaser.Keyboard.UP) 
		&& !k.isDown(Phaser.Keyboard.DOWN) && !k.isDown(Phaser.Keyboard.SPACEBAR) && !k.isDown(65) 
		&& !k.isDown(Phaser.Keyboard.ENTER) && !k.isDown(83))
		{
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}
		
		// attack
		if (k.isDown(65))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('attack_left')
			}
			else{
				this.player.animations.play('attack_right')
			}

			// Get how close players are together 
			var xClose = Math.abs(this.player.x - this.enemy.x);
			var yClose = Math.abs(this.player.y - this.enemy.y);

			//console.log(xClose-yClose);
			// Based on my arbitrary value of 5, I run an attack animation
			// More precision, and direction of attack need added.
			if (Math.abs(xClose - yClose) < 5) 
			{
				this.enemy.body.velocity.x = 0;
				this.enemy.body.velocity.y = 0;
				this.enemy.destroy();
			}
		}

		// jump attack
		if (k.isDown(83))
		{
			if (this.prevDir == 'left')
			{
				this.player.animations.play('jumpattack_left')
			}
			else{
				this.player.animations.play('jumpattack_right')
			}
			//this.player.body.y -= 0.50;
		}

		// jump
		if (k.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			if(this.prevDir == 'left')
			{
				this.player.animations.play('jump_left');
			}
			else
			{
				this.player.animations.play('jump_right');
			}
			//this.player.body.y -= 0.50;
		}

		// dead
		if(k.isDown(Phaser.Keyboard.ENTER))
		{
		this.player.animations.play('dead');
		}
	},
}