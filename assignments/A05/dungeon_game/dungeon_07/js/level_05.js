var level_05 = {

	preload: function () {
		console.log("level_05");
		// Load tile map
		game.load.tilemap('level_05', 'assets/maps/cave2.json', null, Phaser.Tilemap.TILED_JSON);

		//map tile images:
        game.load.image("brown","assets/tileset/ground/brown.png");
        game.load.image("skull_dark","assets/tileset/item/corpse/skull_dark.png");
        game.load.image("grey_stone","assets/tileset/item/statue/grey_stone.png");
        game.load.image("eye","assets/tileset/ground/eye.png");
        game.load.image("dark_stairs","assets/tileset/building/stairs/dark_stairs.png");
        game.load.image("portal","assets/tileset/logic/portal.png");
        game.load.image("collision","assets/tileset/logic/collision.png");
        game.load.image("enormous_creature","assets/tileset/logic/creature/enormous_creature.png");
        game.load.image("demon","assets/tileset/logic/creature/demon.png");
        game.load.image("elemental","assets/tileset/logic/creature/elemental.png");
        game.load.image("undead","assets/tileset/logic/creature/undead.png");
        game.load.image("human","assets/tileset/logic/creature/human.png");
        game.load.image("iron_lamp","assets/tileset/furniture/light/iron_lamp.png");
        game.load.image("flames","assets/tileset/furniture/light/flames.png");
        game.load.image("skeleton","assets/tileset/item/corpse/skeleton.png");
        game.load.image("metal_and_stone","assets/tileset/item/statue/metal_and_stone.png");
        game.load.image("floor_stains_2","assets/tileset/item/blood/floor_stains_2.png");
        game.load.image("floor_stain","assets/tileset/item/blood/floor_stain.png");
        game.load.image("nsew_stains","assets/tileset/item/blood/nsew_stains.png");
        game.load.image("int_rock","assets/tileset/building/wall/int_rock.png");
        game.load.image("brown_edges","assets/tileset/ground/brown_edges.png");
        game.load.image("tan_building","assets/tileset/building/tan_building.png");
        game.load.image("sand_1","assets/tileset/ground/sand_1.png");
        game.load.image("sand_2","assets/tileset/ground/sand_2.png");
        game.load.image("brown_corners","assets/tileset/ground/brown_corners.png");
        game.load.image("window_centered","assets/tileset/building/window/window_centered.png");
        game.load.image("closed","assets/tileset/building/door/closed.png");
        game.load.image("door","assets/tileset/building/door/door.png");
        game.load.image("large_green","assets/tileset/plant/bush/large_green.png");
        game.load.image("dim_yellow_light_7x5","assets/tileset/light/dim_yellow_light_7x5.png");
        game.load.image("dim_yellow_light_5x5","assets/tileset/light/dim_yellow_light_5x5.png");

	},
	create: function () {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mapping layers and tilesets
		/////////////////////////////////////////////////
		this.map = game.add.tilemap('level_05');
        this.map.addTilesetImage("brown","brown");
        this.map.addTilesetImage("skull_dark","skull_dark");
        this.map.addTilesetImage("grey_stone","grey_stone");
        this.map.addTilesetImage("eye","eye");
        this.map.addTilesetImage("dark_stairs","dark_stairs");
        this.map.addTilesetImage("portal","portal");
        this.map.addTilesetImage("collision","collision");
        this.map.addTilesetImage("enormous_creature","enormous_creature");
        this.map.addTilesetImage("demon","demon");
        this.map.addTilesetImage("elemental","elemental");
        this.map.addTilesetImage("undead",".undead");
        this.map.addTilesetImage("human","human");
        this.map.addTilesetImage("iron_lamp","iron_lamp");
        this.map.addTilesetImage("flames","flames");
        this.map.addTilesetImage("skeleton","skeleton");
        this.map.addTilesetImage("metal_and_stone","metal_and_stone");
        this.map.addTilesetImage("floor_stains_2","floor_stains_2");
        this.map.addTilesetImage("floor_stain","floor_stain");
        this.map.addTilesetImage("nsew_stains","nsew_stains");
        this.map.addTilesetImage("int_rock","int_rock");
        this.map.addTilesetImage("brown_edges","brown_edges");
        this.map.addTilesetImage("tan_building","tan_building");
        this.map.addTilesetImage("sand_1","sand_1");
        this.map.addTilesetImage("sand_2","sand_2");
        this.map.addTilesetImage("brown_corners","brown_corners");
        this.map.addTilesetImage("window_centered","window_centered");
        this.map.addTilesetImage("closed","closed");
        this.map.addTilesetImage("door","door");
        this.map.addTilesetImage("large_green","large_green");
        this.map.addTilesetImage("dim_yellow_light_7x5","dim_yellow_light_7x5");
        this.map.addTilesetImage("dim_yellow_light_5x5","dim_yellow_light_5x5");

		this.layers = {
			ground_layer: this.map.createLayer('0_floor'),
			terrain_layer: this.map.createLayer('1_terrain'),
			object_layer: this.map.createLayer('2_object'),
			//roof_layer: this.map.createLayer('3_roof'),
			//roof_add: this.map.createLayer('4_roof_add'),
            collision_layer: this.map.createLayer('collision')
        };


		this.layers.collision_layer.alpha = .5;

		game.physics.arcade.enable(this.layers.collision_layer);

		this.map.setCollision(39, true, this.layers.collision_layer);

		this.layers.ground_layer.resizeWorld();

		this.prevDir = ''; // holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		game.global.health = 100;

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

		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// tell camera to follow sprite now that we're on a map
		// and can move out of bounds
		game.camera.follow(this.player);

		// set starting location for player in some middle spot in the map
		this.player.x = 2080;
		this.player.y = 2080;

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.player.scale.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		game.addPauseButton(game);
	},

	update: function () {

		this.move();
		
		this.getTileProperties(this.layers.collision_layer,this.player);

		// Necessary to make sure we always check player colliding with objects
		game.physics.arcade.collide(this.player, this.layers.collision_layer);

	},


	/**
	 * function to be taylored to handle player level / stage change 
	 * Question: should this be cut and paste in very level file?
	 * 			 can we make this global somehow?
	 */
	checkPlayerTransport: function (player) {
		if (player.x < 1411) {
			game.global.current_level = 'level_03';
			game.state.start(game.global.current_level);
		} else if (player.x > game.width) {
			// go somewhere
		} else if (player.y < game.height) {
			// go somewhere
		} else if (player.y > game.height) {
			// go somewhere
		}
	},

	getTileProperties: function (layer, player) {

		var x = layer.getTileX(player.x);
		var y = layer.getTileY(player.y);

		var tile = this.map.getTile(x, y, layer);

		if (tile) {
			console.log(x, y);
			console.log(tile);
		}

	},

	render: function () {
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