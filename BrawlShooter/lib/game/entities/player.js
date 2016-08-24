ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityPlayer = ig.Box2DEntity.extend({
	size: {x: 8, y:14},
	offset: {x: 4, y: 2},
	MaxHealth: 30,
	health: 30,
	
	type: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
	
	animSheet: new ig.AnimationSheet( 'media/minion.png', 16, 24 ),	
	
	flip: false,
	playerId: 1,
    entId: 0,
    powerup: 0,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'jump', 0.07, [1,2] );

        ig.game.spawnEntity( EntityHealthBar2, x, y, { Unit: this } );
	},
	
	
	update: function() {
		
		// move left or right
		if( ig.input.state('left1') ) {
			this.body.ApplyForce( new b2.Vec2(-20,0), this.body.GetPosition() );
			this.flip = true;
		}
		else if( ig.input.state('right1') ) {
			this.body.ApplyForce( new b2.Vec2(20,0), this.body.GetPosition() );
			this.flip = false;
		}
		
		// jetpack
		if( ig.input.state('jump1') ) {
			this.body.ApplyForce( new b2.Vec2(0,-30), this.body.GetPosition() );
			this.currentAnim = this.anims.jump;
		}
		else {
			this.currentAnim = this.anims.idle;
		}
		
		// shoot
		if( ig.input.pressed('shoot1') ) {
			var x = this.pos.x + (this.flip ? -6 : 6 );
			var y = this.pos.y + 6;
			ig.game.spawnEntity( EntityProjectile1, x, y+4, {flip:this.flip} );
		}
		
		this.currentAnim.flip.x = this.flip;
		
		
		// This sets the position and angle. We use the position the object
		// currently has, but always set the angle to 0 so it does not rotate
		this.body.SetXForm(this.body.GetPosition(), 0);
		
		// move!
		this.parent();
	}
});

EntityProjectile1 = ig.Box2DEntity.extend({
	size: {x: 8, y: 4},
	offset: {x: 1, y: 1},
	playerId: 1,
    entId: 1,
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A, 
	collides: ig.Entity.COLLIDES.NONE, // Collision is already handled by Box2D!
		
	animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 4 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.currentAnim.flip.x = settings.flip;
		
		var velocity = (settings.flip ? -10 : 10);
		this.body.ApplyImpulse( new b2.Vec2(velocity,0), this.body.GetPosition() );
	},

	check: function( other ) {
		var x = other.playerId;
        var y = other.entId;

        if((x != this.playerId) && (y == 0)){
            other.receiveDamage(1,other);
        }
	}
});

EntityHealthBar1 = ig.Box2DEntity.extend({
 
    // Health Bar Size
    size: {x:10, y:5},
    offset: {x:-10.5, y:0},
    playerId: 1,
    Unit: 0,
 
    // Health Bar Animation Sheet
    animSheet: new ig.AnimationSheet( 'media/health.png', 10, 5 ),
 
    // Add Animations for every 10 percent health lost
    // set zIndex to make sure its in front
    init: function( x, y, settings ) {
 
        this.addAnim( 'Full', 1, [0] );
        this.addAnim( 'Ninety', 1, [1] );
        this.addAnim( 'Eighty', 5, [2] );
        this.addAnim( 'Seventy', 1, [3] );
        this.addAnim( 'Sixty', 1, [4] );
        this.addAnim( 'Fifty', 1, [5] );
        this.addAnim( 'Fourty', 1, [6] );
        this.addAnim( 'Thirty', 1, [7] );
        this.addAnim( 'Twenty', 1, [8] );
        this.addAnim( 'Ten', 1, [9] );
        this.addAnim( 'NearDeath', 1, [10] );
 
        this.parent( x, y, settings );
        this.zIndex = 6;
    },
 
    update: function() {
		// Used to follow the Unit its assigned to.
        this.pos.x = this.Unit.pos.x - 12;
        this.pos.y = this.Unit.pos.y - 6;
 
        //Checks the Health Values
        // MaxHealth was created in the Entity and set to its initial health
        if(this.Unit.health >= this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Full;
        }
        // Unit below max not below 90%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .9)
            && this.Unit.health < this.Unit.MaxHealth)
        {
            this.currentAnim = this.anims.Ninety;
        }
        // Unit below 90% not below 80%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .8)
            && this.Unit.health < (this.Unit.MaxHealth * .9))
        {
            this.currentAnim = this.anims.Eighty;
        }
        // Unit Below 80% not below 70%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .7)
            && this.Unit.health < (this.Unit.MaxHealth * .8))
        {
            this.currentAnim = this.anims.Seventy;
        }
        // Unit Below 70% not below 60%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .6)
            && this.Unit.health < (this.Unit.MaxHealth * .7))
        {
            this.currentAnim = this.anims.Sixty;
        }
        // Unit Below 60% not below 50%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .5)
            && this.Unit.health < (this.Unit.MaxHealth * .6))
        {
            this.currentAnim = this.anims.Fifty;
        }
        // Unit Below 50% not below 40%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .4)
            && this.Unit.health < (this.Unit.MaxHealth * .5))
        {
            this.currentAnim = this.anims.Fourty;
        }
        // Unit Below 40% not below 30%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .3)
            && this.Unit.health < (this.Unit.MaxHealth * .4))
        {
            this.currentAnim = this.anims.Thirty;
        }
        // Unit Below 30% not below 20%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .2)
            && this.Unit.health < (this.Unit.MaxHealth * .3))
        {
            this.currentAnim = this.anims.Twenty;
        }
        // Unit Below 20% not below 10%
        else if(this.Unit.health >= (this.Unit.MaxHealth * .1)
            && this.Unit.health < (this.Unit.MaxHealth * .2))
        {
            this.currentAnim = this.anims.Ten;
        }
        // Unit Below 10% not DEAD
        else if(this.Unit.health > 0
            && this.Unit.health < (this.Unit.MaxHealth * .1))
        {
            this.currentAnim = this.anims.NearDeath;
        }
        else if (this.Unit.health <= 0 )
        {
            this.kill();
        }
    }
 
});

});