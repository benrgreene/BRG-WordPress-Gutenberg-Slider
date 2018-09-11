<?php

/*
  Plugin Name: Gutenberg Slider
  Description: Adds a slider block to the Gutenberg Editor
  Version: 1
  Author: Ben Greene
  Author URI: www.benrgreene.com
*/

add_action( 'enqueue_block_editor_assets', 'brg_gb_slider_register_assets' );
function brg_gb_slider_register_assets() {
  // Add the slider container script
  wp_enqueue_script(
    'brg-gutenberg-slider-block',
    plugins_url( 'build/index.build.js', __FILE__ )
  );

  // now we register the block type
  register_block_type( 'brg/gutenberg-slider-block',
    array(
      'editor_script' => 'brg-gutenberg-slider-block',
    )
  );
  register_block_type( 'brg/gutenberg-slider-container',
    array(
      'editor_script' => 'brg-gutenberg-slider-block',
    )
  );
}