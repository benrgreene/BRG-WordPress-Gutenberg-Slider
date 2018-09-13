<?php

/*
  Plugin Name: Ben's Slider for Gutenberg
  Description: Adds a slider block to the Gutenberg Editor
  Version: 1.0.3
  Author: Ben Greene
  Author URI: www.benrgreene.com
  License: GPLv2
*/

// add the backend editor script
add_action( 'enqueue_block_editor_assets', 'brg_gb_slider_register_assets' );
function brg_gb_slider_register_assets() {
  // Add the slider container script
  wp_enqueue_script(
    'brg-gutenberg-slider-block',
    plugins_url( 'build/index.build.js', __FILE__ )
  );
}

// Add our front end scripts
add_action( 'init', 'brg_add_frontend_slider_scripts' );
function brg_add_frontend_slider_scripts() {
  if( is_admin() ) {
    return;
  }

  wp_enqueue_script(
    'brg-gutenberg-slider-block-frontend',
    plugins_url( 'build/app.build.js', __FILE__ )
  ); 
}