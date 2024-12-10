// Game configuration object
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  // Create a new Phaser game instance
  const game = new Phaser.Game(config);
  
  let player;
  let cursors;
  let coins;
  let score = 0;
  let scoreText;
  
  function preload() {
    // Load assets
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/coin.png');
  }
  
  function create() {
    // Create the player
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);
  
    // Create coins group
    coins = this.physics.add.group({
      key: 'coin',
      repeat: 5,
      setXY: { x: 50, y: 100, stepX: 150 }
    });
  
    // Add overlap detection for collecting coins
    this.physics.add.overlap(player, coins, collectCoin, null, this);
  
    // Add score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  
    // Create cursor keys for movement
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
    // Player movement
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }
  
    if (cursors.up.isDown) {
      player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
      player.setVelocityY(160);
    } else {
      player.setVelocityY(0);
    }
  }
  
  // Collect coin function
  function collectCoin(player, coin) {
    coin.disableBody(true, true);
  
    // Update score
    score += 10;
    scoreText.setText('Score: ' + score);
  }
  