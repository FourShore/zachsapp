ig.module(
	'game.entities.powerup'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityPowerup = ig.Box2DEntity.extend({
	size: {x: 7, y:8},
	id: 2,
	powerup: Math.floor((Math.random()*5)+1),
	
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
	
	animSheet: new ig.AnimationSheet( 'media/powerup.png', 7, 8 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );

	},
	
	update: function() {
		
		this.currentAnim = this.anims.idle;

		// This sets the position and angle. We use the position the object
		// currently has, but always set the angle to 0 so it does not rotate
		this.body.SetXForm(this.body.GetPosition(), 0);
		
		// move!
		this.parent();
	}/*,

	check: function( other ){
		other.powerup = this.powerup;
	}*/
});

});